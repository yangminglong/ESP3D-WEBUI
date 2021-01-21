import { h } from 'preact';
import { Button, Panel } from '../../../components/Spectre'
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'

import { Settings } from 'preact-feather';
const ExtrusionPanel = ({ title }) => (
    <Panel>
        <Panel.Header>
            <Panel.Title class="h5">{title}
                <PanelDropdownMenu />
            </Panel.Title>
        </Panel.Header>
        <Panel.Nav>
            <ul class="tab tab-block">
                <li class="tab-item">
                    <a href="#">Extruder #0</a>
                </li>
                <li class="tab-item">
                    <a href="#" class="active">Extruder #1</a>
                </li>
            </ul>
        </Panel.Nav>
        <Panel.Body>
            <div class="input-group mt-2">
                <span class="input-group-addon">Feedrate</span>
                <input class="form-input" type="number" placeholder="400" />
                <span class="input-group-addon">mm/min</span>
            </div>
            <div class="input-group mt-2">
                <Button class="input-group-btn" action>1</Button>
                <Button class="input-group-btn active" action>10</Button>
                <Button class="input-group-btn" action>100</Button>
                <input class="form-input" type="number" placeholder="10" />
                <span class="input-group-addon">mm</span>
            </div>
        </Panel.Body>
        <Panel.Footer class="actions">
            <div className="columns">
                <div className="column col-6">
                    <Button block primary>Retract</Button>
                </div>
                <div className="column col-6">
                    <Button block primary>Extrude</Button>
                </div>
            </div>
        </Panel.Footer>
    </Panel>
)

export default ExtrusionPanel