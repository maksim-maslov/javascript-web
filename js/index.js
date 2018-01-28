'use strict';

const senderId = '10001';
var connection;
const attachments = [];
const videoStreams = [];

const contactSection = document.querySelector('.contacts');
const chatHistorySection = document.querySelector('.chat-history');
const attachmentsSection = document.querySelector('.message-box__attachments');
const sidePanel = document.querySelector('.side-panel');  
const userInfoPanel = document.querySelector('.user-info-section');    

const sidePanelFiles = document.querySelector('.shared__content_files');
const sidePanelAudio = document.querySelector('.shared__content_audio');
const sidePanelPhotos = document.querySelector('.shared__content_photos');

const textInput = document.querySelector('.message-box__input');
const submitBtn = document.querySelector('#submitbtn');
const sendMsgBtn = document.querySelector('.submit-button');
const clipBtn = document.querySelector('#uploadbtn');
const msgBoxPhotoBtn = document.querySelector('.message-box__photo-button');
const takePhotoBtn = document.querySelector('.photo-box-app__controls'); 


const photoBox = document.querySelector('.photo-box');
const app = document.querySelector('.photo-box__app');    

const optionsMenuItems = document.querySelector('.options-menu');

const player = document.querySelector('.audioplayer');


function loadData(url) {
  return new Promise((done, fail) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('error', e => fail(xhr));
    xhr.addEventListener('load', e => {
      if (xhr.status !== 200) {
        fail(xhr);
      }
      done(xhr.responseText);
    });
    xhr.send();
  });
}


function sendData(url, data) {
  return new Promise((done, fail) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('error', e => fail(xhr));
    xhr.addEventListener('load', e => {
      if (xhr.status !== 200) {
        fail(xhr);
      }
      done(xhr.responseText);
    });
    xhr.send(data);
  });
}


function setConnectionWS(otherUserItemContactList) {

  connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

  const topSectionTextStatus = document.querySelector('.top-section-text__status');

  connection.addEventListener('open', () => {  
    topSectionTextStatus.textContent = 'Online';
    otherUserItemContactList.querySelector('.contact-item-text__name').dataset.status = 'Online';
  });

  connection.addEventListener('message', ev => receiveMessage(ev));

  connection.addEventListener('close', () => {  
    topSectionTextStatus.textContent = 'Offline';
    otherUserItemContactList.querySelector('.contact-item-text__name').dataset.status = 'Offline';
    
    const contactsJSON = JSON.parse(localStorage.contactsJSON);
    contactsJSON.status = 'Offline';    
    const contactsToJSON = JSON.stringify(contactsJSON);
    localStorage.contactsJSON = contactsToJSON;
    
    connection = '';
  }); 
}


function init() {

  addEventListenersControlElements();
  
  textInput.addEventListener('input', () => {
    disableSendBtn();
  });

  sendMsgBtn.addEventListener('mousemove', () => {
    if (!submitBtn.disabled) {
      sendMsgBtn.style.opacity = '1';
    }
  });

  sendMsgBtn.addEventListener('mouseout', () => {
    if (!submitBtn.disabled) {
      sendMsgBtn.style.opacity = '0.6';
    }
  });

  clipBtn.addEventListener('change', onSelectFiles);  

  takePhotoBtn.addEventListener('click', takePicture);

  submitBtn.addEventListener('click', sendMessage);

  loadData('./contacts.json')
    .then((result) => {
      localStorage.contactsJSON = result;    
      createContactsSection();
      const otherUserItemContactList = document.querySelector('.contacts__item');
      createChatHistoryInit(otherUserItemContactList);             
    });
}


