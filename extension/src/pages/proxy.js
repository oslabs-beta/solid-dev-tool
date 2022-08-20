// This is a content-script that is injected only when the devtools are
// activated. Because it is not injected using eval, it has full privilege
// to the chrome runtime API. It serves as a proxy between the injected
// backend and the Vue devtools panel.

const port = chrome.runtime.connect({
  name: 'content-script',
})

console.log('INSIDE PROXY.JS LINE 10')

port.onMessage.addListener(sendMessageToBackend)
console.log('INSIDE addListener(sendMessageToBackend)');

window.addEventListener('message', sendMessageToDevtools)
port.onDisconnect.addListener(handleDisconnect)

sendMessageToBackend('init')

function sendMessageToBackend (payload) {
  window.postMessage({
    source: 'solid-devtools-proxy',
    payload: payload,
  }, '*')
}

function sendMessageToDevtools (e) {
  console.log('INSIDE sendMessageToDevtools');
  
  if (e.data && e.data.source === 'solid-devtools-backend') {
    port.postMessage(e.data.payload)
  } else if (e.data && e.data.source === 'solid-devtools-backend-injection') {
    if (e.data.payload === 'listening') {
      sendMessageToBackend('init')
    }
  }
}

function handleDisconnect () {
  console.log('INSIDE handleDisconnect');

  window.removeEventListener('message', sendMessageToDevtools)
  sendMessageToBackend('shutdown')
}
