import { createSignal, createEffect, getOwner } from 'solid-js';

export default function Counter() {
  const [count, setCount] = createSignal(0);
  //console.log(getOwner())

  function add() {
    setCount(count() + 1);
  }

  function remove() {
    setCount(count() - 1);
  }

  //createEffect(() => console.log('getOwner() createEffect', getOwner()),
  //createEffect(() => console.log('count fn createEffect', createSignal))

  return (
    <div class='counterDiv'>
      <button class='addButton' onClick={add}>Add</button>
      <button class='removeButton' onClick={remove}>Remove</button>
      <p class='count text'>current count is {count()}</p>
    </div>
  );
}