function updateDataOnServer() {
  const messagesJSON = localStorage.messagesJSON;
  const contactsJSON = localStorage.contactsJSON;
  sendData('./messages.json', messagesJSON)
    .then((result) => {
      console.log(`result=${result}`);
    })
    .catch((error) => {
      console.log(`error=${error}`);
    });  

  sendData('./contacts.json', contactsJSON)
    .then((result) => {
      console.log(`result=${result}`);
    })
    .catch((error) => {
      console.log(`error=${error}`);
    });
}

  
function addEventListenersControlElements() {

  const sharedControlElement = document.querySelectorAll('.shared-head__control-element');
  sharedControlElement.forEach(el => {
    el.addEventListener('click', ev => {
      const element = ev.target.parentElement.parentElement.querySelector('.shared__content');
      element.classList.toggle('shared__content_hide');
    });
  });
    
  const topSectionControlElement = document.querySelector('.top-section__control-element');
  topSectionControlElement.addEventListener('click', () => {
    optionsMenuItems.classList.toggle('options-menu_show');
  });

  const userInfoMenuItem = document.querySelector('.options-menu__item_user-info');
  userInfoMenuItem.addEventListener('click', () => toogleSidePanel('none', 'block'));

  const sharedFilesMenuItem = document.querySelector('.options-menu__item_shared-files');
  sharedFilesMenuItem.addEventListener('click', () => toogleSidePanel('block', 'none'));

  const clearHistoryMenuItem = document.querySelector('.options-menu__item_clear-history');
  clearHistoryMenuItem.addEventListener('click', clearHistory);

  msgBoxPhotoBtn.addEventListener('click', clickPhotoBtn);
}


function toogleSidePanel(sharedPanelStyle, userInfoPanelStyle) {
  optionsMenuItems.classList.remove('options-menu_show');
  sidePanel.style.display = sharedPanelStyle;
  userInfoPanel.style.display = userInfoPanelStyle; 
}


function clearHistory() {

  optionsMenuItems.classList.remove('options-menu_show');  

  player.pause();
  player.controls = false;  

  chatHistorySection.textContent = '';
  sidePanelFiles.textContent = '';
  sidePanelAudio.textContent = '';
  sidePanelPhotos.textContent = '';    

  const messagesJSON = JSON.parse(localStorage.messagesJSON);        
  const otherUserId = document.querySelector('.contacts__item_active').dataset.userId;
  messagesJSON.users.forEach(el => {
    if (el.other_user_id == otherUserId) {
      el.messages.splice(0, el.messages.length);
    }
  });

  const contactsJSON = JSON.parse(localStorage.contactsJSON);        
  document.querySelector('.contacts__item_active  .contact-item-text__message').textContent = '';
  contactsJSON.contacts.forEach(el => {
    if (el.user_id == otherUserId) {        
      el.last_message = {snippet:'', message_sender_id:'', timestamp_precise:''};
    return;
    }
  });

  localStorage.messagesJSON = JSON.stringify(messagesJSON);
  localStorage.contactsJSON = JSON.stringify(contactsJSON);

  updateDataOnServer();
}


function onSelectFiles(event) {
  const files = Array.from(event.target.files);
  files.forEach(file => {
    addAttacmentsItem(file.type, file.name, URL.createObjectURL(file), file);      
  });
}
  

function clickPhotoBtn(event) {
  
  event.preventDefault();
  photoBox.classList.add('photo-box_show');

  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(function(stream) {

      const video = document.createElement('video');
      video.src = URL.createObjectURL(stream);

      app.insertBefore(video, app.firstElementChild);
      takePhotoBtn.style.display = 'block';

      const closeBtn = document.createElement('div'); 
      closeBtn.className = 'photo-box__closeBtn';
      photoBox.insertBefore(closeBtn, photoBox.firstElementChild);

      videoStreams.push(stream);

      closeBtn.addEventListener('click', closePhotoBox);

    });

  msgBoxPhotoBtn.removeEventListener('click', clickPhotoBtn);
}


