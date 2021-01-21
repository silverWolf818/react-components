import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {Input,InputProps} from './input'

export default {
    title: '组件总览/表单/Input 按钮',
    component: Input
} as  Meta

const Template:Story<InputProps> = (args) => <Input {...args}/>

export const Basic =  Template.bind({});