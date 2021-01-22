import React, {ChangeEvent, FC, useState} from 'react'
import {Input, InputProps} from '../Input/input'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => string[];
    onSelect?: (item: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
    const {
        fetchSuggestions,
        value,
        onSelect,
        ...resetProps
    } = props

    const [inputValue, setInputValue] = useState(value)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
    }

    return (
        <div>
            <Input
                value={inputValue}
                onChange={handleChange}
                {...resetProps}
            />
        </div>
    )
}