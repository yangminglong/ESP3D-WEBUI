import { h } from 'preact';
import { createComponent } from '../../utils'

const Panel = createComponent('div', 'panel')
Panel.Header = createComponent('div', 'panel-header')
Panel.Title = createComponent('div', 'panel-title')
Panel.Nav = createComponent('div', 'panel-nav')
Panel.Body = createComponent('div', 'panel-body')
Panel.Footer = createComponent('div', 'panel-footer')

export default Panel