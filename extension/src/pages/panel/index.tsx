import { render } from "solid-js/web";
import "./index.css";
import  Panel  from "./Panel";

const appContainer = document.querySelector("#app-container");
if (!appContainer) {
  throw new Error("Can not find AppContainer");
}





render(() => <Panel />, appContainer);

// function handleError(error) {
//   if (error.isError) {
//     console.log(`Devtools error: ${error.code}`);
//   } else {
//     console.log(`JavaScript error: ${error.value}`);
//   }
// }

// function handleResult(result) { 
//   if (result[1]) {
//     handleError(result[1]);
//   }
// }

// const inspectString = "inspect(document.querySelector('#root'))";
// document.querySelector("#signalsButton").addEventListener("click", () => {
//   chrome.devtools.inspectedWindow.eval(inspectString).then(handleResult)
// });