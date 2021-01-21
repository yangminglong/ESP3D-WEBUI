import { h } from 'preact';
import { createComponent } from '../../utils'

const modifiers = {
    lg: "loading-lg",
    large: "loading-lg",
}
const Loading = createComponent('div', 'loading', modifiers)

export default Loading