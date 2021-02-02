import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {Button as ButtonComp, ButtonProps} from './button'

export default {
    title: '组件总览/通用/Button',
    component: ButtonComp
} as Meta

const Template: Story<ButtonProps> = (args) => <ButtonComp {...args} />

export const Button = Template.bind({})

Button.args = {
    children: 'Basic Button',
    className: 'test',
    disabled: false,
    btnType: 'default'
}