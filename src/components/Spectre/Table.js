import { h } from 'preact';
import { createComponent } from '../../utils'

const modifiers = {
    striped: "table-striped",
    hover: "table-hover",
    scroll: "table-scroll",
}
const Table = createComponent('table', 'table', modifiers)

export default Table