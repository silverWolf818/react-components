import {FC} from 'react'
import {Menu, IMenuProps} from './menu'
import MenuItem, {IMenuItemProps} from '../MenuItem'
import SubMenu, {ISubMenuProps} from '../SubMenu'

export type IMenuComponent = FC<IMenuProps> & {
    Item: FC<IMenuItemProps>,
    SubMenu: FC<ISubMenuProps>
}
const MenuComponent = Menu as IMenuComponent

MenuComponent.Item = MenuItem
MenuComponent.SubMenu = SubMenu

export default MenuComponent