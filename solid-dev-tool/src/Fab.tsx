import { Owner, Component, createSignal, JSX, Show, onMount} from "solid-js";
import logo from "./img/logo.svg";
// import debugger from "./img/debugger.png";
import  Panel  from "./Panel";

// types defined for main button props
interface MBProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'tabIndex'> {
  tabIndex?: number;
}

// main button defined
export const MB: Component<MBProps> = p => (
  <button type="button" className="stf--mb" {...p}>
    {p.children}
  </button>
);

//types defined for action button
interface ABProps extends JSX.HTMLAttributes<HTMLButtonElement>{
  text?: string;
}

// Action button defined
export const AB: Component<ABProps> = ({ children, ...p }) => (
  <button type="button" className="stf--ab" {...p}>
    {children}
  </button>
);

// location of main button
let defaultStyles: JSX.CSSProperties = { left: 1 +'px', bottom: 400 +'px' };


//types floating action button added any to those that directly translate to Solid
interface FabProps {
  event?: 'hover' | 'click';
  style?: JSX.CSSProperties;
  alwaysShowTitle?: boolean;
  icon?: any;
  mainButtonStyles?: JSX.CSSProperties;
  onClick?: (e: any) => void;
  text?: string;
  children?: any;
  root?: Owner;
}

// Defining the Floating Action Button
const Fab: Component<FabProps> = ({
  event = "hover",
  style = defaultStyles,
  alwaysShowTitle = false,
  icon,
  mainButtonStyles,
  root
}) => {

  //creating a signal to keep track of main button and action button
  const [isOpen, setIsOpen] = createSignal(false);
  const [isAbClicked, setIsAbClicked] = createSignal(false);

  // defining functions that impact the status of isOpen
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // functions that have a conditional to check if entered, leave, toggle
  const enter = () => event === "hover" && open();
  const leave = () => event === "hover" && close();
  const toggle = () => (event === "click" ? (isOpen() ? close() : open()) : null);

  const ariaHidden = alwaysShowTitle || !isOpen();

  //function when action button is clicked
  const actionOnClick = () => {
    setIsAbClicked(!isAbClicked());
    setIsOpen(false);
  };

  // Building Button
  const FabConfig: Component = () => {

    return (
      <ul 
      onMouseEnter={enter}
      onMouseLeave={leave}
      className={`stf ${isOpen() ? "open" : "closed"}`}
      data-testid="fab"
      style = {style}
      >
      <li className="stf--mb__c">
        <MB
          onClick={toggle}
          style={mainButtonStyles}
          data-testid="main-button"
          role="button"
          aria-label="Floating menu"
          tabIndex= {0}
        >
           <img src={logo} alt="logo" />
        </MB>
        <ul>
          <li className={`stf--ab__c ${"top" in style ? "top" : ''}`}>
            <AB
              text = "Debugger"
              data-testid =  "action-button-0"
              aria-label = "Debugger"
              aria-hidden = {ariaHidden}
              onClick = {actionOnClick}>
                <img id='debug-img' src={"https://cdn-icons-png.flaticon.com/512/2621/2621056.png"}alt="tool" />
            </AB>
            <span 
              className={`${"right" in style ? "right" : ""} ${
              alwaysShowTitle ? "always-show" : ""}`}
              aria-hidden={ariaHidden}>
                Debugger
            </span>
          </li>
        </ul>
      </li>
    </ul> 
    );
  };

  

  return (
    <div >
      <FabConfig/>
      <Show when={isAbClicked()}>
          <Panel root={root} setIsAbClicked={setIsAbClicked}  isAbClicked={isAbClicked}/>
      </Show>
    </div>   
  );
};

export { Fab };
