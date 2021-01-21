import { h, createContext } from 'preact'
import { useRef } from "preact/hooks"

import xhrWrapper from '../lib/httpRequest'

export const QueueingContext = createContext()
QueueingContext.displayName = 'QueueingContext'

const QueueingContextProvider = ({ children }) => {
    const requestQueue = useRef([]) // file d'attente des requêtes tous composants confondus
    const isBusy = useRef(false)
    const currentRequest = useRef()

    const addInQueue = newRequest => {
        requestQueue.current = [...requestQueue.current, newRequest]
        console.log('addInQueue', requestQueue)
        if (!isBusy.current) executeHttpCall()
    }

    const removeRequestDone = () => {
        requestQueue.current = [...requestQueue.current].slice(1)
        currentRequest.current = null
        console.log('removeRequestDone', requestQueue)
    }

    const removeRequests = requestIds => {
        const updatedRequestQueue = [...requestQueue.current].filter(({ id }) => {
            return !requestIds.includes(id)
        })
        requestQueue.current = updatedRequestQueue
    }

    const getCurrentRequest = () => {
        return currentRequest.current
    }

    const executeHttpCall = async () => {
        if (!isBusy.current) isBusy.current = true
        const { url, params, onSuccess, onFail, onProgress } = requestQueue.current[0]
        try {
            console.log(requestQueue.current[0])
            console.log(`requete en cours... ${requestQueue.current[0].id}`)
            currentRequest.current = xhrWrapper(url, params, onProgress)
            const response = await currentRequest.current.response
            // console.log(currentRequest.current)
            onSuccess(response)
            // requestQueue.current[0].onSuccess(currentRequest.current)
        } catch (e) {
            console.log('catch')
            console.log(e.message)
            if (onFail) onFail(e.message) //to-check
            // add toast notification
        } finally {
            removeRequestDone()
            if (requestQueue.current.length > 0) {
                console.log('next')
                executeHttpCall()
            } else {
                console.log('end')
                isBusy.current = false
            }
        }
    }

    return (
        <QueueingContext.Provider
            value={{ addInQueue, removeRequests, getCurrentRequest }}
        >
            {children}
        </QueueingContext.Provider>
    )
}

export default QueueingContextProvider
