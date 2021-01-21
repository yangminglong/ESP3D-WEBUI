import FanPanel from './Panels/FanPanel'
import ExtrusionPanel from './Panels/ExtrusionPanel'
import FlowratePanel from './Panels/FlowratePanel'
import FilesPanel from './Panels/FilesPanel'
import MacroPanel from './Panels/MacroPanel'
import PositionsPanel from './Panels/PositionsPanel'
import SpeedPanel from './Panels/SpeedPanel'
import TemperaturesPanel from './Panels/TemperaturesPanel'
import TerminalPanel from './Panels/TerminalPanel'


const panelList = {
    temperatures: {
        comp: TemperaturesPanel,
    },
    positions: {
        comp: PositionsPanel,
    },
    speed: {
        comp: SpeedPanel,
    },
    flowrate: {
        comp: FlowratePanel,
    },
    fan: {
        comp: FanPanel,
    },
    extrusion: {
        comp: ExtrusionPanel,
    },
    terminal: {
        comp: TerminalPanel,
    },
    files: {
        comp: FilesPanel,
    },
    macro: {
        comp: MacroPanel,
    },
}

export default panelList