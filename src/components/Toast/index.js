import { h } from 'preact'
import { useContext, useEffect, useRef } from "preact/hooks";
import { UiContext } from '../../contexts/UiContext'
import { Toast as SpectreToast } from '../Spectre'

const Toast = ({ index, type = '', children, timeout = 2000, remove }) => {

    useEffect(() => {
        let timer
        if (timeout) {
            timer = setTimeout(() => {
                remove(index)
            }, timeout)
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <SpectreToast {...{ [type]: true }}>
            <SpectreToast.Close onClick={() => { remove(index) }} />
            {index} - {children}
        </SpectreToast>
    )

}

export const ToastsContainer = () => {
    const { toasts } = useContext(UiContext)
    const { toastList, removeToast } = toasts

    return toastList && <div class="toasts-container">
        {toastList.map((toast) => {
            const { id, type, content } = toast
            return (
                <Toast remove={removeToast} index={id} type={type} key={id}>
                    {content}
                </Toast>
            )
        })}
    </div>
}