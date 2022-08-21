import { ParentComponent, createRoot, getOwner} from "solid-js"
import  Panel  from './Panel';

// accessing the top level component of the application
// passing it to the Panel component
export const DevTool: ParentComponent = props => {
  const [children, root] = createRoot(() => [props.children, getOwner()]);
  return (
    <div>
      {children}
        {<Panel root = {root} />}
    </div>
  )
}