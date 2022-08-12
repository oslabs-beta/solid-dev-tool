/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';
import { DevTool } from '../../../extension/src/pages/panel/Root'
import { HopeProvider } from '@hope-ui/solid';

render(() => (
  <HopeProvider>
    <DevTool>
      <App />
    </DevTool>  
  </HopeProvider>
), document.getElementById('root'));
