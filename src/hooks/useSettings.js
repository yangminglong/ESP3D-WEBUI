import { h } from 'preact'
import { useState, useEffect, useContext, useRef } from 'preact/hooks'
import { SettingsContext } from '../contexts/SettingsContext'
import { useQueuing } from '../hooks/useQueuing'
import useUI from '../hooks/useUi'

export const useSettings = () => {
    const { createNewRequest } = useQueuing()
    const { modals, toasts } = useUI()
    const {
        loading,
        settings,
    } = useContext(SettingsContext)

    const [settingsState, setSettingsState] = useState(settings)

    const setSettings = (_settingsState) => {
        settings.current = _settingsState
        setSettingsState(_settingsState)
    }

    const getInterfaceSettings = () => {
        createNewRequest(
            `http://localhost:8080/preferences.json`,
            { method: 'GET' },
            {
                onSuccess: result => {
                    const jsonResult = JSON.parse(result)
                    setSettings({ ...settingsState.current, interface: jsonResult })
                    // setIsLoading(false)
                },
                onFail: error => {
                    // setIsLoading(false)
                    toasts.addToast({ content: error, type: 'error' })
                },
            }
        )
    }
    const getFeaturesSettings = () => {
        createNewRequest(
            `http://localhost:8080/command?cmd=${encodeURIComponent('[ESP400]')}`,
            { method: 'GET' },
            {
                onSuccess: result => {
                    const jsonResult = JSON.parse(result)
                    setSettings({ ...settingsState.current, features: jsonResult })
                    // setIsLoading(false)
                },
                onFail: error => {
                    // setIsLoading(false)
                    toasts.addToast({ content: error, type: 'error' })
                },
            }
        )
    }

    useEffect(() => {
        // (async () => {
        getFeaturesSettings()
        getInterfaceSettings()
        // setSettings(settingsState.current)
        // })()
    }, [])

    return [
        settings.current,
        (settingsState) => { settings.current = settingsState }
    ]
}