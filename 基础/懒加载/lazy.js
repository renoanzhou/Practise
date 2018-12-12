
function lazyEl() {
  let imgElements;
  function getInstance() {
    if(!imgElements) {
      imgElements = document.querySelectorAll('.lazy');
    }
    return Array.from(imgElements);
  }
  return {
    getInstance: getInstance
  }
}
function limit() {
  let old = new Date().getTime();
  let times = 0;
  return function() {
    let now = new Date().getTime();
    // console.log(now);
    if(now - old > 200) {
      old = now;
      console.log(times++);
      check();
    }
  }
}

function setSrc(el) {
  let src = el.dataset.src;
  el.setAttribute('src',src);
  el.classList.remove('lazy');
}

function check() {
  let els = lazyEl().getInstance() || [];
  if(els.length == 0) {
    window.onscroll = null;
  }
  for(var i = 0; i < els.length; i++) {
    if(checkPosition(els[i])) {
      setSrc(els[i]);
      els.splice(i,1);
    }
  }
}

function checkPosition(el) {
  let rect = el.getBoundingClientRect();
  if(rect.top - window.innerHeight < 0) {
    return true;
  }
}

function init() {
  window.onscroll = limit();
  check();
}
let imgEls = lazyEl();
init();