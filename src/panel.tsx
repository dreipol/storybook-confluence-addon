/* eslint-disable @typescript-eslint/ban-ts-ignore, @typescript-eslint/no-explicit-any */
import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { STORY_CHANGED, STORY_RENDERED } from '@storybook/core-events';
// @ts-ignore
import { Placeholder } from '@storybook/components';

import { Channel } from '@storybook/channels';
import { APIConfig, constants, DecoratorParams } from './typings';

declare interface StorybookAddon extends Channel {
    getParameters(id: string, key: string): DecoratorParams;
}

interface Props {
    active: boolean;
    api: StorybookAddon;
    channel: Channel;
}

const getContentById = (config: APIConfig, id: string) => {
    return fetch(`${ config.domain }/rest/api/content/${ id }?expand=${ expanders.join() }`, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${ btoa(`${ config.username }:${ config.password }`) }`,
            'Content-Type': 'application/json',
        },
    });
};

function PlaceholderMessage(props: any): ReactElement {
    return (
        <Placeholder>
            <Fragment { ...props }/>
        </Placeholder>
    );
}

export default function ConfluencePanel({ api, active, channel }: Props): ReactElement {
    const [hasHTML, setHasHTML] = useState();
    const [html, setHTML] = useState();
    const [apiConfig, setApiConfig] = useState<APIConfig>();
    const [storyId, changeStory] = useState<string>();
    
    useEffect(() => {
        const onStoryChanged = async (newStoryID: string) => {
            changeStory(newStoryID);
            
            const params = api.getParameters(newStoryID, constants.PARAM_KEY);
            
            setHasHTML(Boolean(params));
            
            if (!params) {
                return;
            }
            
            const { id } = params;
            
            if (id && apiConfig) {
                const res = await getContentById(apiConfig, id);
                setHTML(await res.text());
            }
        };
        
        channel.on(constants.UPDATE_CONFIG_EVENT, setApiConfig);
        channel.on(STORY_CHANGED, onStoryChanged);
        channel.on(STORY_RENDERED, onStoryChanged);
        
        return () => {
            channel.removeListener(constants.UPDATE_CONFIG_EVENT, setApiConfig);
            channel.removeListener(STORY_CHANGED, onStoryChanged);
            channel.removeListener(STORY_RENDERED, onStoryChanged);
        };
    }, [apiConfig]);
    
    if (!active) {
        return <noscript/>;
    }
    
    if (hasHTML === false) {
        return <PlaceholderMessage>This component has no confluence content ¯\_(ツ)_/¯</PlaceholderMessage>;
    }
    
    if (!html || !storyId) {
        return <PlaceholderMessage>Loading...</PlaceholderMessage>;
    }
    
    return <div dangerouslySetInnerHTML={ { __html: html } }></div>;
}
