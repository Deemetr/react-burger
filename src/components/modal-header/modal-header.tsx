import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ReactNode } from "react";

import { getClassName } from "../../utils";

import style from "./modal-header.module.css";

function ModalHeader({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className={style.header}>
      <h2 className={getClassName(style.title, "text text_type_main-large")}>
        {children}
      </h2>
      <div className={style["close-button-wrapper"]}>
        <CloseIcon onClick={onClose} type="primary" />
      </div>
    </div>
  );
}

export default ModalHeader;
