import React from "react";
import styles from "./Menu.module.scss";
import { NavLink } from "react-router-dom";

const Menu = (props) => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.item} activeClassName={styles.active} exact>
        <span>Generate</span>
      </NavLink>
      <NavLink to="/usage" className={styles.item} activeClassName={styles.active} exact>
        <span>Usage</span>
      </NavLink>
      {/* <NavLink to="/about" className={styles.item} activeClassName={styles.active}  exact>
        <span>About</span>
      </NavLink> */}
    </nav>
  );
};

export default Menu;
