import React from 'react'
import { storiesOf } from '@storybook/react'

const markdownText = `
## MapleUI component library

Component Presentation:
https://jchen897.github.io/MapleUI
### Please try to install the component library

~~~javascript
npm i maplecomponent
~~~

### How to import

~~~javascript
// Load Styles
import 'vikingship/dist/index.css'
// Import Component
import { Button } from 'vikingship'
~~~

## Local Development
~~~bash
npm run storybook

npm test

npm run build

npm run publish
~~~
`
storiesOf('Welcome to MapleUI', module)
  .add('welcome', () => {
    return (
      <h2>Welcome to the MapleUI</h2>
    )
  }, { info : { text: markdownText, source: false, }})