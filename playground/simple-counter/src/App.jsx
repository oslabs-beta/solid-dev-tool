import { createEffect, createRoot, getOwner, onMount } from 'solid-js';
import Counter from './Counter';
import SignalList from './SignalList'



//console.log('getOwner()', getOwner());
//ALL THE PROPS STUFF SHOULD BE HAPPENING ONE EVEL UP AT DEBUGGER COMPONENT
function App(props) {
  const [children, root] = createRoot(() => [props.children, getOwner()]);
  console.log('root', root)
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
  

  return (
    <div class='outerAppDiv'>
      <h1>Solid Test App</h1>
      <Counter />
      <SignalList root={root} />
    </div>
  );
}

export default App;
