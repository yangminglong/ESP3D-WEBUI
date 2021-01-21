import { h } from 'preact';
import { useRef, useState, useEffect } from 'preact/hooks';
import { Button, Panel } from '../../../components/Spectre'
import { Settings } from 'preact-feather';
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'

const FanControl = ({ id, min = 0, max = 100, steps = 5, unit, changeHandler = () => { } }) => {
    const step = Math.trunc((max - min) / steps)
    const fanSlider = useRef()
    const [fanValue, setFanValue] = useState(0)
    const [sliderValue, setSliderValue] = useState(fanValue)

    const handleSliderChange = (e) => {
        const value = fanSlider.current.value
        fanSlider.current.setAttribute('step', step)
        setFanValue(value)
        changeHandler(e, value)
    }
    const handleManualChange = (e) => {
        const value = e.target.value
        fanSlider.current.setAttribute('step', 1)
        setFanValue(value)
        changeHandler(e, value)
    }

    return (
        <div class="columns mb-2">
            <div className="column col-sm-1 col-1">{id}</div>
            <div className="column col-sm-8 col-8">
                <input
                    class="slider"
                    type="range"
                    min={min}
                    max={max}
                    value={fanValue}
                    step={step}
                    ref={fanSlider}
                    onInput={handleSliderChange}
                />
            </div>
            <div class="input-group column col-sm-3 col-3">
                <input
                    class="form-input input-sm"
                    name="foo"
                    type="number"
                    min={min}
                    max={max}
                    value={fanValue}
                    onChange={handleManualChange} />
                {unit && (<span class="input-group-addon addon-sm">{unit}</span>)}
            </div>
        </div>

    )
}

const mockFans = [
    {
        id: 'F0',
        unit: '%',
        steps: 10,
        changeHandler: (e, value) => { console.log(value) }
    },
    {
        id: 'F1',
        unit: '%'
    }]

const FanPanel = ({ title }) => {
    const [fans, setFans] = useState(mockFans)
    return (
        <Panel>
            <Panel.Header>
                <Panel.Title class="h5">{title}
                    <PanelDropdownMenu />
                </Panel.Title>
            </Panel.Header>
            <Panel.Body>
                {fans && fans.map(props => <FanControl {...props} />)}
            </Panel.Body>
            <Panel.Footer />
        </Panel>
    )
}

export default FanPanel