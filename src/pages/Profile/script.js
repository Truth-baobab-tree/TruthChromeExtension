const name = document.querySelector('.name');
const rank = document.querySelector('.rank');
const logout = document.querySelector('.logout');

const url = 'http://localhost:5050/user/api/find';

const setUserData = async (key) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ key }),
  });

  const data = await res.json();

  name.innerHTML = data.name;
  rank.innerHTML = data.rank;
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
