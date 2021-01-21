import { h } from 'preact';
import { useRef, useState, useEffect } from 'preact/hooks';
import { Panel, Button, Menu } from '../../../components/Spectre'
import { Field } from '../../../components/Form/Field'
import { Send } from 'preact-feather';
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'
import { useQueuing } from '../../../hooks/useQueuing'
import { useWS } from '../../../hooks/useWS'
import useUi from '../../../hooks/useUi'

const TerminalPanel = ({ title }) => {
    const { data, addData, setData } = useWS()
    const commandInputRef = useRef()
    const [terminalLn, setTerminalLn] = useState()
    const { createNewRequest, abortRequest } = useQueuing()
    const { toasts } = useUi()

    const clearTerminal = () => {
        setTerminalLn([])
        setData([])
    }

    useEffect(() => {
        setTerminalLn([...data])
    }, [data])

    const sendCommand = () => {
        if (commandInputRef.current) {
            const input = commandInputRef.current.value
            addData(input)
            setTerminalLn([...data])
            commandInputRef.current.value = ''
            createNewRequest(
                `http://localhost:8080/command?cmd=${encodeURIComponent(input)}&PAGEID=14`,
                { method: 'GET' },
                {
                    // onSuccess: result => { },
                    onFail: error => {
                        toasts.addToast({ content: error, type: 'error' })
                    }
                }
            )
        }
    }

    // useEffect(() => {
    //     setStdout([...stdout, ...data])
    // }, [data])

    return (
        <Panel>
            <Panel.Header>
                <Panel.Title class="h5">{title}
                    <PanelDropdownMenu>
                        <Menu.Item><Field type="boolean" id="" label="Verbose" /></Menu.Item>
                        <Menu.Item><Field type="boolean" id="" label="Autoscrool" /></Menu.Item>
                        <Menu.Item><a href="#" onClick={(e) => { clearTerminal(); e.preventDefault(); }}>Clear</a></Menu.Item>
                    </PanelDropdownMenu>
                </Panel.Title>
            </Panel.Header>
            <Panel.Body>
                <div id="terminal" >
                    {terminalLn && terminalLn.map(line => <pre>{line}</pre>)}
                </div>
                <form onSubmit={e => { e.preventDefault(); }}>
                    <div class="input-group">
                        <input type="text" class="form-input" ref={commandInputRef} />
                        <Button class="input-group-btn" primary type="submit" onclick={sendCommand}><Send /></Button>
                    </div>
                </form>
            </Panel.Body>
            <Panel.Footer />
        </Panel>
    )
}

export default TerminalPanel