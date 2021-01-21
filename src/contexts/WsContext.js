import { h, createContext } from 'preact'
import { useState, useEffect, useRef, useReducer } from "preact/hooks"
import { useDebugLog } from 'preact-usedebuglog'
import Parser from '../../src/lib/parser'

/**
 * @todo limit the WS buffer size (wsData and parsedValue)
 */

export const WsContext = createContext()
WsContext.displayName = "wsContext"

const INITIAL_STATE = {
    temp: [],
    files: []
}

const reducer = (state, action) => {
    if (!action) return INITIAL_STATE
    switch (action.type) {
        case 'temp':
            return {
                ...state,
                temp: [...state.temp, action.values]
            }
        case 'files':
            return {
                ...state,
                files: [...action.values]
            }
        default:
            return { ...INITIAL_STATE, ...state }
    }
}

const WsContextProvider = ({ children }) => {
    const c = useDebugLog('WsContextProvider')
    const [parsedValues, dispatch] = useReducer(reducer, INITIAL_STATE)
    const dataBuffer = useRef([])
    const parser = useRef(new Parser('marlin'))
    const [wsConnection, setWsConnection] = useState()
    const [wsData, setWsData] = useState([])
    const webSocketIp = 'localhost'
    const webSocketPort = 81

    const splitArrayBufferByLine = (arrayBuffer) => {
        const bytes = new Uint8Array(arrayBuffer)
        return bytes.reduce((acc, curr) => {
            if (curr == 10 || curr == 13) return [...acc, []]
            const i = Number(acc.length - 1)
            return [...acc.slice(0, i), [...acc[i], curr]]
        }, [[]])
    }

    const onMessageCB = (e) => {
        const { parse } = parser.current
        //for binary messages used for terminal
        const stdOutData = e.data
        if (stdOutData instanceof ArrayBuffer) {
            const newLines = splitArrayBufferByLine(stdOutData)
                .map(line =>
                    line.reduce((acc, curr) =>
                        acc + String.fromCharCode(curr), '')
                )
            dataBuffer.current = [...dataBuffer.current, ...newLines]
            c.log(newLines);
            [...newLines].forEach(line => {
                dispatch(parse(line))
            })
        } else { //others txt messages
            dataBuffer.current = [...dataBuffer.current, stdOutData]
            const parsedRes = parse(stdOutData)

            if (parsedRes) {
                c.log(parsedRes)
                dispatch(parsedRes)
            }

        }
        setWsData(dataBuffer.current)
    }

    const onCloseCB = (e) => {
        c.log(e)
    }

    const onErorCB = (e) => {
        c.log(e)
        // toasts.addToast({ content: e, type: 'error' })
    }

    useEffect(() => {
        const ws = new WebSocket(`ws://${webSocketIp}:${webSocketPort}`, ['arduino'])
        ws.binaryType = "arraybuffer"
        setWsConnection(ws)

        //Handle msg of ws
        ws.onmessage = e => onMessageCB(e)
        ws.onclose = e => onCloseCB(e)
        ws.onerror = e => onErorCB(e)

        return () => { if (wsConnection) ws.close() }
    }, [])

    const addData = (cmdLine) => {
        const newWsData = [...wsData, cmdLine]
        dataBuffer.current = newWsData
        setWsData(newWsData)
    }
    const setData = (cmdLine) => {
        dataBuffer.current = cmdLine
        setWsData(cmdLine)
    }

    const store = {
        ws: wsConnection,
        data: wsData,
        parsedValues,
        setData,
        addData,
    }

    return (
        <WsContext.Provider value={store}>
            {children}
        </WsContext.Provider>
    )
}

export default WsContextProvider