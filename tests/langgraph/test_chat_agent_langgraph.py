import json

import pytest
from langchain_core.messages import AIMessage, ToolMessage

import mlflow
from mlflow.langchain.chat_agent_langgraph import parse_message
from mlflow.types.agent import ChatAgentMessage

LC_TOOL_CALL_MSG = AIMessage(
    **{
        "content": "",
        "additional_kwargs": {
            "tool_calls": [
                {
                    "id": "call_a9b9afd5-d23a-4973-8417-ac283b1413d5",
                    "type": "function",
                    "function": {
                        "name": "system__ai__python_exec",
                        "arguments": '{ "code": "print(5+5)" }',
                    },
                }
            ]
        },
        "response_metadata": {"prompt_tokens": 2658, "completion_tokens": 24, "total_tokens": 2682},
        "type": "ai",
        "name": None,
        "id": "run-3a2ad83b-a5cf-4d51-97c8-9f68205df787-0",
        "example": False,
        "tool_calls": [
            {
                "name": "system__ai__python_exec",
                "args": {"code": "print(5+5)"},
                "id": "call_a9b9afd5-d23a-4973-8417-ac283b1413d5",
                "type": "tool_call",
            }
        ],
        "invalid_tool_calls": [],
        "usage_metadata": None,
    }
)
CHAT_AGENT_TOOL_CALL_MSG = ChatAgentMessage(
    **{
        "role": "assistant",
        "content": "",
        "name": "llm",
        "id": "run-3a2ad83b-a5cf-4d51-97c8-9f68205df787-0",
        "tool_calls": [
            {
                "id": "call_a9b9afd5-d23a-4973-8417-ac283b1413d5",
                "type": "function",
                "function": {
                    "name": "system__ai__python_exec",
                    "arguments": '{"code": "print(5+5)"}',
                },
            }
        ],
    }
).model_dump_compat(exclude_none=True)
LC_TOOL_MSG = ToolMessage(
    **{
        "content": '{"content": "Successfully generated array of 5 random ints in [1, 100].", "attachments": {"key1": "attach1", "key2": "attach2"}, "custom_outputs": {"random_nums": [1, 82, 9, 12, 22]}}',  # noqa: E501
        "additional_kwargs": {},
        "response_metadata": {},
        "type": "tool",
        "name": "generate_random_ints",
        "id": None,
        "tool_call_id": "call_ee823299-62d7-4407-95e8-168412904471",
        "artifact": None,
        "status": "success",
    }
)
CHAT_AGENT_TOOL_MSG = ChatAgentMessage(
    role="tool",
    content='{"content": "Successfully generated array of 5 random ints in [1, 100].", "attachments": {"key1": "attach1", "key2": "attach2"}, "custom_outputs": {"random_nums": [1, 82, 9, 12, 22]}}',  # noqa: E501
    name="generate_random_ints",
    tool_calls=None,
    tool_call_id="call_ee823299-62d7-4407-95e8-168412904471",
    attachments={"key1": "attach1", "key2": "attach2"},
    finish_reason=None,
).model_dump_compat(exclude_none=True)  # id will be a generated UUID
TOOL_MSG_ATTACHMENTS = {"key1": "attach1", "key2": "attach2"}
LC_ASSISTANT_MSG = AIMessage(
    **{
        "content": "The generated random numbers are 1, 82, 9, 12, and 22.",
        "additional_kwargs": {},
        "response_metadata": {"prompt_tokens": 2763, "completion_tokens": 22, "total_tokens": 2785},
        "type": "ai",
        "name": None,
        "id": "run-4972ab0f-8b90-4650-8a84-a689fbd912f1-0",
        "example": False,
        "tool_calls": [],
        "invalid_tool_calls": [],
        "usage_metadata": None,
    }
)
CHAT_AGENT_ASSISTANT_MSG = ChatAgentMessage(
    role="assistant",
    content="The generated random numbers are 1, 82, 9, 12, and 22.",
    name="llm",
    id="run-4972ab0f-8b90-4650-8a84-a689fbd912f1-0",
    tool_calls=None,
    tool_call_id=None,
    attachments=None,
    finish_reason=None,
).model_dump_compat(exclude_none=True)


