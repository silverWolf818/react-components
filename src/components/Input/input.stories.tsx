import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {Input as InputComp, InputProps} from './input'

export default {
    title: '组件总览/数据录入/Input',
    component: InputComp,
} as Meta

const Template: Story<InputProps> = (args) => <InputComp {...args}/>

export const Input = Template.bind({})