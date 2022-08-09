import { render } from "solid-js/web";
import "./index.css";
import { Panel } from "./Panel";// our logic would go

const appContainer = document.querySelector("#app-container");
if (!appContainer) {
  throw new Error("Can not find AppContainer");
}

render(Panel, appContainer);
