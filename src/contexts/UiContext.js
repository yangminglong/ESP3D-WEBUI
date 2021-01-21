import { h, createContext } from 'preact'
import { useState, useRef } from "preact/hooks"
import { generateUID, removeEntriesByIDs } from "../utils"

const UiContext = createContext(null)
UiContext.displayName = 'uiContext'

const UiContextProvider = ({ children }) => {
    const [data, setData] = useState()
    const [modals, setModal] = useState([])
    const [toasts, setToasts] = useState([])
    const toastsRef = useRef(toasts)
    toastsRef.current = toasts

    const addToast = (newToast) => { setToasts([...toasts, { ...newToast, id: generateUID() }]) }

    const removeToast = (uids) => {
        const removedIds = removeEntriesByIDs(toastsRef.current, uids)
        setToasts([...removedIds])
    }

    const addModal = (newModal) => setModal([...modals, newModal])
    const removeModal = (modalIndex) => {
        const newModalList = modals.filter((modal, index) => index !== modalIndex)
        setModal(newModalList)
    }

    const store = {
        data: [data, setData],
        modals: { modalList: modals, addModal, removeModal },
        toasts: { toastList: toasts, addToast, removeToast },
    }

    return (
        <UiContext.Provider value={store}>
            {children}
        </UiContext.Provider>
    )
}

export { UiContext }
export default UiContextProvider