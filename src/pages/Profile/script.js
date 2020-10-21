const name = document.querySelector('.name');
const rank = document.querySelector('.rank');
const logout = document.querySelector('.logout');

const url = 'https://Truthserver.khjcode.repl.co/user/api/find';

const rankSystem = {
  bronze: '170, 125, 98',
  silver: '186, 181, 178',
  gold: '164, 147, 104',
  platinum: '203, 235, 227',
  diamond: '197, 223, 241',
};

const setUserData = async (key) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ key }),
  });

  const data = await res.json();

  name.textContent = data.name;
  rank.textContent = data.rank;
  rank.style.background = `rgb(${rankSystem[data.rank]})`;
}

function onLogout() {
  localStorage.clear();
  location.href = '../Main/index.html';
}

function init() {
  const user = localStorage.getItem('user');
  if (!user) {
    location.href = '../Login/index.html';
  } else {
    logout.addEventListener('click', onLogout);
    setUserData(user);
  }
}

init();
