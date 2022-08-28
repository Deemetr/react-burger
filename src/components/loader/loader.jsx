import style from "./loader.module.css";

export default function Loader() {
  return (
    <div className={style.loader}>
      <div className={style.arc}></div>
      <div className={style.arc}></div>
      <div className={style.arc}></div>
    </div>
  );
}
