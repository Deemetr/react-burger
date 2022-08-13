import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalHeader from "../modal-header/modal-header";

import style from "./modal.module.css";

function Modal(props) {
  const { children, title, onClose, modalRootId } = props;

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

Modal.propsType = {
  children: PropTypes.any,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  modalRootId: PropTypes.string.isRequired
}

export default Modal;
