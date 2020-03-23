var thumbUp = document.getElementsByClassName('fa fa-plus');
var trash = document.getElementsByClassName('fa-trash');
const button = document.querySelector('#button');
const names = document.querySelectorAll('.name');
const images = document.querySelectorAll('img');
const messages = document.querySelectorAll('.messages');
const likes = document.querySelectorAll('.likes');

function getGif() {
  for (let i = 0; i < names.length; i++) {
    fetch(`https://api.giphy.com/v1/gifs/search?q=${names[i].innerHTML}&api_key=7TCbBMX335sizhL4tZ9L4QHQIbNpWFkz`)
      .then(res => res.json())
      .then(response => {
        images[i].src = response.data[0].images.downsized_large.url;
      });
  }
}

getGif();

Array.from(thumbUp).forEach(function(element) {
  element.addEventListener('click', function() {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const thumbUp = parseFloat(
      this.parentNode.parentNode.childNodes[7].innerText
    );
    fetch('thumbUp', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        msg: msg,
        thumbUp: thumbUp
      })
    })
      .then(response => {
        if (response.ok) return response.json();
      })
      .then(data => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        msg: msg
      })
    }).then(function(response) {
      window.location.reload();
    });
  });
});
