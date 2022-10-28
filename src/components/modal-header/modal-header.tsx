import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalData } from "../../models/components";

import { getClassName } from "../../utils";

import style from "./modal-header.module.css";

function ModalHeader({
  children,
  onClose,
}: Pick<ModalData, "children" | "onClose">) {
  return (
    <div className={style.header}>
      <h2 className={getClassName(style.title, "text text_type_main-large")}>
        {children}
      </h2>
      <div className={style["close-button-wrapper"]} onClick={onClose}>
        <CloseIcon type="primary" />
      </div>
    </div>
  );
}

export default ModalHeader;
