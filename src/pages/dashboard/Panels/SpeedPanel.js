import { h } from 'preact';
import { Button, Panel } from '../../../components/Spectre'
import { Settings } from 'preact-feather';
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'

const SpeedPanel = ({ title }) => (
    <Panel>
        <Panel.Header>
            <Panel.Title class="h5">{title}
                <PanelDropdownMenu />
            </Panel.Title>
        </Panel.Header>
        <Panel.Body>
        </Panel.Body>
        <Panel.Footer />
    </Panel>
)

export default SpeedPanel