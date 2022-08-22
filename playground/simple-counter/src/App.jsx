import { createRoot, getOwner, onMount } from 'solid-js';
import Counter from './Counter';

//ALL THE PROPS STUFF SHOULD BE HAPPENING ONE EVEL UP AT DEBUGGER COMPONENT
function App(props) {

  return (
    <div class='outerAppDiv'>
      <h1>Solid Test App</h1>
      <Counter />
    </div>
  );
}

export default App;