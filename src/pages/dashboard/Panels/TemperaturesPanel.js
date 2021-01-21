import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { Panel, Table } from '../../../components/Spectre'
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'
import { useWS } from '../../../hooks/useWS'
import useESP3D from '../../../hooks/useESP3D/index'
import { SmoothieChart, TimeSeries } from 'smoothie'

const INITIAL_STATE = [{
    "id": "T0",
    "value": 0,
    "target": 0
}, {
    "id": "B0",
    "value": 0,
    "target": 0
}]

const TempEntry = ({ id, target, setTemp, unit }) => {
    const [targetState, setTargetState] = useState(target)
    useEffect(() => { setTargetState(target) }, [target])
    return (
        <Fragment>
            <input class="form-input input-sm" type="number" min="0" max="999" id="heaterT0SelectedTemp" value={targetState} onChange={(e) => setTargetState(e.target.value)} />
            <span class="input-group-addon addon-sm">{`°${unit}`}</span>
            <button class="btn btn-primary input-group-btn btn-sm" onClick={(e) => { setTargetState(targetState); setTemp(targetState, id) }}>Set</button>
            <button class="btn input-group-btn btn-sm" onClick={(e) => { setTargetState(0); setTemp(0, id) }}>Off</button>
        </Fragment>
    )
}

const TempRow = ({ id, target, value, unit = 'C' }) => {
    const { setHotEndTemp } = useESP3D()
    // const setHotEndTemp = (value, id) => {
    //     console.log(value, id)
    // }
    return (
        <tr>
            <td>{id}</td>
            <td>
                <div class="input-group">
                    <TempEntry id={id} target={target} unit={unit} setTemp={setHotEndTemp} />
                </div>
            </td>
            <td>{value} {`°${unit}`}</td>
        </tr>)
}

const Chart = () => {
    const smoothie = useRef()
    const lineRef = useRef()
    const { parsedValues } = useWS()
    const smoothieOpt = {
        millisPerPixel: 100,
        labels: { fillStyle: '#dadee4' },
        grid: {
            fillStyle: '#ffffff',
            strokeStyle: '#eef0f3',
            sharpLines: true,
            millisPerLine: 10000,
            verticalSections: 3,
            borderVisible: false,
            limitFPS: 15,
            maxValue: 400,
            minValue: -20
        },
        limitFPS: 15
    }
    const chart = new SmoothieChart(smoothieOpt);
    const [lines, setLines] = useState()
    const line1 = new TimeSeries()
    // const line2 = new TimeSeries()

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    useEffect(() => {
        const canvas = smoothie.current
        // Create the chart
        lineRef.current = new TimeSeries()
        chart.streamTo(canvas, 0);
        chart.addTimeSeries(line1, { strokeStyle: '#a55eea' });
        chart.addTimeSeries(lineRef.current, { strokeStyle: '#fc5c65' });

        // const interval = setInterval(function () {
        //     line1.append(Date.now(), getRandomIntInclusive(100, 200));
        //     line2.append(Date.now(), getRandomIntInclusive(100, 200));
        // }, 2000);
        // return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //     const interval = setInterval(function () {
    //         // line1.append(Date.now(), getRandomIntInclusive(100, 200));
    //         // line2.append(Date.now(), getRandomIntInclusive(100, 200));
    //     }, 2000);
    //     return () => clearInterval(interval);
    // }, [])

    useEffect(() => {
        console.log('changement', parsedValues)
        if (parsedValues.temp.length > 0) {
            const { temp } = parsedValues
            const lastKey = parsedValues.temp.length - 1
            console.log(parseFloat(temp[lastKey][0].value) * 100)
            lineRef.current.append(Date.now(), parseFloat(temp[lastKey][0].value) * 100);

        }
    }, [parsedValues])



    return <div>
        <canvas id="chart" width="450" height="100" ref={smoothie} />
    </div>
}

const TemperaturesPanel = ({ title }) => {
    const { parsedValues } = useWS()
    const [elements, setElements] = useState(INITIAL_STATE)

    useEffect(() => {
        const { temp } = parsedValues
        if (temp.length > 0) {
            const [lastElement] = temp.slice(temp.length - 1)
            setElements(lastElement)
        }
    }, [parsedValues.temp])

    return (
        <Panel>
            <Panel.Header>
                <Panel.Title class="h5">{title}
                    <PanelDropdownMenu />
                </Panel.Title>
            </Panel.Header>
            <Panel.Body>
                <Chart series={parsedValues} />
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Options</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elements && elements.map(({ id, value, target }) =>
                            <TempRow
                                id={id}
                                value={value}
                                target={target}
                            />
                        )}
                    </tbody>
                </Table>
            </Panel.Body>
            <Panel.Footer />
        </Panel>
    )
}

export default TemperaturesPanel