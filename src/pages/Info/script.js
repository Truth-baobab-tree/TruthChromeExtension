const container = document.querySelector('.infoContainer');

const url = 'https://Truthserver.khjcode.repl.co/info/get/news/sample';

const loadInfoData = async (title) => {
  const res = await fetch(`${url}/${title}/10`);
  const result = await res.json();

  drawDOMElement(result);
};

const drawDOMElement = (data) => {
  data.forEach(item => {
    let infoBox = document.createElement("div");
    infoBox.classList.add('infoBox');

    let infoTitleBox = document.createElement("div");
    infoTitleBox.classList.add('knight_title_div');

    let infoLink = document.createElement("a");
    let infoTitle = document.createElement("h2");
    let title = document.createTextNode(item.title);
    infoTitle.appendChild(title);
    infoLink.appendChild(infoTitle);
    infoLink.href = item.originallink;
    infoLink.target = '_blank';

    let infoContentBox = document.createElement("div");
    infoContentBox.classList.add('knight_content_div');

    let infoContent = document.createElement("p");
    let content = document.createTextNode(item.description);
    infoContent.appendChild(content);

    let hrBox = document.createElement("div");
    hrBox.classList.add("hr_div");
    let hr = document.createElement("hr");
    
    infoTitleBox.appendChild(infoLink);
    infoContentBox.appendChild(infoContent);
    hrBox.appendChild(hr);

    infoBox.appendChild(infoTitleBox);
    infoBox.appendChild(infoContentBox);

    container.appendChild(infoBox);
    container.appendChild(hrBox);
  });
};


const init = () => {
  chrome.tabs.executeScript({
    code: 'document.querySelector("head title").textContent'
  }, (res) => {
    let title = String(res);
    const i = title.indexOf("|");
    if (i !== -1) {
      title = title.substring(0, i);
    }
    loadInfoData(title);
  });
}

init();
