import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { Button, Menu, Divider } from '../Spectre'
import { Settings, Menu as IconMenu, MoreHorizontal, EyeOff } from 'preact-feather';


const PanelDropdownMenu = ({ children }) => {
    const dropdownMenu = useRef()
    return (
        <div className="panel-dropdown">
            <div class="dropdown dropdown-right" ref={dropdownMenu}>
                <Button class="dropdown-toggle" onClick={() => dropdownMenu.current.focus()} action link><MoreHorizontal /></Button>
                <Menu>
                    {children}
                    {children && <Divider />}
                    <Menu.Item><Button link block><EyeOff size={16} /> Hide this panel</Button></Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default PanelDropdownMenu