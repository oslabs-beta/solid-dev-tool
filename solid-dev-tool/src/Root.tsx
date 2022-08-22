import { ParentComponent, Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
import  Panel  from './Panel';

// THIS IS THE DEBUGGER COMPONENT
export const DevTool: ParentComponent = props => {
  const [children, root] = createRoot(() => [props.children, getOwner()]); 

  return (
    <div>
      {children}
        {<Panel root = {root} />}
    </div>
  )
}