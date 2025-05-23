import { type UseComboboxReturnValue, type UseComboboxStateChange, type UseMultipleSelectionReturnValue } from 'downshift';
import { DesignSystemEventProviderAnalyticsEventTypes } from '../../DesignSystemEventProvider';
import type { AnalyticsEventValueChangeNoPiiFlagProps } from '../../types';
interface SingleSelectProps<T> extends CommonComboboxStateProps<T> {
    multiSelect?: false;
    setInputValue?: React.Dispatch<React.SetStateAction<string>>;
    setItems: React.Dispatch<React.SetStateAction<T[]>>;
}
interface MultiSelectProps<T> extends CommonComboboxStateProps<T> {
    multiSelect: true;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    selectedItems: T[];
    setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>;
}
interface CommonComboboxStateProps<T> extends AnalyticsEventValueChangeNoPiiFlagProps<DesignSystemEventProviderAnalyticsEventTypes.OnValueChange | DesignSystemEventProviderAnalyticsEventTypes.OnView> {
    /**
     * The complete list of items, used for filtering. If you are going to render groups,
     * this list MUST be sorted so that groups are together and in the same order they are
     * rendered in the menu.
     */
    allItems: T[];
    items: T[];
    matcher?: (item: T, searchQuery: string) => boolean;
    itemToString?: (item: T) => string;
    onIsOpenChange?: (changes: UseComboboxStateChange<T>) => void;
    allowNewValue?: boolean;
    formValue?: T;
    formOnChange?: (value: any) => void;
    formOnBlur?: (value: any) => void;
    onStateChange?: (changes: UseComboboxStateChange<T>) => void;
    initialSelectedItem?: T;
    initialInputValue?: string;
    /**
     * When using RHF adapters, single select TypeaheadCombobox clears the value on blur, this prop prevents that behavior.
     */
    preventUnsetOnBlur?: boolean;
}
export declare const TypeaheadComboboxStateChangeTypes: {
    InputKeyDownArrowDown: import("downshift").UseComboboxStateChangeTypes.InputKeyDownArrowDown;
    InputKeyDownArrowUp: import("downshift").UseComboboxStateChangeTypes.InputKeyDownArrowUp;
    InputKeyDownEscape: import("downshift").UseComboboxStateChangeTypes.InputKeyDownEscape;
    InputKeyDownHome: import("downshift").UseComboboxStateChangeTypes.InputKeyDownHome;
    InputKeyDownEnd: import("downshift").UseComboboxStateChangeTypes.InputKeyDownEnd;
    InputKeyDownEnter: import("downshift").UseComboboxStateChangeTypes.InputKeyDownEnter;
    InputChange: import("downshift").UseComboboxStateChangeTypes.InputChange;
    InputBlur: import("downshift").UseComboboxStateChangeTypes.InputBlur;
    MenuMouseLeave: import("downshift").UseComboboxStateChangeTypes.MenuMouseLeave;
    ItemMouseMove: import("downshift").UseComboboxStateChangeTypes.ItemMouseMove;
    ItemClick: import("downshift").UseComboboxStateChangeTypes.ItemClick;
    ToggleButtonClick: import("downshift").UseComboboxStateChangeTypes.ToggleButtonClick;
    FunctionToggleMenu: import("downshift").UseComboboxStateChangeTypes.FunctionToggleMenu;
    FunctionOpenMenu: import("downshift").UseComboboxStateChangeTypes.FunctionOpenMenu;
    FunctionCloseMenu: import("downshift").UseComboboxStateChangeTypes.FunctionCloseMenu;
    FunctionSetHighlightedIndex: import("downshift").UseComboboxStateChangeTypes.FunctionSetHighlightedIndex;
    FunctionSelectItem: import("downshift").UseComboboxStateChangeTypes.FunctionSelectItem;
    FunctionSetInputValue: import("downshift").UseComboboxStateChangeTypes.FunctionSetInputValue;
    FunctionReset: import("downshift").UseComboboxStateChangeTypes.FunctionReset;
    ControlledPropUpdatedSelectedItem: import("downshift").UseComboboxStateChangeTypes.ControlledPropUpdatedSelectedItem;
};
export declare const TypeaheadComboboxMultiSelectStateChangeTypes: {
    SelectedItemClick: import("downshift").UseMultipleSelectionStateChangeTypes.SelectedItemClick;
    SelectedItemKeyDownDelete: import("downshift").UseMultipleSelectionStateChangeTypes.SelectedItemKeyDownDelete;
    SelectedItemKeyDownBackspace: import("downshift").UseMultipleSelectionStateChangeTypes.SelectedItemKeyDownBackspace;
    SelectedItemKeyDownNavigationNext: import("downshift").UseMultipleSelectionStateChangeTypes.SelectedItemKeyDownNavigationNext;
    SelectedItemKeyDownNavigationPrevious: import("downshift").UseMultipleSelectionStateChangeTypes.SelectedItemKeyDownNavigationPrevious;
    DropdownKeyDownNavigationPrevious: import("downshift").UseMultipleSelectionStateChangeTypes.DropdownKeyDownNavigationPrevious;
    DropdownKeyDownBackspace: import("downshift").UseMultipleSelectionStateChangeTypes.DropdownKeyDownBackspace;
    DropdownClick: import("downshift").UseMultipleSelectionStateChangeTypes.DropdownClick;
    FunctionAddSelectedItem: import("downshift").UseMultipleSelectionStateChangeTypes.FunctionAddSelectedItem;
    FunctionRemoveSelectedItem: import("downshift").UseMultipleSelectionStateChangeTypes.FunctionRemoveSelectedItem;
    FunctionSetSelectedItems: import("downshift").UseMultipleSelectionStateChangeTypes.FunctionSetSelectedItems;
    FunctionSetActiveIndex: import("downshift").UseMultipleSelectionStateChangeTypes.FunctionSetActiveIndex;
    FunctionReset: import("downshift").UseMultipleSelectionStateChangeTypes.FunctionReset;
};
export type UseComboboxStateProps<T> = SingleSelectProps<T> | MultiSelectProps<T>;
export type ComboboxStateAnalyticsReturnValue<T> = UseComboboxReturnValue<T> & AnalyticsEventValueChangeNoPiiFlagProps<DesignSystemEventProviderAnalyticsEventTypes.OnValueChange | DesignSystemEventProviderAnalyticsEventTypes.OnView> & {
    onView: (value: any) => void;
    firstOnViewValue?: string;
};
export declare function useComboboxState<T>({ allItems, items, itemToString, onIsOpenChange, allowNewValue, formValue, formOnChange, formOnBlur, componentId, valueHasNoPii, analyticsEvents, matcher, preventUnsetOnBlur, ...props }: UseComboboxStateProps<T>): ComboboxStateAnalyticsReturnValue<T>;
interface AnalyticsConfig extends AnalyticsEventValueChangeNoPiiFlagProps<DesignSystemEventProviderAnalyticsEventTypes.OnValueChange | DesignSystemEventProviderAnalyticsEventTypes.OnView> {
    itemToString?: (item: any) => string;
}
export declare function useMultipleSelectionState<T>(selectedItems: T[], setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>, { componentId, analyticsEvents, valueHasNoPii, itemToString, }: AnalyticsConfig): UseMultipleSelectionReturnValue<T>;
export {};
//# sourceMappingURL=downshiftHookWrappers.d.ts.map