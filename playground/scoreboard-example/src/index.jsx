/* @refresh reload */
import { render } from 'solid-js/web';
import { attachDebugger, Debugger } from "@solid-devtools/debugger"
import App from './App';

render(() => {
  return <App />
}, document.getElementById('root'))
