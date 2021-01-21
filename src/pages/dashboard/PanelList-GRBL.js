import TemperaturesPanel from './Panels/TemperaturesPanel'
import PositionsPanel from './Panels/PositionsPanel'
import SpeedPanel from './Panels/SpeedPanel'
import FlowratePanel from './Panels/FlowratePanel'
import FanPanel from './Panels/FanPanel'
import ExtrusionPanel from './Panels/ExtrusionPanel'
import TerminalPanel from './Panels/TerminalPanel'
import FilesPanel from './Panels/FilesPanel'

const panelList = {
    positions: {
        comp: PositionsPanel,
    },
    speed: {
        comp: SpeedPanel,
    },
    terminal: {
        comp: TerminalPanel,
    },
    files: {
        comp: FilesPanel,
    },
}

export default panelList