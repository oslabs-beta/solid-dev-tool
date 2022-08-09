import { getOwner, onMount } from 'solid-js';
import Counter from './Counter';

//console.log('getOwner()', getOwner());

function App() {

  //invoke after tree has rendered
  onMount(() => {
    //starting in App to traverse the tree
    const owner = getOwner().owner.owner;
    const ownerQueue = [owner];
    const owners = [];
    const walked = new Set();

    // grabbing everything in the componenet hierarchy
    while (ownerQueue.length) {
      const currentOwner = ownerQueue.shift();
      owners.push(currentOwner);
      walked.add(currentOwner);
      if (currentOwner.owned) {
        for (let i = 0; i < currentOwner.owned.length; i++) {
          ownerQueue.push(currentOwner.owned[i]);
        }
      }
    }

    // parsing through owners
    const signalList = [];
    const observers = [];
    const sources = [];

    
    while(owners.length) {
      const currentOwner = owners.shift();
      if(currentOwner.sources) {
        for(let i = 0; i < currentOwner.sources.length; i++) {
          sources.push(currentOwner.sources[i]);
        }
      }

    }
    
  });

  return (
    <div class='outerAppDiv'>
      <h1>Solid Test App</h1>
      <Counter />
    </div>
  );
}

export default App;