import { Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
// import logo from "@assets/img/logo.svg";
import styles from "./Panel.module.css";

//import signalist to render signal in our panel
import SignalList from './SignalList'


export default function Panel(props) {
  const [clicked, setClicked] = createSignal(false);
  
  return (

    <div class={styles.App}>
      <button onClick={() => setClicked(!clicked())}>
        Get Signals
      </button>
      
      <Show when={clicked()}>
        <SignalList root={props.root} />
      </Show>
      {/* <header class={styles.header}> */}
        {/* <img src={logo} class={styles.logo} alt="logo" /> */}
        {/* <p>
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
      </header> */}
    </div> 
  );
};
