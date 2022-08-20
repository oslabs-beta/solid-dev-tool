/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';
import { DevTool } from '../../../extension/src/pages/panel/Root'

render(() => (
    <DevTool>
      <App />
    </DevTool>  
), document.getElementById('root'));
