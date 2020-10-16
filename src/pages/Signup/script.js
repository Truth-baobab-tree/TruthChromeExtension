const signupForm = document.querySelector('.signupForm');
const idInput = document.querySelector('.idBox input');
const pwInput = document.querySelector('.pwBox input');

const url = 'http://localhost:5500/user/api/login';

const handleSubmit = async (e) => {
  alert('event');
  e.preventDefault();

  const user = {
    name: idInput.value,
    password: pwInput.value,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  });


  const result = await response.json();
  alert(result);
};

function init() {
  signupForm.addEventListener('submit', handleSubmit);
}

init();
