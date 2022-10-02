import { Link } from "react-router-dom";

import styles from './not-found.page.module.css';

import { getClassName } from "../../utils";

export default function NotFoundPage() {
  return (
    <div className={styles['not-found-page']}>
      <span className={getClassName(styles.message, "text text_type_main-default")}>404</span>
      <Link className="link" to="/"><span className="text text_type_main-default">На главную</span></Link>
    </div>
  );
}
