import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './index'

export const defaultMenu = () => (
  <Menu defaultIndex='0' onSelect={action('selected!')} >
    <Menu.Item>
      cool link
    </Menu.Item>
    <Menu.Item>
      cool link 2
    </Menu.Item>
    <Menu.Item disabled>
      disabled
    </Menu.Item> 
    <Menu.SubMenu title="Options">
      <Menu.Item>
        Option1
      </Menu.Item>
      <Menu.Item>
        Option2
      </Menu.Item>    
    </Menu.SubMenu>
  </Menu>
)
export const clickMenu = () => (
  <Menu defaultIndex='0' onSelect={action('selected!')} mode="vertical">
    <Menu.Item>
      cool link
    </Menu.Item>
    <Menu.Item>
      cool link 2
    </Menu.Item>
    <Menu.SubMenu title="Options">
      <Menu.Item>
        Option1
      </Menu.Item>
      <Menu.Item>
        Option2
      </Menu.Item>    
    </Menu.SubMenu>
  </Menu>
)
export const openedMenu = () => (
  <Menu defaultIndex='0' onSelect={action('selected!')} mode="vertical" defaultOpenSubMenus={['2']}>
    <Menu.Item>
      cool link
    </Menu.Item>
    <Menu.Item>
      cool link 2
    </Menu.Item>
    <Menu.SubMenu title="Options">
      <Menu.Item>
        Option1
      </Menu.Item>
      <Menu.Item>
        Option2
      </Menu.Item>    
    </Menu.SubMenu>
  </Menu>
)

storiesOf('Menu', module)
.add('Default Menu', defaultMenu )
.add('Vertical Menu', clickMenu)
.add('Opened Menu', openedMenu)