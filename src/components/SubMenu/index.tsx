import React, {Children, FC, FunctionComponentElement, useContext, useState, MouseEvent, cloneElement} from "react"
import classNames from "classnames"
import {MenuContext} from "../Menu/menu"
import {IMenuItemProps} from "../MenuItem"
import Icon from "../Icon"
import Transition from "../Transition"

export interface ISubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

let timer: any

const SubMenu: FC<ISubMenuProps> = props => {
    const context = useContext(MenuContext)
    const {children, index, title, className} = props
    const openSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpen = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false
    const [menuOpen, setOpen] = useState(isOpen)

    const classes = classNames('menu-item submenu-item', {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
    }, className)

    const handleClick = (e: MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }

    const handleMouse = (e: MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick,
    } : {}

    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: MouseEvent) => {
            handleMouse(e, true)
        },
        onMouseLeave: (e: MouseEvent) => {
            handleMouse(e, false)
        },
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('submenu', {
            'menu-opened': menuOpen,
        })
        const childrenComponent = Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<IMenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return cloneElement(childElement, {
                    index: `${index}-${i}`,
                })
            } else {
                console.error('Warning: SuMenu has a child which is not a MenuItem component')
            }
        })
        return (
            <Transition
                in={menuOpen}
                timeout={300}
                animation='zoom-in-top'
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className='submenu-title' {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon"/>
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
