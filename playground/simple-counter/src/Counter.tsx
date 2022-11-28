import { createSignal } from 'solid-js';
import React, { FC } from 'react'; 

export const Counter: FC = () => {
  const [count, setCount] = createSignal(0);

  function add(): void {
    setCount(count() + 1);
  }

  function remove(): void {
    setCount(count() - 1);
  }

  console.log('The Counter component has rendered')

  return (
    <div className='counterDiv'>
      <div id='buttons'>
        <button onClick={add}>Increment</button>
        <button onClick={remove}>Decrement</button>
      </div>
      <p className='count text'>current count is {count()}</p>
    </div>
  );
}
