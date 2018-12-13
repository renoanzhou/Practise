(function(){
  let chatTitle1 = document.querySelector('.title');
  let chat = document.querySelector('.chat');
  let charPosition = {
    startX:'',
    startY:'',
    endX:'',
    endY:'',
    distanceX:'',
    distanceY:'',
    el:chat
  }
  chatTitle1.addEventListener('dragstart',(e) => {
      console.log(e)
    charPosition.startX = e.clientX;
    charPosition.startY = e.clientY;

  });
  chatTitle1.addEventListener('dragend',(e) => {
      console.log(e)
    charPosition.endX = e.clientX;
    charPosition.endY = e.clientY;
    charPosition.distanceX = e.clientX - charPosition.startX;
    charPosition.distanceY = e.clientY - charPosition.startY;
    console.log(charPosition);
    let style = window.getComputedStyle(document.querySelector('.chat'),null);
    let top = style.top;
    let left = style.left;
    console.log(charPosition.el);
    console.log(parseInt(top));
    document.querySelector('.chat').style.top = parseInt(top) + charPosition.distanceY + 'px';
    document.querySelector('.chat').style.left = parseInt(left) + charPosition.distanceX + 'px';
  });
})()