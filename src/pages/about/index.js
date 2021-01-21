import { h } from 'preact';
import { useEffect, useState } from "preact/hooks";
import { Loading } from '../../components/Spectre'
import { useQueuing } from '../../hooks/useQueuing'
import useUI from '../../hooks/useUi'
import Panel from '../../components/Spectre/Panel'

const About = () => {
    const { createNewRequest } = useQueuing()
    const { toasts } = useUI()

    const [isLoading, setIsLoading] = useState(true)
    const [props, setProps] = useState([])

    useEffect(() => {
        getProps()
    }, [])

    const getProps = () => {
        setIsLoading(true)
        createNewRequest(
            `http://localhost:8080/command?cmd=${encodeURIComponent('[ESP420]')}`,
            { method: 'GET' },
            {
                onSuccess: result => {
                    const { Status } = JSON.parse(result)
                    setProps([...Status])
                    setIsLoading(false)
                },
                onFail: error => {
                    setIsLoading(false)
                    toasts.addToast({ content: error, type: 'error' })
                },
            }
        )
    }

    return (
        <div id="about" className="container">
            <h2>About</h2>
            {isLoading && <Loading />}
            <Panel>
                <Panel.Body>
                    {!isLoading && props &&
                        <ul>
                            {props.map(({ id, value }) =>
                                <li><span class="label label-secondary">{id} </span> : <span class="text-dark">{value}</span></li>
                            )}
                        </ul>}
                    <button className="btn" onClick={() => { getProps() }}>Refresh</button>
                </Panel.Body>
                <Panel.Footer>
                </Panel.Footer>
            </Panel>
        </div>
    )
};

export default About;