const textBox = document.querySelector('.textbox');
const submitBtn = document.querySelector('.eval_submit');
const truthBtn = document.querySelector('.truth');
const lieBtn = document.querySelector('.lie');

const target = 'https://Truthserver.khjcode.repl.co/page/new/eval';

const onSubmit = async (e) => {
  const reason = textBox.value.trim();
  const select = truthBtn.classList[2] === 'clicked' ? 'truth' : lieBtn.classList[2] === 'clicked' ? 'lie' : false;

  if (select && select !== '') {
    if (reason && reason !== '') {
      const { url, key } = e.currentTarget;
      const status = select;
      const eval = { url, reason, status, key };

      const res = await fetch(target, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(eval),
      });

      const result = await res.json();

      if (result === 'success') {
        alert('성공적으로 등록 되었습니다.');
        location.href = '../Main/index.html';
      } else {
        alert('error');
      }
    } else {
      alert('평가에 대한 근거를 작성하세요.');
    }
  } else {
    alert('버튼을 눌러 평가를 해주세요.');
  }
};

function init() {
  const key = localStorage.getItem('user');
  if (!key) {
    location.href = '../Login/index.html';
  }

  let selected = '';

  truthBtn.addEventListener('click', (() => {
    if (selected === 'truth') {
      selected = '';
      truthBtn.classList.remove('clicked');
    } else {
      selected = 'truth';
      truthBtn.classList.add('clicked');
      lieBtn.classList.remove('clicked');
    }
  }));

  lieBtn.addEventListener('click', (() => {
    if (selected === 'lie') {
      selected = '';
      lieBtn.classList.remove('clicked');
    } else {
      selected = 'lie';
      truthBtn.classList.remove('clicked');
      lieBtn.classList.add('clicked');
    }
  }));

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    if (url.charAt(url.length - 1) === '/') {
      url = url.substring(0, url.length - 1);
    }
    
    submitBtn.addEventListener('click', onSubmit, false);
    submitBtn.url = url;
    submitBtn.key = key;
  });
}

init();
