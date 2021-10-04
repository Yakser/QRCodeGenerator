import styles from "./Header.module.scss";
import Menu from "./Menu";

const Header = () => {
  return (
    <header>
      <div className={styles.logo}>
        <h2>QRify</h2>
      </div>
      <Menu />
      <button>
        <a href="mailto:sergeyyaksanov@yandex.ru">Contact</a>
      </button>
    </header>
  );
};
export default Header;
