import { h } from 'preact';
import { createComponent } from '../../utils'

const Tile = createComponent('div', 'tile', { centered: "tile-centered" })
Tile.Icon = createComponent('div', 'tile-icon')
Tile.Content = createComponent('div', 'tile-content')
Tile.Action = createComponent('div', 'tile-action')
Tile.Title = createComponent('div', 'tile-title')
Tile.Subtitle = createComponent('div', 'tile-subtitle')

export default Tile