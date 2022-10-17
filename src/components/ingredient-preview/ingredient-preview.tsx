import { getClassName } from "../../utils";
import styles from "./ingredient-preview.module.css";

export default function IngredientPreview({ imgSrc }: { imgSrc: string }) {
  return (
    <div
      className={getClassName(styles["ingredient"], styles["gradient-border"])}
    >
      <img src={imgSrc} alt="" />
    </div>
  );
}
