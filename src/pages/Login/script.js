const loginForm = document.querySelector('.loginForm');
const idInput = document.querySelector('.idBox input');
const pwInput = document.querySelector('.pwBox input');

const url = 'https://Truthserver.khjcode.repl.co/user/api/login';

const handleSubmit = async (e) => {
  e.preventDefault();

  const name = idInput.value.trim();
  const password = pwInput.value.trim();

  if (name.length < 16 && name.length > 4 && password.length < 101 && password.length > 9) {
    if (name.indexOf(';') === -1 && password.indexOf(';') === -1) {
      if (name && password && name !== '' && password !== '') {
        const user = { name, password };
    
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(user),
        });
    
        const result = await response.json();

        if (result === 'user is not found.' || result === 'login fail.') {
          alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        } else {
          localStorage.setItem('user', result);
          location.href = '../Main/index.html';
        }
      } else {
        alert('ID 와 Password 를 올바르게 입력해주세요.');
      }
    } else {
      alert("';' 는 입력할 수 없습니다.");
    }
  } else {
    alert('ID 는 5 ~ 20 글자, Password 는 10 ~ 100 글자 사이로 입력해주세요.');
  }
};

function init() {
  const user = localStorage.getItem('user');
  
  if (user) {
    location.href = '../Main/index.html';
  } else {
    loginForm.addEventListener('submit', handleSubmit);
  }
}

init();
