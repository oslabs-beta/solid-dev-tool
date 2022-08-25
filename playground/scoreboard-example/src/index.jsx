/* @refresh reload */
import { render } from 'solid-js/web';
import { attachDebugger, Debugger } from "@solid-devtools/debugger"
import App from './App';
import { DevTools } from '../../../solid-dev-tool/src/Root'

render(() => (
  <DevTools>
    <App/>
  </DevTools>
), document.getElementById('root'))
