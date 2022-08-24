import { Component, createSignal, For, getOwner, Show } from 'solid-js';
import Graph from './Graph'
import { render } from "solid-js/web";
//TODO: signalList

function createSignalGraphButton(signal) {
  /*
    loops through the signals observers and forEach add a treeNode 
    that becomes the children of our signal treeNode
  */
  const observers = []
  
  signal.observers.forEach((obs) => {
    console.log('observer is', obs);
    console.log('obs.name', obs.name);
    console.log('this is typeof obs.name', typeof obs.name)
    observers.push({ name: obs.name, children: [] });
  })
  
  /*
    creating our dependency graph. Name is signalName, children is array of observers
  */
  const graphData = {
    name: `signal name: ${signal.name}` || 'unknown signal name',
    children: observers
  }
  console.log({graphData});

  /*
    returns a button that when click shows the graph 
    TODO: Need a separate view in our main panel to show dependency graphs
          when you click a signal it overwrites whatever dependency graph that
          was already rendered in that view.
  */
  return (
    <button onClick={() => {
      render(() => <Graph graphData={graphData}/>, document.getElementById('Panel'));
    }} >
      show dependencies
    </button>
  );
}


export default function SignalList(props) {
  console.log('signalList passed down from Panel', props.signalList);
  return (
    <div>
      <h1>Signals</h1>
      <For each={props.signalList}>
        {(el) => (
          <div>
            {`signal name: ${el.name}` || 'unknown signal name'}{' '}
            {(() => {
              if (el.name !== 's9') return `value: ${el.value}`;
            })()}
            {createSignalGraphButton(el)}
          </div>
        )}
      </For>
    </div>
  );
}