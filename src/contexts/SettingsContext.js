import { h, createContext } from 'preact'
import { useRef } from "preact/hooks"

export const SettingsContext = createContext()
SettingsContext.displayName = 'SettingsContext'

const SettingsContextProvider = ({ children }) => {
    const isLoading = useRef(true)
    const settingsValues = useRef({})

    const store = {
        loading: isLoading,
        settings: settingsValues
    }

    return (
        <SettingsContext.Provider value={store}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider
