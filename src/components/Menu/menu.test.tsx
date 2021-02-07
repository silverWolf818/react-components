import React from 'react'
import {cleanup, fireEvent, render, RenderResult, waitFor} from '@testing-library/react'
import {Menu, IMenuProps} from './menu'
import MenuItem from '../MenuItem'
import SubMenu from '../SubMenu'


jest.mock('../Icon', () => {
    return () => {
        return <i className="fa"/>
    }
})
jest.mock('react-transition-group', () => {
    return {
        CSSTransition: (props: any) => {
            return props.children
        }
    }
})

const testProps: IMenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: IMenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}

const generateMenu = (props: IMenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                xyz
            </MenuItem>
            <SubMenu title='dropdown'>
                <MenuItem>drop1</MenuItem>
            </SubMenu>
        </Menu>
    )
}

const createCSSFile = () => {
    const file: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display:block;
    }
    `

    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = file
    return style
}

let wrapper: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement

describe('test Menu and MenuItem Component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createCSSFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render the correct default Menu and MenuItem', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback', () => {
        const clickItem = wrapper.getByText('xyz')
        fireEvent.click(clickItem)
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('should show dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const verticalWrapper = render(generateMenu(testVerProps))
        const element = verticalWrapper.getByTestId('test-menu')
        expect(element).toHaveClass('menu menu-vertical')
    })
})
