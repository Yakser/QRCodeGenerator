import styles from "./Header.module.scss";
import Menu from "./Menu";

const Header = (props) => {
  return (
    <header>
      <div className={styles.logo}>
        <h2>QR's here</h2>
      </div>
      <Menu />
      <button>Contact</button>
    </header>
  );
};
export default Header;