function takePicture() {  
  
  const video = document.createElement('video');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d'); 

  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then((stream) => {  
      video.src = URL.createObjectURL(stream);
      videoStreams.push(stream);

      video.addEventListener('canplay', () => {
        setTimeout(() => {          
          
          const fragment = document.createDocumentFragment();          

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);  

          const src = canvas.toDataURL();  

          const photo = document.createElement('div'); 
          photo.className = 'photo-box-app__photo';
          fragment.appendChild(photo);

          const img = document.createElement('img'); 
          img.style.height = '291px';         
          img.src = src;
                  
          photo.appendChild(img); 

          const cancelBtn = document.createElement('div');
          cancelBtn.className = 'photo-box-app__cancelBtn';
          cancelBtn.addEventListener('click', event => {
            event.currentTarget.parentElement.parentElement.removeChild(event.currentTarget.parentElement);
            document.querySelector('video').style.display = 'block';
            takePhotoBtn.style.display = 'block';
          });
          photo.appendChild(cancelBtn);           

          const okBtn = document.createElement('div');
          okBtn.className = 'photo-box-app__okBtn';
          okBtn.addEventListener('click', () => {
            const imageItemsChat = document.querySelectorAll('.photo__item_chat');
            const filetype = 'image/png';
            const fileName = `image${imageItemsChat.length + 1}.png`;
            const link = src;

            canvas.toBlob(function(blob) {
              addAttacmentsItem(filetype, fileName, src, new File([blob], fileName, {type: filetype}));   
            });
   
            closePhotoBox();              
          });         
          photo.appendChild(okBtn);                     

          document.querySelector('video').style.display = 'none';
          takePhotoBtn.style.display = 'none';
          app.insertBefore(fragment, app.firstElementChild);
          
        }, 100);
      }); 
    });  
}


function closePhotoBox() {

  photoBox.classList.remove('photo-box_show');
  
  videoStreams.forEach((el) => {
    el.getVideoTracks().map(track => track.stop());
  });

  const photo = app.querySelector('.photo-box-app__photo');
  
  if (photo) {
    photo.parentElement.removeChild(photo);
  }

  app.removeChild(document.querySelector('video'));
  photoBox.removeChild(document.querySelector('.photo-box__closeBtn'));

  msgBoxPhotoBtn.addEventListener('click', clickPhotoBtn);
}


function createContactsSection() {

  const contactsJSON = JSON.parse(localStorage.contactsJSON);

  const fragment = contactsJSON.contacts.reduce((memo, el) => {   
    const contactsItem = document.createElement('div');
    contactsItem.className = 'contacts__item'; 
    contactsItem.dataset.userId = el.user_id;

    const avatar = document.createElement('div');
    avatar.className = 'contacts-item__avatar';
    contactsItem.appendChild(avatar);    

    const avatarPic = document.createElement('img');
    avatarPic.className = 'avatar__pic';  
    avatarPic.src = el.avatar_pic_link;   
    avatar.appendChild(avatarPic); 

    const text = document.createElement('div');
    text.className = 'contacts-item__text';
    contactsItem.appendChild(text); 

    const textName = document.createElement('div');
    textName.className = 'contact-item-text__name';
    textName.textContent = el.user_name;
    textName.dataset.status = el.status;
    text.appendChild(textName);

    const textMessage = document.createElement('div');
    textMessage.className = 'contact-item-text__message';

    if (el.last_message.snippet) {
      textMessage.textContent = el.last_message.message_sender_id == el.user_id
      ? el.last_message.snippet 
      : `You: ${el.last_message.snippet}`;
    }      

    text.appendChild(textMessage);     
    memo.appendChild(contactsItem);
    return memo;
    }, document.createDocumentFragment());   

  contactSection.appendChild(fragment); 

  const contactItems = document.querySelectorAll('.contacts__item');
  Array.from(contactItems).forEach(el => {
    el.addEventListener('click', ev => {
      const otherUserItemContactList = ev.currentTarget
      createChatHistoryInit(otherUserItemContactList);
    });
  }); 

  localStorage.contactsJSON = JSON.stringify(contactsJSON); 
}


