function sendMessage (message) {
  window.postMessage({
    key: '_solid-devtools-send-message',
    message,
  })
}

console.log('HELLO IM IN INDEX-EXEC');

// function installScript(fn) {
//   const source = ';(' + fn.toString() + ')(window)'

//   const script = document.createElement('script') 
//   script.textContent = source
//   document.documentElement.appendChild(script)
//   script.parentNode.removeChild(script)
// }

// The Injected Script
function sendRootToBackground(window) {
  console.log('inside sendRootToBackground')
  setTimeout(() => {
    console.log('inside setTimeout inside sendRootToBackground')
    let root = document.getElementById("root");
    console.log("ROOT is: ", root);

    // window.postMessage({ root: root, rootDetected: true }, '*');
    sendMessage({
      root,
      rootDetected: true
    }, '*')

  }, 100)
}

// Inject the hook
if (document instanceof Document) {
  sendRootToBackground()
}









function detect () {
  setTimeout(() => {
    // Method 1: Check Nuxt.js
    const nuxtDetected = !!(window.__NUXT__ || window.$nuxt)

    if (nuxtDetected) {
      let Vue

      if (window.$nuxt) {
        Vue = window.$nuxt.$root && window.$nuxt.$root.constructor
      }

      sendMessage({
        devtoolsEnabled: (/* Vue 2 */ Vue && Vue.config.devtools) ||
          (/* Vue 3.2.14+ */ window.__VUE_DEVTOOLS_GLOBAL_HOOK__ && window.__VUE_DEVTOOLS_GLOBAL_HOOK__.enabled),
        vueDetected: true,
        nuxtDetected: true,
      }, '*')

      return
    }

    // Method 2: Check  Vue 3
    const vueDetected = !!(window.__VUE__)
    if (vueDetected) {
      sendMessage({
        devtoolsEnabled: /* Vue 3.2.14+ */ window.__VUE_DEVTOOLS_GLOBAL_HOOK__ && window.__VUE_DEVTOOLS_GLOBAL_HOOK__.enabled,
        vueDetected: true,
      }, '*')

      return
    }

    // Method 3: Scan all elements inside document
    const all = document.querySelectorAll('*')
    let el
    for (let i = 0; i < all.length; i++) {
      if (all[i].__vue__) {
        el = all[i]
        break
      }
    }
    if (el) {
      let Vue = Object.getPrototypeOf(el.__vue__).constructor
      while (Vue.super) {
        Vue = Vue.super
      }
      sendMessage({
        devtoolsEnabled: Vue.config.devtools,
        vueDetected: true,
      }, '*')
    }
  }, 100)
}
