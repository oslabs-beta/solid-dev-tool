console.log("content loaded");


/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
// import("./components/Demo");


window.addEventListener('message', (event) => {
  if (event.source === window && event.data.rootDetected) {
    chrome.runtime.sendMessage(event.data)
  }
})


// Injection Initialization
if (document instanceof Document) {
  installScript(sendRootToBackground)
}

// Injection Script
  // *deleted the conditional for Firefox check
function installScript (fn) {
  const source = ';(' + fn.toString() + ')(window)'

  const script = document.createElement('script') 
  script.textContent = source
  document.documentElement.appendChild(script)
  script.parentNode.removeChild(script)
}

// The Injected Script
function sendRootToBackground(window) {
  console.log('inside sendRootToBackground')
  setTimeout(() => {
    console.log('inside setTimeout inside sendRootToBackground')
    let root = document.getElementById("root");
    console.log("ROOT is: ", root);

    window.postMessage({ root: root, rootDetected: true }, '*');

  }, 100)

}