function createChatHistoryInit(otherUserItemContactList) {

  const contactsJSON = JSON.parse(localStorage.contactsJSON);

  const contactItems = document.querySelectorAll('.contacts__item');
  Array.from(contactItems).forEach(el => {el.classList.remove('contacts__item_active')});
  otherUserItemContactList.classList.add('contacts__item_active');

  chatHistorySection.textContent = '';
  sidePanelFiles.textContent = '';
  sidePanelAudio.textContent = '';
  sidePanelPhotos.textContent = '';
  clearAttacments();

  const topSectionTextName = document.querySelector('.top-section-text__name');
  topSectionTextName.textContent = otherUserItemContactList.querySelector('.contact-item-text__name').textContent;
  const topSectionTextStatus = document.querySelector('.top-section-text__status');
  topSectionTextStatus.textContent = otherUserItemContactList.querySelector('.contact-item-text__name').dataset.status;


  const avatar = userInfoPanel.querySelector('.avatar__pic');
  avatar.src = otherUserItemContactList.querySelector('.avatar__pic').src;

  const name = userInfoPanel.querySelector('.user-info-section__name');
  name.textContent = otherUserItemContactList.querySelector('.contact-item-text__name').textContent;

  const status = userInfoPanel.querySelector('.user-info-section__status');
  status.textContent = otherUserItemContactList.querySelector('.contact-item-text__name').dataset.status;  

  loadData('./messages.json')
    .then((result) => {      
      localStorage.messagesJSON = result;
      createChatHistory(otherUserItemContactList);
    });        
}


function createChatHistory(otherUserItemContactList) {

  const messagesJSON = JSON.parse(localStorage.messagesJSON);

  const userMessages = messagesJSON.users.find(el => {return el.other_user_id == otherUserItemContactList.dataset.userId;});

  if (userMessages) {    
    const fragment = userMessages.messages.reduce((memo, el, index) => {        
      const otherUserId = userMessages.other_user_id;      
      const avatarPic = otherUserItemContactList.querySelector('img').src;
      const messageSenderId = el.message_sender_id;
      const timestamp = el.timestamp_precise;
      const messageText = el.message_text;
      const attachmentsMessage = el.attachments;      
      const messageElement = addMessageChat(index, otherUserId, avatarPic, messageSenderId, timestamp, messageText, attachmentsMessage);  
      memo.appendChild(messageElement);
      return memo;
    }, document.createDocumentFragment()); 

    chatHistorySection.appendChild(fragment);     
  }

  if (connection) {
    connection.close();
  }    

  setConnectionWS(otherUserItemContactList);
}


function sendMessage(event) {

  event.preventDefault();
  const otherUserItemContactList = document.querySelector('.contacts__item_active');
  const audioItemsChat = document.querySelectorAll('.audio__item_chat .audio-item__playstate');

  const index = audioItemsChat.length;
  const otherUserId = otherUserItemContactList.dataset.userId;      
  const avatar = '';
  const messageSenderId = senderId;
  const timestamp = Date.now();
  const messageText = textInput.value;
  const attachmentsMessage = attachments; 

  const message = addMessageChat(index, otherUserId, avatar, messageSenderId, timestamp, messageText, attachmentsMessage);
  chatHistorySection.appendChild(message);

  const messageTextFragment = messageText.length > 20
  ? `You: ${messageText.substr(0, 20)}...`
  : `You: ${messageText}`;

  otherUserItemContactList.querySelector('.contact-item-text__message').textContent = messageTextFragment;
  
  textInput.value = '';

  submitBtn.disabled = true;
  
  addMessageLocalStorage(otherUserId, messageSenderId, timestamp, messageText);
  
  clearAttacments();
  
  disableSendBtn(); 

  if (connection) {
    connection.send(messageText);
  }  
}


function receiveMessage(ev) {

  const otherUserItemContactList = document.querySelector('.contacts__item_active');

  if (ev.data == '...') {    
    otherUserItemContactList.querySelector('.contact-item-text__message').textContent = 'typing...';
  } else {

    const index = 0;
    const otherUserId = otherUserItemContactList.dataset.userId;      
    const avatar = otherUserItemContactList.querySelector('.avatar__pic').src;
    const messageSenderId = otherUserId;
    const timestamp = String(Date.now());
    const messageText = ev.data;
    const attachmentsMessage = [];

    const message = addMessageChat(index, otherUserId, avatar, messageSenderId, timestamp, messageText, attachmentsMessage);
    chatHistorySection.appendChild(message);

    const messageTextFragment = messageText.length > 20
    ? `${messageText.substr(0, 20)}...`
    : messageText;

    otherUserItemContactList.querySelector('.contact-item-text__message').textContent = messageTextFragment;    
    
    addMessageLocalStorage(otherUserId, messageSenderId, timestamp, messageText);
  } 
}


