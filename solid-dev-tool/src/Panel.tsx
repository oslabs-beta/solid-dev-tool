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

  /*
    TODO: 
      1. DOCUMENTATION
      2. Improve mutation observing to be more reactive
  */
  onMount(()=> {
    const targetNode = document.getElementById('debugger');
    const config = { 
      attributes: true, 
      characterData: true,
      childList: true, 
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true 
    };
    const callback = (mutationList, observer) => {
      if(props.isAbClicked()) {
        walker();
        rerenderPanel(signalList(), graphData());
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  });
    
  
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
      const currentOwner = ownerQueue.shift();
      let currentTreeNode;
  
      if(Object.keys(tree).length === 0) {
        tree.name = currentOwner.name; 
        tree.children = [];
        currentTreeNode = tree; 
      }
    
      const childrensQueue = [...tree.children]; 
      while(childrensQueue.length) {
        const currentChild = childrensQueue.shift();
        if(currentChild.name === currentOwner.name) {
          currentTreeNode = currentChild; 
          break; 
        }
        currentChild.children.forEach((child) => childrensQueue.push(child)); 
      }

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
    setGraphData(tree);
    
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
    setSignalList([...signals]);;
  }
  walker();

  function rerenderPanel(signalList, graphData){
    const signalsDisplay = document.getElementById('signalsDisplay');
    const structGraphDisplay = document.getElementById('structGraphDisplay')
    signalsDisplay.removeChild(signalsDisplay.lastChild);
    structGraphDisplay.removeChild(structGraphDisplay.lastChild);
    render(() => <SignalList signalList={signalList}/>, document.getElementById('signalsDisplay'))
    render(() => <Graph graphData={graphData}/>, document.getElementById('structGraphDisplay'));
  }

  let [height, setHeight] = createSignal(300);
  const [isDragging, setIsDragging] = createSignal(false);

  let offset: number | undefined;
  const onMouseMove = (e: MouseEvent) => {
    const h = window.innerHeight - e.clientY;
    if (!offset) offset = height() - h;

    // TODO: QoL feature to close panel by dragging all the way down
    // if (h <= 10) { // if the height of the panel is <= 1
    //   setIsPanelOpen(false)
    //   props.setIsAbClicked(!props.isAbClicked());
    // }

    setHeight(h + offset); // updates the height
  };

  const onMouseUp = () => setIsDragging(false);
  

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
        className = "Inside Panel"
        style={{
          "font-size": "clamp(12px, 1.5vw, 14px)",
          "font-family": "'Victor Mono', monospace",
          "display": "grid",
          "grid-template-rows": "auto minmax(0, 1fr)",
          "grid-template-columns": "1fr",
          // "background-color": 'green',
          "color": "white",
          "position": "fixed",
          "bottom": "0px",
          "right": "0px",
          "z-index": 99999,
          "width": "100%",
          "height": `${height()}px`,
          "max-height": "90%",
          "box-shadow": "rgba(0, 0, 0, 0.3) 0px 0px 20px",
          "border-top": "1px solid rgb(63, 78, 96)",
          "transform-origin": "center top",
          "transition": "transform 0.2s ease 0s, opacity 0.2s ease 0s",
          "opacity": props.isAbClicked() ? 1 : 0,
          "pointer-events": props.isAbClicked() ? "all" : "none",
          "transform": `translateY(${props.isAbClicked() ? 0 : 15}px) scale(${props.isAbClicked() ? 1 : 1.02})`,
        }}
        >
          <div
            className = "Top Panel"
            style={{
              "padding": "0.0rem",
              "background": '#40b8b3',
              "display": "flex",
              "border": '3px solid #40b8b3',
              "justify-content": "flex-start",
              "align-items": "center",
              "font-size": 24,
              "height": 30,
              "line-height": "32px",
            }}
            onMouseDown={[setIsDragging, true]}
          >
          </div>
          
          <div id="mainDisplay">
        <div id="signalsDisplay">
          <SignalList signalList={signalList()}/>
        </div>
        <div id="graphsContainer">
          <div class="graphDisplay" id="structGraphDisplay">
            <h1>Structural Graph</h1>
            <Graph class="graph" graphData={graphData()}/>
          </div>
          <div class="graphDisplay" id="depGraphDisplay">
            <h1 id='depGraphHead'>Dependency Graph</h1>
          </div> 
        </div>
      </div>
        </div>
    </footer> 
  );
};
