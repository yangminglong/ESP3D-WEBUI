import FanPanel from './FanPanel'
import ExtrusionPanel from './ExtrusionPanel'
import FlowratePanel from './FlowratePanel'
import FilesPanel from './FilesPanel'
import MacroPanel from './MacroPanel'
import PositionsPanel from './PositionsPanel'
import SpeedPanel from './SpeedPanel'
import TemperaturesPanel from './TemperaturesPanel'
import TerminalPanel from './TerminalPanel'

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