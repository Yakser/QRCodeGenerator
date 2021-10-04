import React from "react";
import styles from "./Menu.module.scss";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.item} activeClassName={styles.active} exact>
        <span>Generate</span>
      </NavLink>
      <NavLink to="/usage" className={styles.item} activeClassName={styles.active} exact>
        <span>Usage</span>
      </NavLink>
    </nav>
  );
};

export default Menu;
