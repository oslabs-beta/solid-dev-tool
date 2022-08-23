import { Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
import { render } from "solid-js/web";
import "solid-bottomsheet/styles.css";
import { SolidBottomsheet } from 'solid-bottomsheet';
import SignalList from "./SignalList";

export default function Panel(props) {
  const [isOpen, setOpen] = createSignal(false);

  onMount(() => setOpen(true));

  return (
    <div id='Panel'>
      {isOpen() && (
        <SolidBottomsheet
          variant="snap"
          defaultSnapPoint={({ maxHeight }) => maxHeight / 3}
          snapPoints={({ maxHeight }) => [maxHeight, maxHeight / 4]}
          onClose={
            () => {
              setOpen(!isOpen());
              props.setIsAbClicked(!props.isAbClicked());
            }
          
          }
        >
            <SignalList root={props.root} />
        </SolidBottomsheet>
      )}
    </div> 
  );
};
