import React from "react";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import Menu, {IMenuProps} from "./index";
import MenuItem from "../MenuItem";

const testProps: IMenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: IMenuProps = {
    defaultIndex: 0,
    mode: 'vertical'
}

const generateMenu = (props: IMenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem index={0}>
                active
            </MenuItem>
            <MenuItem index={1} disabled>
                disabled
            </MenuItem>
            <MenuItem index={2}>
                xyz
            </MenuItem>
        </Menu>
    )
}

let wrapper: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;

describe('test Menu and MenuItem Component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps));
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    });
    it('should render the correct default Menu and MenuItem', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('menu test');
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(3);
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    });
    it('click items should change active and call the right callback', () => {
        const clickItem = wrapper.getByText('xyz');
        fireEvent.click(clickItem);
        expect(activeElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).toHaveBeenCalledWith(2);
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
    });
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup();
        const verticalWrapper = render(generateMenu(testVerProps));
        const element = verticalWrapper.getByTestId('menu-test');
        expect(element).toHaveClass('menu menu-vertical');
    });
})
