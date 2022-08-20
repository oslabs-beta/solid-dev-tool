/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';
import { DevTool } from '../../../solid-dev-tool/src/Root'

render(() => (
    <DevTool>
      <App />
    </DevTool>  
), document.getElementById('root'));
