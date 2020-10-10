window.onload = function() {

  const title = document.querySelector('h1');

  console.log('Hello');

  document.querySelector('button').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      console.log(token);
      title.innerHTML = token;
      alert(token);
    });
  });
};
