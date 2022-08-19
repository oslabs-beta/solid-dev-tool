import { ParentComponent, Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
// import  Panel  from './Panel'


// accessing the entry point of the App
export const DevTool: ParentComponent = props => {
  const [children, root] = createRoot(() => [props.children, getOwner()]);
  return (
    <>
      <div id = 'debugger'>
        {children}
        {/* passing root to Panel so that Signal List will have access */}
        
      </div>
        {/* <Panel root = {root} />  */}
    </>

  )
}