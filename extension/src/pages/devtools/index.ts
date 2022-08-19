
// try {
  chrome.devtools.panels.create(
    "Solid Dev Tool",
    "icon-34.png",
    "src/pages/panel/index.html",
    function (panel) {
      panel.onShown.addListener(() => {
        chrome.devtools.inspectedWindow.reload({})

        console.log('panel:', panel)
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            console.log('recieved a messag')
            console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
            if (request.greeting === "hello")
              sendResponse({farewell: "goodbye"});
          });
      });

    }
  )
// } catch (e) {
//   console.error(e);
// }


// function createPanel() {
//   chrome.devtools.panels.create(
//     'Solid Dev Tool',
//     'icon-34.png',
//     'src/pages/panel/index.html',
//     function () {}
//   );
// }




