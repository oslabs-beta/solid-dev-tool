import { Owner, Component, createSignal, JSX} from "solid-js"
import SignalList from "./SignalList"
import { render } from "solid-js/web";

import './styles.sass';

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

// location of main button
const defaultStyles: JSX.CSSProperties =  { bottom: 500, right: 500 };

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
/**
 * 
 * @param event - event that will happen
 * @param style - location of main button on screen, could be updated here for location
 * @param alwaysShowTitle - whether or not to show main button 
 */
const Fab: Component<FabProps> = ({
  event = "hover",
  style = defaultStyles,
  alwaysShowTitle = false,
  icon,
  mainButtonStyles,
  root
}) => {

  //creating a signal to keep track of button opening
  const [isOpen, setIsOpen] = createSignal(false);

  // defining functions that impact the status of isOpen
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // functions that have a conditional to check if entered, leave, toggle
  const enter = () => event === "hover" && open();
  const leave = () => event === "hover" && close();
  const toggle = () => (event === "click" ? (isOpen() ? close() : open()) : null);


  // what happens after you click an action
  const actionOnClick = userFunc => {
    console.log('props in actionOnClick in Fab.tsx file:', root)
    
    setIsOpen(false);
    setTimeout(() => {
      userFunc();
    }, 1);
  };


  const ariaHidden = alwaysShowTitle || !isOpen();

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
          {icon}
        </MB>
        <ul>
          <li className={`stf--ab__c ${"top" in style ? "top" : ''}`}>
            <button
              type = "button"
              text = "Debugger"
              data-testid =  "action-button-0"
              aria-label = "Debugger"
              aria-hidden = {ariaHidden}
              class="stf--ab"
              onClick = {() => actionOnClick(() => console.log('line 106 of Fab.tsx'))}>
              Tool
            </button>
            <span className={`${"right" in style ? "right" : ""} ${
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

export { Fab };