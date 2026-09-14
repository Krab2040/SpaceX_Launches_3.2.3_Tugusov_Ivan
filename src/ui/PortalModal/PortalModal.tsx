import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './PortalModal.sass'

type PortalModalProps = {
    opened: boolean
    onClose: () => void
    children: ReactNode
}

export default function PortalModal({opened, onClose, children,}: PortalModalProps) {
    useEffect(() => {
        if (!opened) {
            return
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [opened, onClose])

    if (!opened) {
        return null
    }

    return createPortal(
        <div
            className="modal-overlay"
            onMouseDown={onClose}
        >
            <div
                className="modal-dialog"
                role="dialog"
                aria-modal="true"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <button
                    className="modal-close"
                    type="button"
                    aria-label="Close"
                    onClick={onClose}
                >
                    ×
                </button>

                {children}
            </div>
        </div>,
        document.body,
    )
}