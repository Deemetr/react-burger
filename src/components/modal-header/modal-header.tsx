import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { getClassName } from "../../utils";

import style from "./modal-header.module.css";

function ModalHeader({
  children,
  onClose,
}: {
  children: any;
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
