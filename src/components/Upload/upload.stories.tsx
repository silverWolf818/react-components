import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {Upload as UploadComp, UploadProps} from './upload'

export default {
    title: '组件总览/数据录入/Upload',
    component: UploadComp,
} as Meta

const Template: Story<UploadProps> = (args) => <UploadComp {...args}/>

export const Upload = Template.bind({})

Upload.args = {
    action: 'https://jsonplaceholder.typicode.com/posts'
}