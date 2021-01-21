import { h } from 'preact';
import { createComponent } from '../../utils'

const modifiers = {
    link: "btn-link",
    primary: "btn-primary",
    error: "btn-error",
    success: "btn-success",
    lg: "btn-lg",
    sm: "btn-sm",
    block: "btn-block",
    action: "btn-action",
    circle: "s-circle",
    active: "active",
    disable: "disable",
    loading: "loading",
}
const Button = createComponent('button', 'btn', modifiers)

export default Button