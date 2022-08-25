import { Component, createSignal, For, getOwner, Show } from 'solid-js';
import Graph from './Graph'
import { render } from "solid-js/web";

/*
  Helper function that renders a button for a signal that when clicked 
  on shows the dependency graph of that signal.
*/
function createSignalGraphButton(signal) {
  const observers = [];
  signal.observers.forEach((obs) => observers.push({ name: obs.name, children: [] }));
  let signalName;
  if(!signal.name) signalName = 'Undefined name';
  else if(signal.name === 's9') signalName = `${signal.name}`
  else signalName = signal.name;
  const graphData = {
    name: signalName,
    children: observers
  };

  return (
    <button class="signalButton" onClick={() => {
      const display = document.getElementById('depGraphDisplay');
      if(display.lastChild.id !== 'depGraphHead') display.removeChild(display.lastChild)
      render(() => <Graph graphData={graphData}/>, document.getElementById('depGraphDisplay'));
    }}>
      {signalName}
    </button>
  );
}

export default function SignalList(props) {
  return (
    <div>
      <h1>Signals</h1>
      <For each={props.signalList}>
        {(el) => (
          <div class='signal'>
            {'signal name:' || 'unknown signal name'}
            {createSignalGraphButton(el)}
            {(() => {if (el.name !== 's9') return `\n   value: ${el.value}`})()}
          </div>
        )}
      </For>
    </div>
  );
}