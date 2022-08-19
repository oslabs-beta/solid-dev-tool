console.log("content loaded");


/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */

// getting root from the web page
// let root = document.getElementById("root");
// console.log('I AM ROOT in Content Script', root);


window.addEventListener('load', (event) => {
  console.log('content loaded, Event listener');
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log('entering send message');
    // console.log(response.farewell);
    if(response) {console.log(response.farewell)}
  });
})