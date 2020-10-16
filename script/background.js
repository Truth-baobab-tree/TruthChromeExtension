chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: '../src/pages/Signup/index.html' });
});