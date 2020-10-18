const infoLink = document.querySelector('.infoContainer .title a');
const infoTitle = infoLink.querySelector('h2');
const infoContent = document.querySelector('.infoContainer .description p');
const urlBox = document.querySelector('.url_box');
const truthScore = document.querySelector('.truth');
const lieScore = document.querySelector('.lie');

const url1 = 'http://localhost:5050/info/get/news/sample';
const url2 = 'http://localhost:5050/page/get/score';

const loadInfoData = async (title) => {
  const res = await fetch(`${url1}/${title}/1`);
  const result = await res.json();

  infoLink.href = result[0].originallink;
  infoTitle.innerHTML = result[0].title.substring(0, 20) + '...';
  infoContent.innerHTML = result[0].description.substring(0, 100) + '...';
};

const loadStatusScore = async (url) => {
  const response = await fetch(url2, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ url }),
  });

  const result = await response.json();

  truthScore.innerHTML = result.truth;
  falseScore.innerHTML = result.lie;
};

function init() {
  const user = localStorage.getItem('user');

  if (!user) {
    location.href = '../Login/index.html';
  } else {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url;
      urlBox.value = url;

      if (url.charAt(url.length - 1) === '/') {
        url = url.substring(0, url.length - 1);
      }
      
      loadStatusScore(url);
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
