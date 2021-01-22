import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import {Input} from './input'

const defaultProps = {
    onChange: jest.fn(),
    placeholder: 'test-input',
}

describe('test Input Component', () => {
    it('should render the correct default Input', () => {
        const wrapper = render(<Input {...defaultProps}/>)
        const element = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('input-inner')
        fireEvent.change(element, {target: {value: '20'}})
        expect(defaultProps.onChange).toHaveBeenCalled()
        expect(element.value).toEqual('20')
    })
    it('should render the disabled Input on disabled property', () => {
        const wrapper = render(<Input disabled placeholder='disabled'/>)
        const element = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
        expect(element.disabled).toBeTruthy()
    })
    it('should render different input size on size property', () => {
        const wrapper = render(<Input placeholder="sizes" size="lg" />)
        const element = wrapper.container.querySelector('.input-wrapper')
        expect(element).toHaveClass('input-size-lg')
    })
    it('should render prepend an append element on property', ()=> {
       const wrapper = render(<Input placeholder="pend" prepend="https://" append=".com"/>)
        const element = wrapper.container.querySelector('.input-wrapper')
        expect(element).toHaveClass('input-group input-group-append input-group-prepend')
        expect(wrapper.queryByText('https://')).toBeInTheDocument()
        expect(wrapper.queryByText('.com')).toBeInTheDocument()
    })
})