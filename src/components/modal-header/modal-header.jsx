import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import { getClassName } from "../../utils";

import style from "./modal-header.module.css";

function ModalHeader(props) {
  return (
    <div className={style.header}>
      <h2 className={getClassName(style.title, "text text_type_main-large")}>
        {props.children}
      </h2>
      <div className={style["close-button-wrapper"]}>
        <CloseIcon onClick={props.onClose} type="primary" />
      </div>
    </div>
  );
}

ModalHeader.propsType = {
  children: PropTypes.any,
  onClose: PropTypes.func.isRequired,
};

export default ModalHeader;
