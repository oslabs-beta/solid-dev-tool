import logo from "@assets/img/logo.svg";
import styles from "./App.module.css";

const App = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/pages/popup/Popup.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          This is in Content
        </a>
      </header>
    </div>
  );
};

export default App;