function addMessageChat(index, otherUserId, avatarPicture, messageSenderId, timestamp, messageText, attachmentsMessage) {

  const message = document.createElement('div');
  message.className = 'chat-history__message';

  const date = new Date(Number(timestamp));
  message.title = date.toLocaleString('ru-Ru');
  
  if (messageSenderId == otherUserId) {
    message.classList.add('chat-history__message_left');
    const avatar = document.createElement('div');
    avatar.className = 'ch-message__avatar';
    message.appendChild(avatar);    

    const avatarPic = document.createElement('img');
    avatarPic.className = 'avatar__pic';  
    avatarPic.src = avatarPicture;   
    avatar.appendChild(avatarPic); 

  } else {
    message.classList.add('chat-history__message_right');
  }        

  const messageContent = document.createElement('div');
  messageContent.className = 'ch-message__content';
  message.appendChild(messageContent);

  if (messageText) {
    addElementText(messageContent, messageText);        
  } 

  if (attachmentsMessage.length) {
    const attachment = document.createElement('div');
    attachment.className = 'ch-msg-cnt__attachment';
    messageContent.appendChild(attachment);
    attachmentsMessage.forEach(element => { 

      if (element.type.search(/audio/) != -1) {
        addElementAudio(attachment, element.link, element.file_name, index);                 
      }  else if (element.type.search(/image/) != -1) {
        addElementImage(attachment, element.link);
      } else {   
        addElementFile(attachment, element.link, element.file_name);
      }

    });          
  }  

  return message;
} 


function addMessageLocalStorage(otherUserId, messageSenderId, timestamp, messageText) {
  
  const messagesJSON = JSON.parse(localStorage.messagesJSON);
  const contactsJSON = JSON.parse(localStorage.contactsJSON);  

  const message = {};
  const files = [];

  messagesJSON.users.forEach(el => {
    if (el.other_user_id == otherUserId) {
      message.message_sender_id = messageSenderId;
      message.timestamp_precise = timestamp;
      message.message_text = messageText;
      message.attachments = [];

      if (attachments.length) {
        const attachmentMessage = attachments.forEach(el => { 
          files.push(el.file);
          message.attachments.push({type: el.type, file_name: el.file_name, link: `./files/${el.file_name}`});
        }); 
      } 

      el.messages.push(message);       
    }
      
    return el;
  });    

  contactsJSON.contacts.forEach(el => {
    if (el.user_id == otherUserId) {
      const messageTextFragment = messageText.length > 20
      ? `${messageText.substr(0, 20)}...`
      : messageText;
      const lastMessage = {
        "snippet": messageTextFragment,
        "message_sender_id": messageSenderId,
        "timestamp_precise": timestamp
      };
      el.last_message = lastMessage;
      el.status = document.querySelector('.contact-item-text__name').dataset.status;
    }
    
    return el;
  });

  localStorage.messagesJSON = JSON.stringify(messagesJSON);
  localStorage.contactsJSON = JSON.stringify(contactsJSON);

  updateDataOnServer();

  if (files.length > 0) {
    files.forEach((el) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', './');
      xhr.addEventListener('load', () => {
        if (xhr.status === 200){
          console.log(`Файл ${file.name} сохранен.`);
        }
      });
      xhr.send(el);
    });      
  } 
}


function addElementText(parentElement, text) {
  const messageText = document.createElement('div');
  messageText.className = 'ch-msg-cnt__text';
  messageText.textContent = text;
  parentElement.appendChild(messageText);
}


