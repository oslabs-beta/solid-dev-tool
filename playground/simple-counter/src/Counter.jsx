import { createSignal } from 'solid-js';

export default function Counter() {
  const [count, setCount] = createSignal(0);

  function add() {
    setCount(count() + 1);
  }

  function remove() {
    setCount(count() - 1);
  }

  console.log('The Counter component has rendered')

  return (
    <div class='counterDiv'>
      <div id='buttons'>
        <button onClick={add}>Increment</button>
        <button onClick={remove}>Decrement</button>
      </div>
      <p class='count text'>current count is {count()}</p>
    </div>
  );
}
