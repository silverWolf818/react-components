import React, {FC, createContext, useState} from "react";
import classNames from "classnames";

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: number) => void;

export interface IMenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}

interface IMenuContext {
    index: number;
    onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({index: 0});

const Menu: FC<IMenuProps> = props => {
    const {
        children,
        defaultIndex,
        className,
        mode,
        style,
        onSelect
    } = props;
    const [currentActive, setActive] = useState(defaultIndex);

    const handleClick = (index: number) => {
        setActive(index);
        onSelect && onSelect(index);
    }

    const valueContext: IMenuContext = {
        index: currentActive || 0,
        onSelect: handleClick
    }

    const classes = classNames('menu', {
        'menu-vertical': mode === 'vertical'
    }, className);

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={valueContext}>
                {children}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu;

