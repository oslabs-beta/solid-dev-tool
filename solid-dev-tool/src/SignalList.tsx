import { Component, createSignal, For, getOwner, Show } from 'solid-js';


//sets type for Owner object
type Owner = NonNullable<ReturnType<typeof getOwner>>;

export default function SignalList(props) {
  // console.log('entering SignalList before content loaded')
  /*
    declare ownerQueue initialized to Owner.owner.owner to get to App/c-1
    declare owners array to store all owners to check for sources to filter for signals. 
    declare walked set to keep track of all elements we've seen so we don't perform checks on the same element twice 
  */
  const ownerQueue: Owner[] = [props.root.owned[0]]; // props.root
  console.log('top level owner is:', props.root);
  const owners = [];
  const tree = {
        name:'root',
        children:[]
      };
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
  // parsing through owners
  const signals = [];
  let [signalList, setSignalList] = createSignal([]);
  console.log('list of owners is:');
  owners.forEach((owner) => console.log(owner))
  while (owners.length) {
    const currentOwner = owners.shift();
    if (currentOwner.sources) {
      for (let i = 0; i < currentOwner.sources.length; i++) {
        // signals do not have owner
        if (!currentOwner.sources[i].owner)
          signals.push(currentOwner.sources[i]);
      }
    }
  }
  setSignalList(signals);
  // console.log('signals', signalList());
  return (
    <div>
      <h1>Signals: </h1>
      <For each={signalList()}>
        {(el) => (
          <div>
            {(() => {
             if (el.value.name !== undefined) {
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
