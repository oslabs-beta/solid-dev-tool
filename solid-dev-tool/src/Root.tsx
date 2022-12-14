import { ParentComponent, createRoot, getOwner} from "solid-js"
import { Fab } from "./Fab"
import './styles.sass';

// accessing the top level component of the application
// passing it to the Panel component
export const DevTool: ParentComponent = props => {
  const [children, root] = createRoot(() => [props.children, getOwner()]);
  
  return (
    <>
      <div id="debugger">
        {children}
      </div>
      <Fab alwaysShowTitle={true} icon='solid' root = {root} />
    </>
  )
}