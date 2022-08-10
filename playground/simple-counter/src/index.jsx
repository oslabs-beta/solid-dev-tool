/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';
import { DevTool } from '../../../extension/src/pages/panel/Root'

// import debugger from extension/panel folder

render(() => (
  <DevTool>
    <App />
  </DevTool>  
), document.getElementById('root'));
