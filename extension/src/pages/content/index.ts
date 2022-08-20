console.log("content loaded");

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
// import("./components/Demo");


window.addEventListener('message', (event) => {
  if (event.data.key === '_solid-devtools-send-message' /* event.source === window && event.data.rootDetected */) {
    console.log('inside rootDetected conditional');
    // console.log(event)
    console.log('--------------------');
    console.log('event.data: ', event.data)
    console.log('event.data.message: ', event.data.message)
    console.log('event.data.message.rootDetected: ', event.data.message.rootDetected)
    console.log('--------------------');
    chrome.runtime.sendMessage(event.data.message)
  }
}, false)

const script = document.createElement('script')
script.src = chrome.runtime.getURL('./index-exec.js')
script.onload = () => {
  script.remove()
}
;(document.head || document.documentElement).appendChild(script)

































// Injection Initialization
// if (document instanceof Document) {
//   installScript(sendRootToBackground)
// }

// Injection Script
  // *deleted the conditional for Firefox check

// function installScript(fn) {
//   const source = ';(' + fn.toString() + ')(window)'

//   const script = document.createElement('script') 
//   script.textContent = source
//   document.documentElement.appendChild(script)
//   script.parentNode.removeChild(script)
// }

// // The Injected Script
// function sendRootToBackground(window) {
//   console.log('inside sendRootToBackground')
//   setTimeout(() => {
//     console.log('inside setTimeout inside sendRootToBackground')
//     let root = document.getElementById("root");
//     console.log("ROOT is: ", root);

//     window.postMessage({ root: root, rootDetected: true }, '*');

//   }, 100)

// }

