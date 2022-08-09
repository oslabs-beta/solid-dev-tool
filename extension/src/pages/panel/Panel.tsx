import { Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
// import logo from "@assets/img/logo.svg";
import styles from "./Panel.module.css";
//import signalist

// grabbing root
export function DevTool(props) {
  const [children, root] = createRoot(() => [props.children, getOwner()]);
  console.log(children());
  console.log({root});
  console.log('-----------');
}



export function Panel() {
  
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        {/* <img src={logo} class={styles.logo} alt="logo" /> */}
        <p>
          Edit <code>src/pages/panel/Panel.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Testing solid
        </a>
      </header>
      <SignalList root = {root}>

      </SignalList>
    </div>
  );
};
