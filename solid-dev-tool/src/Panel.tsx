import { Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
import SignalList from './SignalList'
import Graph from './Graph'
import { render } from "solid-js/web";

/* Equivalent to the panel that shows up?? */
export default function Panel(props) {
  const [clicked, setClicked] = createSignal(false);
  const [initial, setInitial] = createSignal(true);
  return (
    <div id='Panel'>
      <button 
        id="signalsButton" 
        onClick={() => { 
          if (initial()) {
            // render(<SignalList root={props.root} />, document.getElementById('Panel'))
            render(() => <Graph/>, document.getElementById('Panel'));
            setInitial(false);
          }
          if (clicked()) {
            const panel = document.getElementById('Panel');
            panel.removeChild(panel.lastChild);
            // panel.removeChild(panel.lastChild);
            // render(() => {
            //   <div>
            //     <SignalList root={props.root} /> 
            //     <Graph />
            //   </div>
            // }, document.getElementById('Panel'))
            // render(() => <SignalList root={props.root} />, document.getElementById('Panel'))
            render(() => <Graph/>, document.getElementById('Panel'));
          }
          setClicked(true);
        }}
        >
        Fetch Signals
      </button>
      
      {/* <Show when={clicked()}> */}
        {/* <SignalList root={props.root} /> */}
      {/* </Show> */}
    </div> 
  );
};
