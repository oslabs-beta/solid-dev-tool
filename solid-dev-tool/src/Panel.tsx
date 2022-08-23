import { Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
import SignalList from './SignalList'
import Graph from './Graph'
import { SolidBottomsheet } from './SolidDrawer';
import { render } from "solid-js/web";


type Owner = NonNullable<ReturnType<typeof getOwner>>;


/* Equivalent to the panel that shows up?? */
export default function Panel(props) {
  const [isOpen, setOpen] = createSignal(false);

  
  onMount(()=> {
    // this is from Lyam and Hulkaroy's branch
    setOpen(true);
      // working on getting updates
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById('debugger');
    console.log('this is target', targetNode);
    
    // Options for the observer (which mutations to observe)
    const config = { 
      attributes: true, 
      characterData: true,
      childList: true, 
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true 
    };
    
    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      console.log('callback running!');
      // for (const mutation of mutationList) {
      //   if (mutation.type === 'childList') {
      //     console.log('A child node has been added or removed.');
      //   } else if (mutation.type === 'attributes') {
      //     console.log(`The ${mutation.attributeName} attribute was modified.`);
      //   }
      // }
      walker();
      renderPanel(signalList(), graphData());
    };
    
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
    
    // Later, you can stop observing
    //observer.disconnect();
  })
    
  
  
  
  const [clicked, setClicked] = createSignal(false);
  const [initial, setInitial] = createSignal(true);
  
  const [signalList, setSignalList] = createSignal();
  const [graphData, setGraphData] = createSignal();
  

  const walker = () => {
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
    setGraphData(tree);
    


    for (let owner in owners) {
      //console.log(owners[owner]);
    }
    // parsing through owners
    const signals = new Set();

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
    console.log('graph data is', graphData());
    console.log('signalList is', signalList());
  }
  //TODO: Refactor to not have to call here.
  walker();

  function renderPanel(signalList, graphData){
    console.log('this is rerunning to rerender the info');
    const display = document.getElementById('debugger-display');
    display.removeChild(display.lastChild);
    display.removeChild(display.lastChild);

    render(() => <SignalList signalList={signalList}/>, document.getElementById('debugger-Panel'))
    render(() => <Graph graphData={graphData}/>, document.getElementById('graph'));
    
    
  }
  
  return (
    <div id='Panel'>
  
        {/* {isOpen() && (
        <SolidBottomsheet
          variant="snap"
          defaultSnapPoint={({ maxHeight }) => maxHeight / 3}
          snapPoints={({ maxHeight }) => [maxHeight, maxHeight / 4]}
          onClose={
            () => {
              setOpen(!isOpen());
              props.setIsAbClicked(!props.isAbClicked());
            }
          }
        > */}
        {/* <Show when={isOpen()}> */}
          <div id="mainDisplay">
            <div id="signalsDisplay">
            <SignalList signalList={signalList()}/>
            </div>
            <div id="graphsContainer">
              <div id="structGraphDisplay">
              <Graph graphData={graphData()}/>
              </div>
              <div id="depGraphDisplay">
              </div>  
            </div>
          </div>
        {/* </Show> */}
        {/* </SolidBottomsheet> */}
      )}
    </div> 
  );
};
