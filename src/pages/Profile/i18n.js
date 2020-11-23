const lang_select = document.querySelector('#lang-select');

const isKorean = navigator.language === "ko-KR";
      if (isKorean) {
        document
          .getElementById("lang-select")
          .options[1].setAttribute("selected", true);
      }
    i18next.init(
    {
      lng: isKorean ? "ko" : "en",
      debug: true,
      resources: {
        ko: {
          translation: {
            logout: "로그아웃"
          }
        },
        en: {
          translation: {
            logout: "Logout"
          }
        }
      }
    },
    function(err, t) {
      if (err) {
        console.error(err);
      } else {
        updateContent();
      }
    }
  );
  function updateContent() {
    document.getElementById("logout").innerHTML = i18next.t("logout");
  }
  i18next.on("languageChanged", () => {
    updateContent();
  });
lang_select.addEventListener('change',  (e) => {i18next.changeLanguage(e.target.value)})