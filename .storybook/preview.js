import React from 'react'
import '../src/styles/index.scss'

export const decorators = [
    (Story) => <div style={{ padding:'10px' }}>
        <h3 style={{ margin: '0 0 30px 0' }}>组件演示</h3>
        <Story/>
    </div>,
]

export const parameters = {
    actions: {argTypesRegex: '^on[A-Z].*'},
}