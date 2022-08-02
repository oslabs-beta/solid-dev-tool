import { createSignal, createEffect, getOwner } from 'solid-js';

export default function Counter() {
  const [count, setCount] = createSignal(0);

  function add() {
    setCount(count() + 1);
  }

  function remove() {
    setCount(count() - 1);
  }

  //createEffect(() => console.log('getOwner() createEffect', getOwner(count()).value))
  createEffect(() => console.log('count fn createEffect', createSignal))

  return (
    <div>
      <button onClick={add}>Add</button>
      <button onClick={remove}>Remove</button>
      <p>current count is {count()}</p>
    </div>
  );
}
