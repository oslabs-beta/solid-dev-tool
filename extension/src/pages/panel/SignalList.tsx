import { Component, createSignal, For, getOwner, Show } from 'solid-js';

//sets type for Owner object
type Owner = NonNullable<ReturnType<typeof getOwner>>;

export default function SignalList(props) {
  // console.log('entering SignalList before content loaded')
  /*
    declare ownerQueue and initialized to root which is the top level of where our debugger component is
    declare owners array to store all owners to check for sources to filter for signals. 
    declare walked set to keep track of all elements we've seen so we don't perform checks on the same element twice 
  */
  const ownerQueue: Owner[] = [props.root]; // props.root
  // console.log('getOwner log', getOwner().owner.owner.owner.owner);
  const owners = [];
  const walked = new Set();
  /*
    grabbing everything in the componenet hierarchy. Finding all owners by looping 
    through owned (owner's children, which themselves can be owners if they have children) 
  */
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
  // for (let owner in owners) console.log(owners[owner]);
  /*
    parsing through owners and finding signals by looking through sources.
    we know it's a signal if source does not have an owner because signals cannot be owned. 
    then eventually set list of all signals to signalList.
    We initially declare signals as a set then set to signalList which is an array.
    This is because there can be references to the same signal in different places in the reactive graph. 
    Declaring it initially as a set will eliminate duplicates.
  */
  const signals = new Set ();
  let [signalList, setSignalList] = createSignal([]);

  while (owners.length) {
    const currentOwner = owners.shift();
    if (currentOwner.sources) {
      for (let i = 0; i < currentOwner.sources.length; i++) {
        // signals do not have owner
        if (!currentOwner.sources[i].owner)
          signals.add(currentOwner.sources[i]);
      }
    }
  }
  setSignalList([...signals]);
  console.log('signals', signalList());
  return (
    <div>
      <h1>Signals: </h1>
      <For each={signalList()}>
        {(el) => (
          <div>
            {(() => {
             if (el.value !== undefined) {
              return `signal name: ${el.value.name}()`;
             } else {
              return `signal name: ${el.name}`;
             }
            })()}

            {(() => {
              if (el.name !== 's9') return ` value: ${el.value}`
            })()}
          </div>
          // <div>Root component goes here</div>
        )}
      </For>
    </div>
  );
}
