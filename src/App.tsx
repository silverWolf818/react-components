import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button, {ButtonType, ButtonSize} from "./components/Button"
import Menu from "./components/Menu"
import MenuItem from "./components/MenuItem"
import SubMenu from "./components/SubMenu"
import Icon from './components/Icon'

library.add(fas)

function App() {
    return (
        <div className="App">
            <Icon icon='arrow-left' theme='primary'/>

            <Button autoFocus className="custom">btn</Button>
            <Button disabled>disabled</Button>
            <Button size={ButtonSize.Large}>primary</Button>
            <Button btnType={ButtonType.Primary}>primary</Button>
            <Button btnType={ButtonType.Danger}>primary</Button>
            <Button size={ButtonSize.Small}>Small</Button>
            <Button btnType={ButtonType.Link} href='https://www.baid.com'>baidu</Button>
            <div>app</div>
            <div style={{ margin:"20px" }}>
                <Menu defaultIndex={"0"} defaultOpenSubMenus={["1"]} onSelect={(index) => index}>
                    <MenuItem>tab1</MenuItem>
                    <SubMenu title='dropdown'>
                        <MenuItem>dropdown1</MenuItem>
                        <MenuItem>dropdown2</MenuItem>
                    </SubMenu>
                    <MenuItem>tab3</MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default App;
