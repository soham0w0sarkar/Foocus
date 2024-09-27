chrome.tabs.onCreated.addListener(function (tab) {
  if (tab.status == "loading" && tab.pendingUrl == "chrome://newtab/") {
    console.log("New tab opened");
  }
});
