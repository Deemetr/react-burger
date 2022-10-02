import { ModalData } from "../../models/components";
import style from "./modal-overlay.module.css";

function ModalOverlay({ onClose }: Pick<ModalData, "onClose">) {
  return <div onClick={onClose} className={style["modal-overlay"]}></div>;
}

export default ModalOverlay;
