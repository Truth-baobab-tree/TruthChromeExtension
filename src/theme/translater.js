const target = document.querySelectorAll('.trs');
const lang = document.querySelector('.language');

const lang_sys = {
  ko: {
    "profile-logout": "로그아웃",
    "main-view": "평가보기",
    "main-write": "평가쓰기",
    "main-factcheck": "팩트체크",
    "main-detail": "더보기",
    "main-source": "출처",
    "main-releinfo": "관련 정보",
    "main-seemore": "더보기",
    "loading": "로딩중...",
    "check-EvalRec": "관련 정보",
    "check-rank": "랭크순",
    "check-latest": "최신순",
    "eval-warn": "제출된 글에 대한 책임은 작성자 본인에게 있습니다.",
    "eval-truth": "진실",
    "eval-fake": "거짓",
    "eval-submit": "제출",
    "eval-update": "수정",
    "info-ReleInfo": "관련 정보",
    "login-login": "로그인",
    "login-gosignup": "계정이 없습니다.",
    "signup-signup": "회원가입",
    "signup-gologin": "계정이 있습니다."
  },
  en: {
    "profile-logout": "Logout",
    "main-view": "View Evaluation",
    "main-write": "Write Evaluation",
    "main-factcheck": "Fact Check",
    "main-detail": "Detail",
    "main-source": "Sources",
    "main-releinfo": "Relevant Info",
    "main-seemore": "See More",
    "loading": "Loading...",
    "check-EvalRec": "Evaluation Record",
    "check-rank": "Rank",
    "check-latest": "Latest",
    "eval-warn": "The user yourself is responsible for the submission.",
    "eval-truth": "truth",
    "eval-fake": "fake",
    "eval-submit": "Submit",
    "eval-update": "Update",
    "info-ReleInfo": "Relevant Info",
    "login-login": "Login",
    "login-gosignup": "You have not account?",
    "signup-signup": "Sign up",
    "signup-gologin": "You have account?"
  },
  jp: {
    "profile-logout": "Logout",
    "main-view": "View Evaluation",
    "main-write": "Write Evaluation",
    "main-factcheck": "Fact Check",
    "main-detail": "Detail",
    "main-source": "Sources",
    "main-releinfo": "Relevant Info",
    "main-seemore": "See More",
    "loading": "Loading...",
    "check-EvalRec": "Evaluation Record",
    "check-rank": "Rank",
    "check-latest": "Latest",
    "eval-warn": "The user yourself is responsible for the submission.",
    "eval-truth": "truth",
    "eval-fake": "fake",
    "eval-submit": "Submit",
    "eval-update": "Update",
    "info-ReleInfo": "Relevant Info",
    "login-login": "Login",
    "login-gosignup": "You have not account?",
    "signup-signup": "Sign up",
    "signup-gologin": "You have account?"
  },
};

function change() {
  const language = localStorage.getItem('language');

  Object.keys(target).map(i => {
    target[i].textContent = lang_sys[language][target[i].id];
  });
}

change();
