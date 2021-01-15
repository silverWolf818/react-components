import React from 'react';
import Button, {ButtonType, ButtonSize} from "./components/Button"
import Menu from "./components/Menu"
import MenuItem from "./components/MenuItem"

function App() {
    return (
        <div className="App">
            <Button autoFocus className="custom">btn</Button>
            <Button disabled>disabled</Button>
            <Button size={ButtonSize.Large}>primary</Button>
            <Button btnType={ButtonType.Primary}>primary</Button>
            <Button btnType={ButtonType.Danger}>primary</Button>
            <Button size={ButtonSize.Small}>Small</Button>
            <Button btnType={ButtonType.Link} href='https://www.baid.com'>baidu</Button>
            <div>app</div>

            <Menu mode="vertical" defaultIndex={0} onSelect={(index) => alert(index)}>
                <MenuItem index={0}>tab1</MenuItem>
                <MenuItem index={1}>tab2</MenuItem>
                <MenuItem index={2}>tab3</MenuItem>
            </Menu>
        </div>
    );
}

export default App;
