export interface DecoratorParams {
    id: string;
}

export interface APIConfig {
    username: string;
    password: string;
    domain: string;
}

export enum constants {
    ADDON_NAME = 'STORYBOOK_ADDON_CONFLUENCE',
    DECORATOR_NAME = 'withConfluence',
    PARAM_KEY = 'confluence',
    PANEL_NAME = 'STORYBOOK_ADDON_CONFLUENCE/panel',
    UPDATE_CONFIG_EVENT = 'STORYBOOK_ADDON_CONFLUENCE/update_config',
    ADDON_TITLE = 'Confluence',
}
