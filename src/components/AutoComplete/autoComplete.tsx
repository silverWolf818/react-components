import React, {ChangeEvent, FC, ReactElement, useState} from 'react'
import {Input, InputProps} from '../Input/input'

interface DataSourceObject {
    value: string;
}

export type DataSourceType<T= {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[]
    onSelect?: (item: DataSourceType) => void
    renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
    const {
        value,
        renderOption,
        fetchSuggestions,
        onSelect,
        ...resetProps
    } = props

    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        if (value) {
            const result = fetchSuggestions(value)
            setSuggestions(result)
        } else {
            setSuggestions([])
        }
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropDown = () => {
        return (
            <ul>
                {
                    suggestions.map((i, index) => {
                        return (
                            <li key={index} onClick={() => handleSelect(i)}>
                                {
                                    renderTemplate(i)
                                }
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    return (
        <div className='auto-complete'>
            <Input
                value={inputValue}
                onChange={handleChange}
                {...resetProps}
            />
            {
                generateDropDown()
            }
        </div>
    )
}