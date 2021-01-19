import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0'
import Button, {ButtonProps} from './button'

export default {
    title: 'Button',
    component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Basic = Template.bind({})

Basic.args = {
    children: 'Basic Button',
}

const SizeTemplate: Story<ButtonProps> = (args) => (
    <>
        <Button {...args} size='lg'>Large Button</Button>
        <br/>
        <Button {...args} size='sm'>Small Button</Button>
    </>
)

export const ButtonSize = SizeTemplate.bind({})