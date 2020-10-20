import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Tabs from './tabs'
import TabItem from './tabItem'
import Icon from '../Icon'
const defaultTabs = () => (
  <Tabs onSelect={action('selected')}>
    <TabItem label="Option1">this is content one</TabItem>
    <TabItem label="Option2">this is content two</TabItem>
    <TabItem label="Another Option">this is content three</TabItem>
  </Tabs>
)

const cardTabs = () => (
  <Tabs onSelect={action('selected')} type="card">
    <TabItem label='card1'>this is card one</TabItem>
    <TabItem label="card2">this is content two</TabItem>
    <TabItem label="disabled" disabled>this is content three</TabItem>
  </Tabs> 
)

const customTabs = () => (
  <Tabs onSelect={action('selected')} type="card">
    <TabItem label={<><Icon icon="check-circle" />  自定义图标</>}>this is card one</TabItem>
    <TabItem label="tab2">this is content two</TabItem>
  </Tabs> 
)
storiesOf('Tabs', module)
  .add('Default Tabs', defaultTabs)
  .add('Tabs with Style', cardTabs)
  .add('Custom Tabs', customTabs)