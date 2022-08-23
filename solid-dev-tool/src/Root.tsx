import { ParentComponent, Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
import  Panel  from './Panel';

// THIS IS THE DEBUGGER COMPONENT
export const DevTool: ParentComponent = props => {
  const [children, root] = createRoot(() => [props.children, getOwner()]);
  

  // Stanley's Note: This renders {Children} which should be the app that you are debugging
  // Why doesn't this render two apps...?
  return (
    <>
      <div id="debugger">
        {children} 
      </div>
      {<Panel  root={root} />}
    </>
  )
}