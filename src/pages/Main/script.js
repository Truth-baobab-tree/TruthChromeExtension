const infoLink = document.querySelector('.infoContainer .title a');
const infoTitle = infoLink.querySelector('h2');
const infoContent = document.querySelector('.infoContainer .description p');
const urlBox = document.querySelector('.url_box');
const infoBox = document.querySelector('.infoBox');
const truthScore = document.querySelector('.truth');
const lieScore = document.querySelector('.lie');
const downButton = document.querySelector('.infoContainer .topLine button');
const factCheckContainer = document.querySelector('.factCheckContainer');
const factCheckTitle = factCheckContainer.querySelector('p');
const factCheckLink = factCheckContainer.querySelector('.seeMore');

const url1 = 'https://truthserver.khjcode.repl.co/info/get/news/sample';
const url2 = 'https://truthserver.khjcode.repl.co/page/get/score';
const url3 = 'https://truthserver.khjcode.repl.co/info/get/factcheck';


const loadInfoData = async (title) => {
  const res = await fetch(`${url1}/${title}/1`);
  const result = await res.json();

  if (result[0]) {
    infoLink.href = result[0].originallink;
    infoTitle.textContent = result[0].title.substring(0, 20) + '...';
    infoContent.textContent = result[0].description.substring(0, 100) + '...';
  } else {
    infoTitle.textContent = '관련 정보가 없습니다.';
    infoContent.textContent = '';
  }
};

const loadStatusScore = async (url) => {
  const response = await fetch(url2, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      url
    }),
  });

  const result = await response.json();

  truthScore.textContent = result.truth;
  lieScore.textContent = result.lie;
};

const loadFactCheckData = async (title) => {
  const res = await fetch(`${url3}/${title}`);
  const result = await res.json();

  if (result.title) {
    let {
      title,
      link
    } = result;
    title = title.trim();
    link = link.trim();
    factCheckTitle.textContent = `${title}${title[title.length - 1] === '?' ? '' : '?'}`;
    factCheckLink.href = link;
  } else {
    factCheckContainer.style.display = 'none';
  }
};

const onClickDownButton = () => {
  const enable = infoBox.style.display;
  infoBox.style.display = enable === 'none' ? 'block' : 'none';
  downButton.style.transform = enable === 'block' ? 'rotate(0deg)' : 'rotate(180deg)';
};

function init() {
  const user = localStorage.getItem('user');

  const language = localStorage.getItem('language');
  if (!language) localStorage.setItem('language', 'en');

  if (!user) {
    location.href = '../Login/index.html';
  } else {
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, tabs => {
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
      if (title.includes('|')) title = title.substring(0, title.indexOf('|'));
      if (title.includes('?')) title = title.substring(0, title.indexOf('?'));

      loadInfoData(title);
      loadFactCheckData(title);
    });
  }

  downButton.addEventListener('click', onClickDownButton);
  infoBox.style.display = 'none';
}

init();
