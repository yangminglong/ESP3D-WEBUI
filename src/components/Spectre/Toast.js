import { h } from 'preact';
import { createComponent } from '../../utils'

const modifiers = {
    primary: 'toast-primary',
    success: 'toast-success',
    warning: 'toast-warning',
    error: 'toast-error',
}

const Toast = createComponent('div', 'toast', modifiers)
Toast.Close = createComponent('button', 'btn btn-clear float-right')

export default Toast