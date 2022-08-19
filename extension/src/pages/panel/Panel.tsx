import { createSignal, Show } from "solid-js"
import logo from "@assets/img/logo.svg";
import styles from "./Panel.module.css";

//import signalist to render signal in our panel
// import SignalList from './SignalList'



export default function Panel(root) {
 
  // const [clicked, setClicked] = createSignal(false);


  return (

    <div class={styles.App}>
      <button onClick={() => console.log('hello from onclick')}>
        Get Signals
      </button>
      
      {/* <Show when={clicked()}>
        <SignalList root={props.root} />
      </Show> */}
      <header class={styles.header}>
        testing inside panel
        
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
        </a>*/}
      </header>
    </div> 
  );
};


