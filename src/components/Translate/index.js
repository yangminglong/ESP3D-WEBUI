import { h, createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

const TranslateContext = createContext()
TranslateContext.displayName = 'TranslateContext'

const defaultSource = {
    0: "Yes",
    1: "No"
}

export const TranslateContextProvider = ({ children }) => {
    const [targetLang, setTargetLang] = useState(defaultSource)
    const [fallbackLang, setFallbackLang] = useState({}) //not implemented yet

    const store = {
        targetLang,
        setTargetLang,
        fallbackLang,
        setFallbackLang
    }

    return (
        <TranslateContext.Provider
            value={store}
        >
            {children}
        </TranslateContext.Provider>
    )
}

export const useTranslateContext = () => useContext(TranslateContext)

/**
 * @param id translation id
 * @param p plural, is a number if > 1, use plural
 * @param d default value
 * @param children default value
 */



const T = ({ id, p = 0, d = '', children }) => {
    const { targetLang, fallbackLang } = useTranslateContext()
    const defaultValue = (typeof children !== 'undefined') ? children : d

    if (p > 1 && Array.isArray(targetLang[id])) return String(targetLang[id].slice(-1))
    if (typeof targetLang[id] === 'undefined') return String(defaultValue)
    return (Array.isArray(targetLang[id])) ? String(targetLang[id].slice(0, 1)) : String(targetLang[id])
    return true
}

export default T