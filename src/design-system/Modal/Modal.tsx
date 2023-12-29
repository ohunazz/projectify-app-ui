import React from "react";
import "./Modal.css";

interface ModalProps {
    show: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    return (
        <>
            {show ? (
                <div className="modal-overlay">
                    <div className="modal">{children}</div>
                </div>
            ) : null}
        </>
    );
};

export { Modal };
