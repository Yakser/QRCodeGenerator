import React from "react";
import styles from "./Menu.module.scss";

const Menu = (props) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.item + " " + styles.active}>
        <span>Generate</span>
      </div>
      <div className={styles.item}>
        <span>Usage</span>
      </div>
      <div className={styles.item}>
        <span>About</span>
      </div>
    </nav>
  );
};

export default Menu;
