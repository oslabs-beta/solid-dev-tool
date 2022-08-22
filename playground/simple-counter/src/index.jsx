/* @refresh reload */
import { render } from 'solid-js/web';
import './index.sass';
import App from './App';
import { DevTool } from '../../../solid-dev-tool/src/Root'

render(() => (
    <DevTool>
      <App />
    </DevTool>  
), document.getElementById('root'));
