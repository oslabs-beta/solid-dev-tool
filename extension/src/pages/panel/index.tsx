import { render } from "solid-js/web";
import  { createRoot, getOwner }  from "solid-js";
import "./index.css";
import  Panel  from "./Panel";

const appContainer = document.querySelector("#app-container");
if (!appContainer) {
  throw new Error("Can not find AppContainer");
}


render(() => <Panel/>, appContainer);






