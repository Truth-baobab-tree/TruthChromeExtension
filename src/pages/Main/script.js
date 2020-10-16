const infoTitle = document.querySelector('.info_title');
const infoContent = document.querySelector('.info_content');
const urlBox = document.querySelector('.url_box');

const url = 'http://localhost:5050/info/get/news/sample';

const loadInfoData = async (title) => {
  const res = await fetch(`${url}/${title}/1`);
  const result = await res.json();

  infoTitle.innerHTML = result[0].title;
  infoContent.innerHTML = result[0].description;
};

function init() {
  const user = localStorage.getItem('user');

  if (!user) {
    location.href = '../Login/index.html';
  } else {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      const url = tabs[0].url;
      urlBox.value = url;
    });

    chrome.tabs.executeScript({
      code: 'document.querySelector("head title").textContent'
    }, (res) => {
      let title = String(res);
      const i = title.indexOf("|");
      if (i !== -1) {
        title = title.substring(0, i);
      }
      loadInfoData(title);
    });
  }
}

init();
