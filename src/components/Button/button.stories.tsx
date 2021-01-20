import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {Button, ButtonProps} from './button'

export default {
    title: '组件总览/通用/Button 按钮',
    component: Button
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Basic = Template.bind({})

Basic.args = {
    children: 'Basic Button',
    className: 'test',
    disabled: false,
    btnType: 'default'
}