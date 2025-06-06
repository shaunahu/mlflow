import type { CSSObject } from '@emotion/react';
import type { TabsProps as AntDTabsProps, TabPaneProps as AntDTabPaneProps } from 'antd';
import type { Theme } from '../../theme';
import type { DangerousGeneralProps, HTMLDataAttributes } from '../types';
export declare const getLegacyTabEmotionStyles: (clsPrefix: string, theme: Theme) => CSSObject;
/**
 * `LegacyTabs` is deprecated in favor of the new `Tabs` component
 * @deprecated
 */
export interface LegacyTabsProps extends HTMLDataAttributes, DangerousGeneralProps {
    /**
     * Set this to `true` to allow users to add and remove tab panes.
     */
    editable?: boolean;
    /**
     * Determines the active tab pane.
     * Use this for controlled mode to handle the active state yourself.
     */
    activeKey?: AntDTabsProps['activeKey'];
    /**
     * Determines the tab pane that is initially active before the user interacts.
     * Use this for uncontrolled mode to let the component handle the active state itself.
     */
    defaultActiveKey?: AntDTabsProps['defaultActiveKey'];
    /**
     * Called when the user clicks on a tab. Use this in combination with `activeKey` for a controlled component.
     */
    onChange?: AntDTabsProps['onChange'];
    /**
     * Called when the user clicks the add or delete buttons. Use in combination with `editable=true`.
     */
    onEdit?: AntDTabsProps['onEdit'];
    /**
     * One or more instances of <TabPane /> to render inside this tab container.
     */
    children?: AntDTabsProps['children'];
    /**
     *  Whether destroy inactive TabPane when change tab
     */
    destroyInactiveTabPane?: boolean;
    /**
     * Escape hatch to allow passing props directly to the underlying Ant `Tabs` component.
     */
    dangerouslySetAntdProps?: Partial<AntDTabsProps>;
    dangerouslyAppendEmotionCSS?: CSSObject;
}
/**
 * `LegacyTabs` is deprecated in favor of the new `Tabs` component
 * @deprecated
 */
export interface LegacyTabPaneProps {
    /**
     * Text to display in the table title.
     */
    tab: AntDTabPaneProps['tab'];
    /**
     * Whether or not this tab is disabled.
     */
    disabled?: AntDTabPaneProps['disabled'];
    /**
     * Content to render inside the tab body.
     */
    children?: AntDTabPaneProps['children'];
    /**
     * Escape hatch to allow passing props directly to the underlying Ant `TabPane` component.
     */
    dangerouslySetAntdProps?: Partial<AntDTabPaneProps>;
}
/**
 * `LegacyTabs` is deprecated in favor of the new `Tabs` component
 * @deprecated
 */
export interface LegacyTabsInterface extends React.FC<LegacyTabsProps> {
    TabPane: typeof LegacyTabPane;
}
/**
 * `LegacyTabs` is deprecated in favor of the new `Tabs` component
 * @deprecated
 */
export declare const LegacyTabPane: React.FC<LegacyTabPaneProps>;
/**
 * `LegacyTabs` is deprecated in favor of the new `Tabs` component
 * @deprecated
 */
export declare const LegacyTabs: LegacyTabsInterface;
//# sourceMappingURL=index.d.ts.map