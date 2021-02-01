import React, {ChangeEvent, FC, ReactElement, KeyboardEvent, useEffect, useState, useRef} from 'react'
import classNames from 'classnames'
import {Input, InputProps} from '../Input/input'
import Icon from '../Icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import Transition from '../Transition'

interface DataSourceObject {
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
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
    const [loading, setLoading] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const trigger = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debouncedValue = useDebounce(inputValue)
    useClickOutside(componentRef, () => {
        setShowDropdown(false)
    })

    useEffect(() => {
        if (debouncedValue && trigger.current) {
            const results = fetchSuggestions(debouncedValue)
            if (results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                    if (data.length > 0) {
                        setShowDropdown(true)
                    }
                })
            } else {
                setSuggestions(results)
                setShowDropdown(true)
                if (results.length > 0) {
                    setShowDropdown(true)
                }
            }
        } else {
            setShowDropdown(false)
        }
        setHighlightIndex(-1)
    }, [debouncedValue, fetchSuggestions])

    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const {key} = e
        switch (key) {
            case 'Enter':
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 'ArrowUp':
                highlight(highlightIndex - 1)
                break
            case 'ArrowDown':
                highlight(highlightIndex + 1)
                break
            case 'Escape':
                setShowDropdown(false)
                break
            default:
                break
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        trigger.current = true
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setShowDropdown(false)
        if (onSelect) {
            onSelect(item)
        }
        trigger.current = false
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropDown = () => {
        return (
            <Transition
                in={showDropdown || loading}
                animation='zoom-in-top'
                timeout={300}
                onExited={() => {
                    setSuggestions([])
                }}
            >
                <ul className='suggestion-list'>
                    {loading &&
                    <div className="suggestions-loading-icon">
                        <Icon icon="spinner" spin/>
                    </div>
                    }
                    {
                        suggestions.map((i, index) => {
                            const classes = classNames('suggestion-item', {
                                'is-active': index === highlightIndex
                            })
                            return (
                                <li key={index} className={classes} onClick={() => handleSelect(i)}>
                                    {
                                        renderTemplate(i)
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </Transition>
        )
    }

    return (
        <div className='auto-complete' ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...resetProps}
            />
            {
                generateDropDown()
            }
        </div>
    )
}