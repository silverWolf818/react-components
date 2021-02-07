import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {Menu as MenuComp, IMenuProps} from './menu'
import MenuItem from '../MenuItem'

export default {
    title: '组件总览/通用/Menu',
    component: MenuComp
} as Meta

const Template: Story<IMenuProps> = (args) => <MenuComp {...args}>
    <MenuItem>
        cool link
    </MenuItem>
    <MenuItem disabled>
        disabled
    </MenuItem>
    <MenuItem>
        cool link 2
    </MenuItem>
</MenuComp>

export const Menu = Template.bind({})

Menu.args = {
    defaultIndex: '0'
}