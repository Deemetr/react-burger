import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay(props) {
  return <div onClick={props.onClose} className={style["modal-overlay"]}></div>;
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};

export default ModalOverlay;
