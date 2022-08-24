import { Component, createEffect, createRoot, createSignal, getOwner, Show, JSX, onMount, onCleanup } from "solid-js"
import SignalList from './SignalList'
import Graph from './Graph'
import { render } from "solid-js/web";


/* 
  1. being able to make it reactive
    removeChild problem

  2. props.setIsAbClicked(!props.isAbClicked()); BUG
*/


type Owner = NonNullable<ReturnType<typeof getOwner>>;


/* Equivalent to the panel that shows up?? */
export default function Panel(props) {
  const [isPanelOpen, setIsPanelOpen] = createSignal(false);

  onMount(()=> {
    setIsPanelOpen(true);
    // working on getting updates
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById('debugger');
    // console.log('this is target', targetNode);
    
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
      // console.log('callback running!');
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
    // console.log('graph data is', graphData());
    // console.log('signalList is', signalList());
  }
  //TODO: Refactor to not have to call here.
  walker();

  function renderPanel(signalList, graphData){
    const display = document.getElementById('Panel');
    // display.removeChild(display.lastChild);
    // display.removeChild(display.lastChild);

    render(() => <SignalList signalList={signalList}/>, document.getElementById('Panel'))
    render(() => <Graph graphData={graphData}/>, document.getElementById('Panel'));
    
  }

  let [height, setHeight] = createSignal(300);
  const [isDragging, setIsDragging] = createSignal(false);

  let offset: number | undefined;
  const onMouseMove = (e: MouseEvent) => {
    console.log('onMouseMove')
    const h = window.innerHeight - e.clientY;
    if (!offset) offset = height() - h;

    setHeight(h + offset); // updates the height
  };
  const onMouseUp = () => {
    console.log('onMouseUp')
    setIsDragging(false);
  }

  createEffect(() => {
    if (isDragging()) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      offset = undefined;
    }
  });


  
  

  return (
    <footer id='Panel' style={{ "font-size": "clamp(16px, 1.5vw, 18px)" }}>
      <div
        className = "inside panel"
        style={{
          "font-size": "clamp(12px, 1.5vw, 14px)",
          "font-family": "'Victor Mono', monospace",
          "display": "grid",
          "grid-template-rows": "auto minmax(0, 1fr)",
          "grid-template-columns": "1fr",
          "background-color": 'green',
          "color": "white",
          "position": "fixed",
          "bottom": "0px",
          "right": "0px",
          "z-index": 99999,
          "width": "100%",
          "max-height": "90%",
          "box-shadow": "rgba(0, 0, 0, 0.3) 0px 0px 20px",
          "border-top": "1px solid rgb(63, 78, 96)",
          "transform-origin": "center top",
          "transition": "transform 0.2s ease 0s, opacity 0.2s ease 0s",
          "height": `${height()}px`,
          "opacity": props.isAbClicked() ? 1 : 0,
          "pointer-events": props.isAbClicked() ? "all" : "none",
          "transform": `translateY(${props.isAbClicked() ? 0 : 15}px) scale(${props.isAbClicked() ? 1 : 1.02})`,
        }}
        >
          <div
            className = "top-border-panel"
            style={{
              "padding": "0.0rem",
              "background": 'red',
              "display": "flex",
              "border": '3px solid red',
              "justify-content": "flex-start",
              "align-items": "center",
              "font-size": 24,
              "height": 30,
              "line-height": "32px",
            }}
            onMouseDown={[setIsDragging, true]}
          >
          </div>
          
          <SignalList signalList={signalList()}/>
          <Graph graphData={graphData()}/>
        </div>

    </footer> 
  );
};
