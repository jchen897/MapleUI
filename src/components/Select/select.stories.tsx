import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Select from './index'
const defaultSelect = () => (
  <Select
    placeholder="Please Select"
    onChange={action('changed')}
    onVisibleChange={action('visible')}
  >
    <Select.Option value="Hello" />
    <Select.Option value="Hello1" />
    <Select.Option value="Hello2" />
    <Select.Option value="disabled" disabled/>
    <Select.Option value="Hello4" />
  </Select>
)
const multipleSelect = () => (
  <Select
    placeholder="Select mutiple options "
    onChange={action('changed')}
    onVisibleChange={action('visible')}
    multiple
  >
    <Select.Option value="Hello" />
    <Select.Option value="Hello2" />
    <Select.Option value="Hello3" />
    <Select.Option value="Maple" />
    <Select.Option value="Maple2" />
  </Select>
)

const disabledSelect = () => (
  <Select
    placeholder="Disable! "
    disabled
  >
    <Select.Option value="Hello" />
    <Select.Option value="Hello2" />
    <Select.Option value="Hello3" />
  </Select>  
)

storiesOf('Select', module)
  .add('Select', defaultSelect)
  .add('Multiple Select', multipleSelect)
  .add('Disabled Select', disabledSelect)