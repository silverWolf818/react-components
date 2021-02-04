import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {Upload as UploadComp, UploadFile, UploadProps} from './upload'

export default {
    title: '组件总览/数据录入/Upload',
    component: UploadComp,
} as Meta

const Template: Story<UploadProps> = (args) => <UploadComp {...args}/>

export const Upload = Template.bind({})

const defaultFileList: UploadFile[] = [
    {uid: '110', size: 1234, name: 'hello.md', status: 'uploading', percent: 30},
    {uid: '112', size: 1234, name: 'xyz.md', status: 'success', percent: 30},
    {uid: '114', size: 1234, name: 'abc.md', status: 'error', percent: 30}
]
// const checkFile = (file: File) => {
//     if (Math.round(file.size / 1024) > 50) {
//         alert('file too big')
//         return false
//     }
//     return true
// }

// const promiseFile = (file: File) => {
//     const temp = new File([file], 'new_name.doc', {type: file.type})
//     return Promise.resolve(temp)
// }

Upload.args = {
    action: 'https://jsonplaceholder.typicode.com/posts',
    defaultFileList
    // beforeUpload: checkFile
}