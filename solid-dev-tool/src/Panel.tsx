import { Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
import SignalList from './SignalList'
import { render } from "solid-js/web";
import "solid-bottomsheet/styles.css";
import { SolidBottomsheet } from 'solid-bottomsheet';
import './index.sass';

export default function Panel(props) {
  const [clicked, setClicked] = createSignal(false);
  const [isOpen, setOpen] = createSignal(false);
  // const [isResizing, setResizing] = createSignal(false);
  // const [lastDownX, setLastDownX] = createSignal(0);
  // const [newWidth, setNewWidth] = createSignal({});

  
  return (
    <div id='Panel'>
      <button onClick={() => {
        setOpen(true);
        setClicked(true);
      }}>
        Fetch Signals
      </button>
      
      {isOpen() && (
        <SolidBottomsheet
          variant="snap"
          defaultSnapPoint={({ maxHeight }) => maxHeight / 3}
          snapPoints={({ maxHeight }) => [maxHeight, maxHeight / 4]}
          onClose={() => setOpen(!isOpen)}
          // className="drawer"
        >
          <Show when={clicked()}>
            <SignalList root={props.root} />
          </Show>
        </SolidBottomsheet>
      )}
    </div> 
  );
};
