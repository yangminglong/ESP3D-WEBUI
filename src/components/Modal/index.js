import { h, Fragment } from 'preact'
import { useContext } from "preact/hooks";
import { UiContext } from '../../contexts/UiContext'
import { Modal as SpModal } from '../Spectre'

export const Modal = () => {
    const { modals } = useContext(UiContext)
    const { modalList, removeModal } = modals
    return modalList && modalList.length > 0 && (
        modalList.map((modal, index) => {
            const modalSize = modal.size || 'sm'
            return (
                <SpModal class={`active`} id="modal-id" key={index}>
                    <SpModal.Overlay aria-label="Close" onClick={() => removeModal(index)} />
                    <SpModal.Container>
                        <SpModal.Header>
                            <button
                                className="btn btn-clear float-right"
                                aria-label="Close"
                                onClick={() => removeModal(index)} />
                            <div className="modal-title h5">{modal.title && modal.title}</div>
                        </SpModal.Header>
                        <SpModal.Body>
                            <div className="content">
                                {modal.content && modal.content}
                            </div>
                        </SpModal.Body>
                        {modal.footer && <SpModal.Footer>{modal.footer}</SpModal.Footer>}
                    </SpModal.Container>

                </SpModal>

            )
        })

    )
}