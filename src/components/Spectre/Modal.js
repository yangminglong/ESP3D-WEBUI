import { h } from 'preact';
import { createComponent } from '../../utils'
const modifiers = {
    lg: "text-lg",
    large: "text-lg",
    sm: "text-sm",
    small: "text-sm",
}
const Modal = createComponent('div', 'modal', modifiers)
Modal.Overlay = createComponent('a', 'modal-overlay')
Modal.Container = createComponent('div', 'modal-container')
Modal.Header = createComponent('div', 'modal-header')
Modal.Body = createComponent('div', 'modal-body')
Modal.Footer = createComponent('div', 'modal-footer')

export default Modal