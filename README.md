# Description

Confluence storybook addon to embed private and public confluence pages.
This addon was designed and tested only in a react environment.

[![Build Status][circleci-image]][circleci-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![NPM version][npm-version-image]][npm-url]
[![Code quality][codeclimate-image]][codeclimate-url]
[![MIT License][license-image]][license-url]

# Installation

```bash
npm i @dreipol/storybook-confluence-addon -D
```

# Usage

1. Register the plugin in `addons.js`
    ```js
    import '@dreipol/storybook-confluence-addon/register';
    ```
2. Set your confluence project id and API token
    ```js
    import { addDecorator } from '@storybook/react';
    import { withConfluence } from '@dreipol/storybook-confluence-addon';

    addDecorator(withConfluence({
        username: process.env.CONFLUENCE_USERNAME,
        password: process.env.CONFLUENCE_PASSWORD,
        domain: process.env.CONFLUENCE_DOMAIN,
    }));
    ```
3. Use it in your component stories
    ```jsx harmony
   stories.add(
        'Default',
        () => <ComponentExample/>,
        {
          // the id of the confluence page we want to fetch
          confluence: { 
             id: 'foo',
          },
        },
    );
    ```
    
    
[circleci-image]: https://circleci.com/gh/dreipol/storybook-confluence-addon.svg?style=svg
[circleci-url]: https://circleci.com/gh/dreipol/storybook-confluence-addon
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]: LICENSE
[npm-version-image]: http://img.shields.io/npm/v/@dreipol/storybook-confluence-addon.svg?style=flat-square
[npm-downloads-image]: http://img.shields.io/npm/dm/@dreipol/storybook-confluence-addon.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@dreipol/storybook-confluence-addon
[codeclimate-image]: https://api.codeclimate.com/v1/badges/8d977f051efffb8ef19c/maintainability
[codeclimate-url]: https://codeclimate.com/github/dreipol/storybook-confluence-addon/maintainability