@pytest.mark.parametrize(
    ("lc_msg", "chat_agent_msg", "name", "attachments"),
    [
        (LC_TOOL_CALL_MSG, CHAT_AGENT_TOOL_CALL_MSG, "llm", None),
        (LC_TOOL_MSG, CHAT_AGENT_TOOL_MSG, None, TOOL_MSG_ATTACHMENTS),
        (LC_ASSISTANT_MSG, CHAT_AGENT_ASSISTANT_MSG, "llm", None),
    ],
)
def test_parse_message(lc_msg, chat_agent_msg, name, attachments):
    # id is autogenerated
    if lc_msg.id is None:
        lc_msg.id = chat_agent_msg.get("id")
    assert parse_message(lc_msg, name, attachments) == chat_agent_msg


def test_langgraph_chat_agent_save_as_code():
    # (role, content)
    expected_messages = [
        ("assistant", ""),  # tool message does not have content
        (
            "tool",
            json.dumps(
                {
                    "format": "SCALAR",
                    "value": '{"content":"hi","attachments":{"a":"b"},"custom_outputs":{"c":"d"}}',
                    "truncated": False,
                }
            ),
        ),
        ("assistant", ""),
        (
            "tool",
            json.dumps(
                {
                    "content": f"Successfully generated array of 2 random ints: {[1, 2]}.",
                    "attachments": {"key1": "attach1", "key2": "attach2"},
                    "custom_outputs": {"random_nums": [1, 2]},
                }
            ),
        ),
        ("assistant", "Successfully generated"),
    ]

    with mlflow.start_run():
        model_info = mlflow.pyfunc.log_model(
            name="agent",
            python_model="tests/langgraph/sample_code/langgraph_chat_agent.py",
        )
    loaded_model = mlflow.pyfunc.load_model(model_info.model_uri)
    response = loaded_model.predict({"messages": [{"role": "user", "content": "hi"}]})
    messages = response["messages"]
    assert len(messages) == len(expected_messages)
    for msg, (role, expected_content) in zip(messages, expected_messages):
        assert msg["role"] == role
        assert msg["content"] == expected_content

    loaded_model = mlflow.pyfunc.load_model(model_info.model_uri)
    response = loaded_model.predict_stream({"messages": [{"role": "user", "content": "hi"}]})
    for event, (role, expected_content) in zip(response, expected_messages):
        assert event["delta"]["content"] == expected_content
        assert event["delta"]["role"] == role


def test_langgraph_chat_agent_custom_inputs():
    # (role, content)
    expected_messages = [
        ("assistant", ""),  # tool message does not have content
        (
            "tool",
            json.dumps(
                {
                    "format": "SCALAR",
                    "value": '{"content":"hi","attachments":{"a":"b"},"custom_outputs":{"c":"d"}}',
                    "truncated": False,
                }
            ),
        ),
        ("assistant", ""),
        (
            "tool",
            json.dumps(
                {
                    "content": f"Successfully generated array of 2 random ints: {[1, 2]}.",
                    "attachments": {"key1": "attach1", "key2": "attach2"},
                    "custom_outputs": {"random_nums": [1, 2]},
                }
            ),
        ),
        ("assistant", "Successfully generated"),
        ("assistant", "adding custom outputs"),
    ]

    with mlflow.start_run():
        model_info = mlflow.pyfunc.log_model(
            name="agent",
            python_model="tests/langgraph/sample_code/langgraph_chat_agent_custom_inputs.py",
        )
    loaded_model = mlflow.pyfunc.load_model(model_info.model_uri)
    response = loaded_model.predict(
        {"messages": [{"role": "user", "content": "hi"}], "custom_inputs": {"asdf": "jkl;"}}
    )
    assert response["custom_outputs"]["asdf"] == "jkl;"
    messages = response["messages"]
    assert len(messages) == len(expected_messages)
    for msg, (role, expected_content) in zip(messages, expected_messages):
        assert msg["role"] == role
        assert msg["content"] == expected_content
    loaded_model = mlflow.pyfunc.load_model(model_info.model_uri)
    response = loaded_model.predict_stream(
        {"messages": [{"role": "user", "content": "hi"}], "custom_inputs": {"asdf": "jkl;"}}
    )
    counter = 0
    for chunk, (role, expected_content) in zip(response, expected_messages):
        assert chunk["delta"]["content"] == expected_content
        assert chunk["delta"]["role"] == role
        if "custom_outputs" in chunk:
            assert chunk["custom_outputs"]["asdf"] == "jkl;"
            counter += 1
    assert counter == 1
