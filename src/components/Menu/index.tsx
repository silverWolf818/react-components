import React, {FC, createContext, useState, Children, FunctionComponentElement, cloneElement} from "react";
import classNames from "classnames";
import {IMenuItemProps} from "../MenuItem";

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface IMenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({index: '0'});

const Menu: FC<IMenuProps> = props => {
    const {
        children,
        defaultIndex,
        className,
        mode,
        style,
        onSelect,
        defaultOpenSubMenus
    } = props;
    const [currentActive, setActive] = useState(defaultIndex);

    const handleClick = (index: string) => {
        setActive(index);
        onSelect && onSelect(index);
    }

    const valueContext: IMenuContext = {
        index: currentActive || '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }

    const classes = classNames('menu', {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    }, className);

    const renderChildren = () => Children.map(children, (item, index) => {
        const itemElement = item as FunctionComponentElement<IMenuItemProps>;
        const {displayName} = itemElement.type;
        if (displayName === 'MenuItem' || displayName === 'SubMenu') {
            return cloneElement(itemElement, {index: index.toString()});
        } else {
            console.error('Warning: Menu has a child which is not a MenuItem component');
        }
    })

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={valueContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu;

