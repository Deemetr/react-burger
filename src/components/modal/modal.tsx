import { useEffect } from "react";
import ReactDOM from "react-dom";

import ModalHeader from "../modal-header/modal-header";
import ModalOverlay from "../modal-overlay/modal-overlay";

import style from "./modal.module.css";

function Modal({
  children,
  title,
  onClose,
  modalRootId = "modal-root",
  isOpen,
}: {
  children: any;
  title?: string;
  onClose: () => void;
  modalRootId?: string;
  isOpen: boolean;
}) {
  const createModalRoot = (modalRootId: string) => {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", modalRootId);
    document.body.appendChild(wrapperElement);

    return wrapperElement;
  };

  const modalRoot =
    document.getElementById(modalRootId) ?? createModalRoot(modalRootId);

  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen, onClose]);

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
