import { h } from 'preact';
import { createComponent } from '../../utils'

const Menu = createComponent('ul', 'menu')
Menu.Item = createComponent('li', 'menu-item')
Menu.Badge = createComponent('div', 'menu-badge')

export default Menu