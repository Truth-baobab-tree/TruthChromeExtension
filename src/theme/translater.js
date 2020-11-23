const target = document.querySelectorAll('.trs');
const lang = document.querySelector('.language');

const lang_sys = {
  ko: {
    "profile-logout": "로그아웃",
  },
  en: {
    "profile-logout": "Logout",
  },
};

function change() {
  const language = localStorage.getItem('language');

  Object.keys(target).map(i => {
    target[i].textContent = lang_sys[language][target[i].id];
  });
}

change();
