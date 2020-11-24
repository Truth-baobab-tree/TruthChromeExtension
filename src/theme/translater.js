const target = document.querySelectorAll('.trs');
const lang = document.querySelector('.language');

const lang_sys = {
  ko: {
    "releinfo": "관련 정보",
    "profile-logout": "로그아웃",
    "main-view": "평가보기",
    "main-write": "평가쓰기",
    "main-factcheck": "팩트체크",
    "main-detail": "자세히보기",
    "main-source": "출처",
    "main-seemore": "더보기",
    "check-EvalRec": "평가 기록",
    "check-rank": "랭크순",
    "check-latest": "최신순",
    "eval-warn": "제출된 글에 대한 책임은 작성자 본인에게 있습니다.",
    "eval-truth": "진실",
    "eval-fake": "거짓",
    "eval-submit": "제출",
    "eval-update": "수정",
    "login-login": "로그인",
    "login-gosignup": "계정이 없습니다",
    "signup-signup": "회원가입",
    "signup-gologin": "계정이 있습니다"
  },
  en: {
    "releinfo": "Relevant Info",
    "profile-logout": "Logout",
    "main-view": "View Evaluation",
    "main-write": "Write Evaluation",
    "main-factcheck": "Fact Check",
    "main-detail": "Detail",
    "main-source": "Sources",
    "main-seemore": "See More",
    "check-EvalRec": "Evaluation Record",
    "check-rank": "Rank",
    "check-latest": "Latest",
    "eval-warn": "The user yourself is responsible for the submission.",
    "eval-truth": "truth",
    "eval-fake": "fake",
    "eval-submit": "Submit",
    "eval-update": "Update",
    "login-login": "Login",
    "login-gosignup": "You have not account?",
    "signup-signup": "Sign up",
    "signup-gologin": "You have account?"
  },
  jp: {
    "releinfo": "関連情報",
    "profile-logout": "ログアウト",
    "main-view": "評価の表示",
    "main-write": "書き込み評価",
    "main-factcheck": "ファクトチェック",
    "main-detail": "詳細を見る",
    "main-source": "出處",
    "main-seemore": "もっと見る",
    "check-EvalRec": "評価記録",
    "check-rank": "ランク順",
    "check-latest": "最新順",
    "eval-warn": "提出された文章に対する責任は作成者本人にあります。",
    "eval-truth": "真実",
    "eval-fake": "偽り",
    "eval-submit": "呈出",
    "eval-update": "修整",
    "login-login": "ログイン",
    "login-gosignup": "アカウントがありません",
    "signup-signup": "会員加入",
    "signup-gologin": "アカウントがあります"
  },
};

function change() {
  const language = localStorage.getItem('language');

  Object.keys(target).map(i => {
    target[i].textContent = lang_sys[language][target[i].id];
  });
}

change();
