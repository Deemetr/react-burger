import React from "react";
import ReactDOM from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalHeader from "../modal-header/modal-header";

import style from "./modal.module.css";

function Modal(props) {
  const { children, title, onClose, modalRootId } = props;

  React.useEffect(() => {
    const closeOnEscape = (e) => (e.key === "Escape" ? onClose() : null);
    document.body.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  const createModalRoot = (modalRootId) => {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", modalRootId);
    document.body.appendChild(wrapperElement);
    
    return wrapperElement;
  };

  const modalRoot =
    document.getElementById(modalRootId) ??
    createModalRoot(modalRootId);

  return ReactDOM.createPortal(
    <>
      <div className={style.modal}>
        <ModalHeader onClose={onClose}>{title}</ModalHeader>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
}

export default Modal;
