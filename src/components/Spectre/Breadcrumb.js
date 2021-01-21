import { h } from 'preact';
import { createComponent } from '../../utils'
const modifiers = {
    center: "text-center"
}
const Breadcrumb = createComponent('ul', 'breadcrumb', modifiers)
Breadcrumb.Item = createComponent('li', 'breadcrumb-item')

export default Breadcrumb