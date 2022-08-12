import { Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
import { Button } from "@hope-ui/solid";
import SignalList from './SignalList'
import { render } from "solid-js/web";


export default function Panel(props) {
  const [clicked, setClicked] = createSignal(false);
  const [initial, setInitial] = createSignal(true);
  
  return (
    <div id='Panel'>
      <Button 
        class="signalsButton" 
        onClick={() => { 
          if (initial()) {
            render(<SignalList root={props.root} />, document.getElementById('Panel'))
            setInitial(false);
          }
          if (clicked()) {
            const panel = document.getElementById('Panel');
            panel.removeChild(panel.lastChild);
            
            render(<SignalList root={props.root} />, document.getElementById('Panel'))
          }
          setClicked(true);
        }}
        colorScheme="success"
        >
        Fetch Signals
      </Button>
      
      {/* <Show when={clicked()}> */}
        {/* <SignalList root={props.root} /> */}
      {/* </Show> */}
    </div> 
  );
};
