import { Component, createSignal, For, getOwner, Show } from 'solid-js';

//sets type for Owner object
type Owner = NonNullable<ReturnType<typeof getOwner>>;

//TODO: signalList

export default function SignalList(props) {
  /*
    declare ownerQueue initialized to Owner.owner.owner to get to App/c-1
    declare owners array to store all owners to check for sources to filter for signals. 
    declare walked set to keep track of all elements we've seen so we don't perform checks on the same element twice 
  */
  const ownerQueue: Owner[] = [props.root];
  const owners = [];
  const walked = new Set();
  const tree = {};
  
  /*
    grabbing everything in the componenet hierarchy. Finding all owners by looping 
    through owned (owner's children, which themselves can be owners if they have children) 
  */
  /*
    declare a temp treeNode variable to store the current node that we're looking at.
      This temp treeNode is in relation to the currentOwner of the current iteration of teh while loop
      This is so we can push children to the correct owner that should already exist in the tree
      We do this by looping through the tree object to match currentOwner.name to treeNode.name
    parse owner's owned as usual while also adding owned as children of treeNode 
    Current problem:
       Tree is empty on initial passthrough, so our algorithm would return empty if we try to
       settreeNode variable. 
  */
  while (ownerQueue.length) {
    // code has NO clue which owner currentOwner really is
    const currentOwner = ownerQueue.shift();
    let currentTreeNode;
    //console.log('currentOwner.name', currentOwner.name)

    // This is the initial run, we don't need to do a look up. This is our top level node.
  
    if(Object.keys(tree).length === 0) {
      tree.name = currentOwner.name; 
      tree.children = [];// an array of node objects that also have name + children
      currentTreeNode = tree; 
    }
    // Not initial run, need to find the corresponding treeNode to currentOwner

    /*
      A child "node" which essentially is any Node
      {
        Name:
        Children: []
      }
    */
    const childrensQueue = [...tree.children]; 
    // console.log('This is childrens Queue before entering the while loop', childrensQueue);
    while(childrensQueue.length) {
      const currentChild = childrensQueue.shift();
      // console.log({currentChild});
      // we found the treeNode related to currentOwner
      if(currentChild.name === currentOwner.name) {
        currentTreeNode = currentChild; 
        // console.log('we found the currentChild!!!')
        break; 
      }
      // this isnt the treeNode we want, but the treeNode we want might be nested deeper
      currentChild.children.forEach((child) => childrensQueue.push(child)); 
      // console.log('This is childrens Queue after entering the while loop', childrensQueue);
    }



    // console.log('tree.children', tree.children) 
    owners.push(currentOwner);
    walked.add(currentOwner);
    if (currentOwner.owned) {
      for (let i = 0; i < currentOwner.owned.length; i++) {
        ownerQueue.push(currentOwner.owned[i]);
        currentTreeNode.children.push({
          name: currentOwner.owned[i].name,
          children: [] 
        });
      }
    }
  }
  // console.log('tree', tree)
  props.setGraphData(tree);


  for (let owner in owners) {
    //console.log(owners[owner]);
  }
  // parsing through owners
  const signals = new Set();
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
  // console.log('signals', signalList());
  return (
    <div>
      <h1>Signals</h1>
      <For each={signalList()}>
        {(el) => (
          <div>
            {`signal name: ${el.name}` || 'unknown signal name'}{' '}
            {(() => {
              if (el.name !== 's9') return `value: ${el.value}`;
            })()}
          </div>
          // <div>Root component goes here</div>
        )}
      </For>
    </div>
  );
}