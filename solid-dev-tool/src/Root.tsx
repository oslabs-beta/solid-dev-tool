import { ParentComponent, createRoot, getOwner} from "solid-js"
import { Fab } from "./Fab"
import './styles.sass';

// accessing the top level component of the application
// passing it to the Panel component
export const DevTool: ParentComponent = props => {
  const [children, root] = createRoot(() => [props.children, getOwner()]);
  

  // Stanley's Note: This renders {Children} which should be the app that you are debugging
  // Why doesn't this render two apps...?
  return (
    <>
      <div id="debugger">
        {children}
      </div>
      <Fab alwaysShowTitle={true} icon='solid' root = {root} />
    </>
  )
}