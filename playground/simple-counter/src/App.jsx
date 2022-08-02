import { getOwner } from 'solid-js';
import Counter from './Counter';

console.log('getOwner()', getOwner());

function App() {
  console.log('getOwner() inside App', getOwner());
  return (
    <div>
      <h1>Solid Test App</h1>
      <Counter />
    </div>
  );
}

export default App;
