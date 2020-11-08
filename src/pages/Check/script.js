const evalList = document.querySelector('.evalList');
const select = document.querySelector('select');

const target = 'https://truthserver.khjcode.repl.co/page/get/eval';

const rankSystem = [
  { admin: '44, 62, 80' },
  { diamond: '197, 223, 241' },
  { platinum: '203, 235, 227' },
  { gold: '164, 147, 104' },
  { silver: '186, 181, 178' },
  { bronze: '170, 125, 98' },
];

const loadEvalData = async (url, key, option) => {
  const data = { url, key };
  const res = await fetch(`${target}/${option}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  drawDOMElement(result);
};

const drawDOMElement = async data => {
  const imgSrc = '../../../public/images/';
  data.forEach(item => {
    let { status, reason, name, rank, createdAt } = item;

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

    let footer = document.createElement('footer');
    footer.classList.add('footer');

    let rankName = document.createElement('p');
    rankName.classList.add('rank');
    rankName.textContent = Object.keys(rankSystem[rank]);
    rankName.style.background = `rgba(${Object.values(rankSystem[rank])})`;

    let date = document.createElement('time');
    date.classList.add('date');
    date.textContent = createdAt;

    footer.appendChild(rankName);
    footer.appendChild(date);

    evalBox.appendChild(header);
    evalBox.appendChild(evalContent);
    evalBox.appendChild(footer);

    evalList.appendChild(evalBox);
  });
};

const removeDOMElement = () => {
  const array = document.querySelectorAll('.evalBox');

  for (let i = 0; i < array.length; i ++) evalList.removeChild(array[i]);
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

    const check = localStorage.getItem('check');
    const option = check || 'rank';
    if (!check) {
      localStorage.setItem('check', option);
    }

    select.value = option;

    select.addEventListener('change', (e) => {
      const option = e.target.value;
      localStorage.setItem('check', option);

      removeDOMElement();
      
      loadEvalData(url, key, option);
    });

    loadEvalData(url, key, option);
  });
}

init();
