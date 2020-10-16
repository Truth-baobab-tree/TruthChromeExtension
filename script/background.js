chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: '../src/pages/Main/index.html' });
});