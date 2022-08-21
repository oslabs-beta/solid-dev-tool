import { Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
import { render } from "solid-js/web";
import { Fab } from "./Fab"





export default function Panel(props) {
  // const [clicked, setClicked] = createSignal(false);
  // const [initial, setInitial] = createSignal(true);

  
  return (
    <div id='button'>
       <Fab alwaysShowTitle={true} icon='solid' root = {props.root} />
        {/* id="signalsButton" 
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
        }} */}
    </div> 
  );
};
