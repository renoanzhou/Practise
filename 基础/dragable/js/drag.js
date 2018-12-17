(function(){
  let chat1 = document.querySelectorAll('.chat')[0];
  let chat2 = document.querySelectorAll('.chat')[1];
  chat1.chat_name = 'chat1';
  chat2.chat_name = 'chat2'
  let chats = [chat1,chat2];
  let chatTitle1 = document.querySelectorAll('.title')[0];
  let chatTitle2 = document.querySelectorAll('.title')[1];
  let sendBtn1 = document.querySelectorAll('.send-btn')[0];
  let sendBtn2 = document.querySelectorAll('.send-btn')[1];
  let textarea1 = document.querySelectorAll('.send-textarea')[0];
  let textarea2 = document.querySelectorAll('.send-textarea')[1];
  let content1 = document.querySelectorAll('.content')[0];
  let content2 = document.querySelectorAll('.content')[1];
  let container = document.querySelector('.container');
  let chatPos1 = chatPos(chat1);
  let chatPos2 = chatPos(chat2);
  // let chatPos1 = chatPos(document.querySelectorAll('.chat')[0]);
  
  sendBtn1.onclick = function () {
    sendMessage(chat1,textarea1.value);
    textarea1.value = '';
  }

  sendBtn2.onclick = function () {
    sendMessage(chat2,textarea2.value);
    textarea2.value = '';
  }

  container.addEventListener('mousemove',(e) => {
    throttle(() => {
      if(chatPos1.mousedown == 1) {
        computedDistance(chatPos1,e);
        move(chatPos1);
      } else if(chatPos2.mousedown == 1) {
        computedDistance(chatPos2,e);
        move(chatPos2);
      }
    },15)
  });
  // container.addEventListener('mouseout',(e) => {
  //   chatPos1.mousedown = 0;
  // })
  container.addEventListener('mousedown',(e) => {
    switch(e.target) {
      case chatTitle1: {
        chatPos1.startX = e.clientX;
        chatPos1.startY = e.clientY;
        chatPos1.mousedown = 1;
        chat1.classList.add('chat-active');
        chat2.classList.remove('chat-active');
        break;
      }
      case chatTitle2: {
        chatPos2.startX = e.clientX;
        chatPos2.startY = e.clientY;
        chatPos2.mousedown = 1;
        chat2.classList.add('chat-active');
        chat1.classList.remove('chat-active');
        break;
      }
    }
  })
  container.addEventListener('mouseup',(e) => {
    console.log(e.target);
    switch(e.target) {
      case chatTitle1: {
        computedDistance(chatPos1,e);
        move(chatPos1);
        chatPos1.mousedown = 0;
        break;
      }
      case chatTitle2: {
        computedDistance(chatPos2,e);
        move(chatPos2);
        chatPos2.mousedown = 0;
        break;
      }
    }
  })
  
  function chatPos (el) {
    return {
      startX:'',
      startY:'',
      endX:'',
      endY:'',
      distanceX:'',
      distanceY:'',
      style: window.getComputedStyle(el),
      mousedown: 0,
      el: el
    }
  }
  function throttle(callback,ms) {
    window.throttleData = window.throttleData || {};
    let {throttleOld:throttleOld = new Date().getTime(), time: time = 0} = window.throttleData;
    if(time == 0) {
      window.throttleData.throttleOld = throttleOld;
      window.throttleData.time = time;
    }
    return (() => {
      let throttleNow = new Date().getTime();
      if((throttleNow - throttleOld) > ms) {
        window.throttleData = {
          throttleOld: throttleOld = throttleNow,
          time: time++
        };
        callback();
      } 
    }).apply(window);
  }
  
  function move(chatPos) {
    let top = chatPos.style.top;
    let left = chatPos.style.left; 
    chatPos.el.style.top = parseInt(top) + chatPos.distanceY + 'px';
    chatPos.el.style.left = parseInt(left) + chatPos.distanceX + 'px';
    chatPos.startX = chatPos.endX;
    chatPos.startY = chatPos.endY;
  }
  
  function computedDistance(chatPos,event) {
    chatPos.endX = event.clientX;
    chatPos.endY = event.clientY;
    chatPos.distanceX = event.clientX - chatPos.startX;
    chatPos.distanceY = event.clientY - chatPos.startY;
  }
  
  function drawChat(message) {
    let leftTemplate = `
      <div class="left">
        <div class="left-avatar"></div>
        <div class="send-time">${new Date(message.send_time).toLocaleTimeString()}</div>
        <div class="left-detail">
          <div class="name">${message.name}</div>
          <div class="chat-content">${message.content}</div>
        </div>
      </div>
    `;
    let rightTemplate = `
      <div class="right">
        <div class="right-avatar"></div>
        <div class="send-time">${new Date(message.send_time).toLocaleTimeString()}</div>
        <div class="right-detail">
          <div class="name">${message.name}</div>
          <div class="chat-content">${message.content}</div>
        </div>  
      </div>
    `
    if(message.name == chat1.chat_name) {
      content1.innerHTML = content1.innerHTML + rightTemplate;
      content2.innerHTML = content2.innerHTML + leftTemplate;
    } else {
      content2.innerHTML = content2.innerHTML + rightTemplate;
      content1.innerHTML = content1.innerHTML + leftTemplate;
    }
  }
  
  function sendMessage(chat,text) {
    let message = {
      name: chat.chat_name,
      content: text,
      send_time: new Date().getTime(),
    }
    drawChat(message);
    // data.push(message);
  }
})()

