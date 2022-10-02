import style from "./modal-overlay.module.css";

function ModalOverlay({ onClose }: { onClose: () => void }) {
  return <div onClick={onClose} className={style["modal-overlay"]}></div>;
}

export default ModalOverlay;
