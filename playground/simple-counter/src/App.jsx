import { getOwner, onMount } from 'solid-js';
import Counter from './Counter';

//console.log('getOwner()', getOwner());

function App() {
  //console.log('getOwner() inside App', getOwner());
  //console.log('log owner', getOwner().owned);
  // const ownerObj = getOwner()
  // console.log('ownerObj', ownerObj)
  // for(let item in ownerObj){
  //   if ( item === 'sources' ) {
  //     const sources = ownerObj[item];
  //     console.log('sources', sources)
  //     for (let i = 0; i < sources.length; i++){
  //       console.log(`sources at index ${i}`, sources[i])
  //     }
  //   }
  //   if ( item === 'owner' ) {
  //     const owner = [ownerObj[item]];
  //     console.log('owner', owner)
  //     for (let i = 0; i < owner.length; i++){
  //       console.log(`owner at index ${i}`, owner[i])
  //     }
  //   }
  //   if ( item === 'observers' ) {
  //     const observers = ownerObj[item];
  //     console.log('observers', JSON.parse(JSON.stringify(observers)))
  //     for (let i = 0; i < Object.keys(observers).length; i++){
  //       console.log(`observer at index ${i}`, observers[i])
  //     }
  //   }
  // }

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
      // if(!walked.has(currentOwner)) {
      //   walked.add(currentOwner);     
      //   if(currentOwner.owner === undefined) signalList.push(currentOwner);
      //   if(curenntOwner.owned) owners.push(...currentOwner.owned); 
      //   if(currentOwner.observers) owners.push(...curentOwner.observers);
      //   if(currentOwner.sources) owners.push(...currentOwner.sources);
      // }
    }
    console.log('sources', sources);
  });

  return (
    <div class='outerAppDiv'>
      <h1>Solid Test App</h1>
      <Counter />
    </div>
  );
}

export default App;