function addElementFile(parentElement, link, fileName) {
  const fileItemChat = createElementFile(link, fileName);
  fileItemChat.className = 'files__item files__item_chat';
  parentElement.appendChild(fileItemChat);
  const fileItemShared = createElementFile(link, fileName);
  fileItemShared.className = 'files__item files__item_shared';
  sidePanelFiles.appendChild(fileItemShared);
}   


function addElementAudio(parentElement, link, fileName, key) {
  const audioItemChat = createElementAudio(link, fileName, key); 
  audioItemChat.className = 'audio__item audio__item_chat';
  audioItemChat.querySelector('.audio-item__playstate').name = key;
  parentElement.appendChild(audioItemChat); 
  const audioItemShared = createElementAudio(link, fileName, key); 
  audioItemShared.className = 'audio__item audio__item_shared';  
  audioItemShared.querySelector('.audio-item__playstate').name = `${key}-s`;  
  sidePanelAudio.appendChild(audioItemShared);
}


function addElementImage(parentElement, link) {  
  createElementImageChat(parentElement, link);    
  const imageItemShared = createElementImageSidePanelPhotos(link);
  imageItemShared.className = 'photos__item photos__item_shared'; 
  sidePanelPhotos.appendChild(imageItemShared);
} 


function createElementFile(link, fileName) {

  const attachmentItem = document.createElement('div');   
  const fileIcon = document.createElement('div');
  fileIcon.className = 'files-item__icon';
  attachmentItem.appendChild(fileIcon);

  const fileLink = document.createElement('a');
  fileLink.className = 'files-item__title';
  fileLink.setAttribute('download', '');
  fileLink.href = link;
  fileLink.textContent = fileName;
  attachmentItem.appendChild(fileLink);

  return attachmentItem;
}


function createElementAudio(link, fileName) {

  const attachmentItem = document.createElement('div');             
  const playBtn = document.createElement('div');
  playBtn.className = 'audio-item__play-button';   
  attachmentItem.appendChild(playBtn);

  const audioLink = document.createElement('a');
  audioLink.className = 'audio-item__playstate'; 
  audioLink.href = link;

  addEventListenerAudio(audioLink);

  attachmentItem.appendChild(audioLink);

  const title = document.createElement('div');
  title.className = 'audio-item__title'; 
  title.textContent = fileName;
  attachmentItem.appendChild(title);

  return attachmentItem;
}  


function createElementImageChat(parentElement, link) {
  
  const attachmentItem = document.createElement('img');       
  attachmentItem.className = 'photo__item'; 
  attachmentItem.classList.add('photo__item_chat')
  attachmentItem.src = link;

  attachmentItem.addEventListener('click', ev => {
    const isChat = true;
    showViewierPhoto(ev, isChat);
  });

  parentElement.appendChild(attachmentItem);
}


function createElementImageSidePanelPhotos(link) {

  const sidePanelPhotoItem = document.createElement('div');  
  const sidePanelPhotoLink = document.createElement('a');       
  sidePanelPhotoLink.className = 'photos-item__link'; 
  sidePanelPhotoLink.href = link;
  sidePanelPhotoItem.appendChild(sidePanelPhotoLink);

  const sidePanelPhotoImg = document.createElement('img');       
  sidePanelPhotoImg.className = 'photos-item__pic'; 
  sidePanelPhotoImg.src = link;
  sidePanelPhotoLink.appendChild(sidePanelPhotoImg);

  const sidePanelPhotoOverlay = document.createElement('div');       
  sidePanelPhotoOverlay.className = 'photos-item__overlay'; 
  sidePanelPhotoLink.appendChild(sidePanelPhotoOverlay);  

  sidePanelPhotoOverlay.addEventListener('click', ev => {
    const isChat = false;
    showViewierPhoto(ev, isChat);
  });

  return sidePanelPhotoItem;
}


