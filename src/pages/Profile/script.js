const name = document.querySelector('.name');
const rank = document.querySelector('.rank');
const logout = document.querySelector('.logout');
const lang_select = document.querySelector('.language');

const url = 'https://truthserver.khjcode.repl.co/user/api/find';

const rankSystem = [{
    admin: '44, 62, 80'
  },
  {
    diamond: '197, 223, 241'
  },
  {
    platinum: '203, 235, 227'
  },
  {
    gold: '164, 147, 104'
  },
  {
    silver: '186, 181, 178'
  },
  {
    bronze: '170, 125, 98'
  },
];

const setUserData = async (key) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      key
    }),
  });

  const data = await res.json();

  name.textContent = data.name;
  rank.textContent = Object.keys(rankSystem[data.rank]);
  rank.style.background = `rgb(${Object.values(rankSystem[data.rank])})`;
}

function onLogout() {
  localStorage.removeItem('user');
  location.href = '../Main/index.html';
}

function init() {
  const user = localStorage.getItem('user');
  if (!user) {
    location.href = '../Login/index.html';
  } else {
    Object.keys(lang_select.options).map(i => {
      lang_select.options[i].selected = lang_select.options[i].value === localStorage.getItem('language');
    });
    lang_select.addEventListener('change', (e) => {
      localStorage.setItem('language', e.target.value);
      change();
    });
    logout.addEventListener('click', onLogout);
    setUserData(user);
  }
}

init();
