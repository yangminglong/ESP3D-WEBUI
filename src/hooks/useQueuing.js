import { h } from 'preact'
import { useState, useEffect, useContext, useRef } from 'preact/hooks'
import { QueueingContext } from '../contexts/QueueingContext'
import { generateUID } from '../utils'

export const useQueuing = () => {
    const {
        addInQueue,
        removeRequests,
        getCurrentRequest
    } = useContext(QueueingContext)

    const [data, setData] = useState()
    const [killOnUnmount, setKillOnUnmount] = useState(true)
    const _localRequests = useRef([])

    useEffect(() => {
        return () => killOnUnmount && removeRequests(_localRequests.current)
    }, [])

    const createNewRequest = (url, params, callbacks = {}) => {
        const { onSuccess: onSuccessCb, onFail: onFailCb, onProgress: onProgressCb } = callbacks
        const id = generateUID()
        _localRequests.current = [..._localRequests.current, id]
        addInQueue({
            id,
            url,
            params,
            onSuccess: result => {
                setData(result)
                if (onSuccessCb) onSuccessCb(result) // Faire des trucs ici
            },
            onProgress: (e) => { onProgressCb(e) },
            onFail: onFailCb ? error => { onFailCb(error) } : null
        })
    }

    const abortRequest = () => {
        const currentRequest = getCurrentRequest()
        if (currentRequest) {
            currentRequest.abort()
        } else {
            // Toaster no current request
        }
    }

    return {
        data,
        setData,
        createNewRequest,
        abortRequest,
        setKillOnUnmount
    }
}
