import { Counter } from './Counter';
import React, { FC } from 'react'; 

export const App: FC = () => {
  
  return (
    <div className='outerAppDiv'>
      <h1>Solid Test App</h1>
      <Counter />
    </div>
  );
}

