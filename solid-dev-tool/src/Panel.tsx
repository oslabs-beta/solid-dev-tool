import { Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
import { SolidBottomsheet } from './SolidDrawer';
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
          onClose={() => setOpen(!isOpen())}
        >
            <SignalList root={props.root} />
        </SolidBottomsheet>
      )}
    </div> 
  );
};
