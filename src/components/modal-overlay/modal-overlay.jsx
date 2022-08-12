import style from "./modal-overlay.module.css";

function ModalOverlay(props) {
  return <div onClick={props.onClose} className={style["modal-overlay"]}></div>;
}

export default ModalOverlay;
