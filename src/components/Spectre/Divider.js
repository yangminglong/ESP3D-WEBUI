import { h } from 'preact';
import { createComponent } from '../../utils'
const modifiers = {
    center: "text-center"
}
const Divider = createComponent('div', 'divider', modifiers)
Divider.Vertical = createComponent('div', 'divider-vert')

export default Divider