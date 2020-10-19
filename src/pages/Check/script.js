const evalList = document.querySelector('.evalList');

const target = 'http://localhost:5050/page/get/eval';

const loadEvalData = async (url, key) => {
  const data = { url, key };

  const res = await fetch(target, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  drawDOMElement(result);
};

const drawDOMElement = async (data) => {
  const imgSrc = '../../../public/images/';

  data.forEach(item => {
    let { status, reason, name } = item;

    let evalBox = document.createElement('div');
    evalBox.classList.add('evalBox');

    let header = document.createElement('div');
    header.classList.add('header');
    let profileBox = document.createElement('div');
    profileBox.classList.add('profileBox');
    let icon = document.createElement('div');
    icon.classList.add('icon');
    let userImg = document.createElement('img');
    userImg.src = '../../../public/images/user.svg';
    icon.appendChild(userImg);
    let userName = document.createElement('p');
    userName.textContent = name;
    profileBox.appendChild(icon);
    profileBox.appendChild(userName);
    let statusBox = document.createElement('div');
    statusBox.classList.add('statusBox');
    let img = document.createElement('img');
    img.src = status === 'truth' ? imgSrc + 'true.png' : imgSrc + 'false.png';
    statusBox.appendChild(img);
    header.appendChild(profileBox);
    header.appendChild(statusBox);

    let evalContent = document.createElement('div');
    evalContent.classList.add('evalContent');
    let content = document.createElement('p');
    content.textContent = reason;
    evalContent.appendChild(content);

    evalBox.appendChild(header);
    evalBox.appendChild(evalContent);

    evalList.appendChild(evalBox);
  });
};

function init() {
  const key = localStorage.getItem('user');
  if (!key) {
    location.href = '../Login/index.html';
  }

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    if (url.charAt(url.length - 1) === '/') {
      url = url.substring(0, url.length - 1);
    }

    loadEvalData(url, key);
  });
}

init();
