import React from 'react';

import addons, { types } from '@storybook/addons';
import ConfluencePanel from './panel';
import { constants } from './typings';

addons.register(constants.ADDON_NAME, api => {
    const render = ({ active, key }: { active: boolean; key: string }) => (
        <ConfluencePanel api={ api }
            key={ key }
            channel={ addons.getChannel() }
            active={ active }/>
    );
    
    addons.add(constants.PANEL_NAME, {
        type: types.PANEL,
        title: constants.ADDON_TITLE,
        render,
    });
});



