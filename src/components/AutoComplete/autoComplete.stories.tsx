import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {AutoComplete, AutoCompleteProps, DataSourceType} from './autoComplete'

interface ListProps {
    value: string;
    number: number;
}

export default {
    title: '组件总览/数据录入/AutoComplete 自动完成',
    component: AutoComplete,
} as Meta

const list = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
]

const BasicAutoComplete = (args: AutoCompleteProps) => {

    const handleSuggestions = (query: string) => {
        return list.filter(i => i.value.includes(query))
    }

    const renderOption = (item: DataSourceType) => {
      const obj = item as DataSourceType<ListProps>
      return (
        <>
          <h2>Name: {obj.value}</h2>
          <p>Number: {obj.number}</p>
        </>
      )
    }
    return (
        <>
            <AutoComplete
                onSelect={args.onSelect}
                renderOption={renderOption}
                fetchSuggestions={handleSuggestions}
            />
        </>
    )
}

export const Template: Story<AutoCompleteProps> = args => <BasicAutoComplete {...args}/>