function addEventListenerAudio(item) {

  item.addEventListener('click', ev => {
    ev.preventDefault();
    
    if (!ev.currentTarget.dataset.startTime) {
      ev.currentTarget.dataset.startTime = 0;
    }
      
    if (ev.currentTarget.classList.contains('audio-item__playstate_play')) {
      player.pause();
    } else {
      player.src = ev.currentTarget.href;
      player.dataset.trackName = ev.currentTarget.name;
      player.currentTime = ev.currentTarget.dataset.startTime;  
      player.play();
      player.controls = true;  

      const audioPlaystate = document.querySelectorAll('.audio-item__playstate');
      
      Array.from(audioPlaystate).forEach(el => {
        el.classList.remove('audio-item__playstate_play');
        el.dataset.startTime = 0;
      });    
    }
  });

  player.addEventListener('playing', ev => {
    const currentTrack = document.querySelector("[name='" + ev.currentTarget.dataset.trackName + "']");
    currentTrack.classList.add('audio-item__playstate_play');
  });

  player.addEventListener('pause', ev => {
    const currentTrack = document.querySelector("[name='" + ev.currentTarget.dataset.trackName + "']");
    currentTrack.classList.remove('audio-item__playstate_play');
    currentTrack.dataset.startTime = ev.currentTarget.currentTime;
  });
}


function addAttacmentsItem(fileType, fileName, link, file) {
  
  const attachmentsItem = document.createElement('div');
  attachmentsItem.className = 'msg-box-attachments__item';
  attachmentsSection.appendChild(attachmentsItem);

  const attachmentsText = document.createElement('div');
  attachmentsText.className = 'msg-box-attachments-item__text';
  attachmentsText.textContent = fileName;
  attachmentsItem.appendChild(attachmentsText);    

  attachments.push({type: fileType, file_name: fileName, link: link, file: file});

  const attachmentsDeleteIcon = document.createElement('div');
  attachmentsDeleteIcon.className = 'msg-box-attachments-item__delete-icon';

  attachmentsDeleteIcon.addEventListener('click', event => {
    const elementRemove = attachments.findIndex(el => {
      return el.file_name == event.target.parentElement.querySelector('.msg-box-attachments-item__text').textContent
    });

    attachments.splice(elementRemove, 1);
    attachmentsSection.removeChild(event.target.parentElement);
    disableSendBtn();
  });

  attachmentsItem.appendChild(attachmentsDeleteIcon);

  disableSendBtn(); 
}

function clearAttacments() {
  attachments.splice(0, attachments.length);
  attachmentsSection.textContent = '';
}


function showViewierPhoto(ev, isChat) {

  const imageViewBox = document.querySelector('.image-view-box');

  ev.preventDefault();
  imageViewBox.classList.add('image-view-box_show');
  imageViewBox.querySelector('.image-view-box-top__pic').src = isChat
  ? ev.currentTarget.src
  : ev.currentTarget.previousElementSibling.src;

  const cloneSidePanelPhotos = sidePanelPhotos.cloneNode(true);
  cloneSidePanelPhotos.classList.remove('shared__content_photos');
  cloneSidePanelPhotos.classList.remove('shared__content');
  cloneSidePanelPhotos.classList.add('image-view-box__bottom');
  imageViewBox.appendChild(cloneSidePanelPhotos);

  const imageViewBoxPhotos = document.querySelectorAll('.image-view-box__bottom .photos__item');
  
  Array.from(imageViewBoxPhotos).forEach(el => {      
    el.classList.remove('photos__item_shared');
    el.classList.add('photos__item_view-box');      
    el.firstElementChild.addEventListener('click', ev => {
      ev.preventDefault();
      imageViewBox.querySelector('.image-view-box-top__pic').src = ev.target.previousElementSibling.src;
    });
  });

  document.querySelector('.image-view-box__closeBtn').addEventListener('click', (ev) => {
    const imageViewBoxPhotosSection = document.querySelector('.image-view-box__bottom');
    imageViewBox.removeChild(imageViewBoxPhotosSection);
    imageViewBox.classList.remove('image-view-box_show');
  });
}  


function disableSendBtn() {
  if (!textInput.value && !attachments.length) {
    submitBtn.disabled = true;
    sendMsgBtn.style.opacity = '0.4';
  } else {
    submitBtn.disabled = false;
    sendMsgBtn.style.opacity = '0.6';
  }
}
  


init();


