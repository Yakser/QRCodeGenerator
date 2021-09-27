import styles from "./Header.module.scss";
import Menu from "./Menu";

const Header = (props) => {
  return (
    <header>
      <div className={styles.logo}>
        <h2>QRify</h2>
      </div>
      <Menu />
      <button>Contact</button>
    </header>
  );
};
export default Header;
