'use strict';

const senderId = '10001';
const connections = {};
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

const presentation = document.querySelector('.image-view-box');

const optionsMenuItems = document.querySelector('.options-menu');

const player = document.querySelector('.audioplayer');


function loadData(url) {
  return new Promise((done, fail) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.addEventListener('error', e => fail(xhr));
    xhr.addEventListener('load', e => {
      if (200 <= xhr.status && xhr.status < 300) {
        done(xhr.responseText);
        return;        
      }
      fail(xhr.statusText);
    });
    xhr.send();
  });
}


function sendData(url, data) {
  return new Promise((done, fail) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('error', e => fail(xhr));
    xhr.addEventListener('load', e => {
      if (200 <= xhr.status && xhr.status < 300) {
        done(url);
        return;        
      }
      fail(xhr.statusText);
    });
    xhr.send(data);
  });
}


function updateJSONFile(url, file) {
  sendData(url, file)
    .then(result => {
      console.log(`Файл "${result}" обновлен`)
    })
    .catch(error => {
      console.log(`Ошибка  при обновлении файла "${url}": ${error}`);
      rollbackContentContactItems();
    });
}


function setConnectionWS(activeContact) {

  // const userId = activeContact.dataset.userId;

  const userId = '13071';

  if (activeContact.dataset.userId == userId && !connections[userId]) {
    const connection = new WebSocket(`wss://neto-api.herokuapp.com/chat`);
    connections[userId] = connection;

    connections[userId].addEventListener('open', ev => {  
      updateStatusActiveContact(userId, 'Online');
    });

    connections[userId].addEventListener('message', ev => receiveMessage(ev, userId));

    connections[userId].addEventListener('close', ev => {  
      updateStatusActiveContact(userId, 'Offline'); 
      connections[userId] = '';
    }); 
  }  
}


function updateStatusActiveContact(userId, status) {
  const activeContact = document.querySelector(`[data-user-id="${userId}"]`);
  const topSectionStatus = document.querySelector('.top-section-text__status');
  topSectionStatus.textContent = status;
  activeContact.dataset.status = status;
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

  takePhotoBtn.addEventListener('click', takePhoto);

  submitBtn.addEventListener('click', sendMessage);

  const presentationCloseBtn = document.querySelector('.image-view-box__closeBtn');
  presentationCloseBtn.addEventListener('click', ev => {
    const presentationPhotosList = document.querySelector('.image-view-box__bottom');
    presentation.removeChild(presentationPhotosList);
    presentation.classList.remove('image-view-box_show');
  });

  loadData('./contacts.json')
    .then(result => {
      localStorage.contactsJSON = result;    
      createContactsSection();
      const activeContact = document.querySelector('.contacts__item');
      createChatHistoryInit(activeContact);             
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
  userInfoMenuItem.addEventListener('click', () => toggleSidePanel('none', 'block'));

  const sharedFilesMenuItem = document.querySelector('.options-menu__item_shared-files');
  sharedFilesMenuItem.addEventListener('click', () => toggleSidePanel('block', 'none'));

  const clearHistoryMenuItem = document.querySelector('.options-menu__item_clear-history');
  clearHistoryMenuItem.addEventListener('click', clearHistory);

  msgBoxPhotoBtn.addEventListener('click', clickMsgBoxPhotoBtn);  
}


function toggleSidePanel(sharedPanelStyle, userInfoPanelStyle) {
  optionsMenuItems.classList.remove('options-menu_show');
  sidePanel.style.display = sharedPanelStyle;
  userInfoPanel.style.display = userInfoPanelStyle; 
}


function clearHistory() {

  const messagesJSON = JSON.parse(localStorage.messagesJSON);        
  const contactsJSON = JSON.parse(localStorage.contactsJSON);        

  optionsMenuItems.classList.remove('options-menu_show');  

  player.pause();
  player.controls = false;  

  chatHistorySection.textContent = '';
  sidePanelFiles.textContent = '';
  sidePanelAudio.textContent = '';
  sidePanelPhotos.textContent = '';   

  const lastMessage = document.querySelector('.contacts__item_active  .contact-item-text__message')
  lastMessage.textContent = '';
 
  const otherUserId = document.querySelector('.contacts__item_active').dataset.userId;
  
  messagesJSON.users.forEach(el => {
    if (el.other_user_id == otherUserId) {
      el.messages.splice(0, el.messages.length);
    }
  });
  
  contactsJSON.contacts.forEach(el => {
    if (el.user_id == otherUserId) {        
      el.last_message = {snippet:'', message_sender_id:'', timestamp_precise:''};
    return;
    }
  });

  localStorage.messagesJSON = JSON.stringify(messagesJSON);
  localStorage.contactsJSON = JSON.stringify(contactsJSON);

  updateJSONFile('./contacts.json', JSON.stringify(contactsJSON));
  updateJSONFile('./messages.json', JSON.stringify(messagesJSON));
}


function onSelectFiles(ev) {
  const files = Array.from(ev.target.files);
  files.forEach(file => {
    const fileType = 
    addAttacmentsItem(file.type, file.name, URL.createObjectURL(file));      
  });
}
  

function clickMsgBoxPhotoBtn(ev) {
  
  ev.preventDefault();
  photoBox.classList.add('photo-box_show');

  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(stream => {

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

  msgBoxPhotoBtn.removeEventListener('click', clickMsgBoxPhotoBtn);
}


function takePhoto() {  
  
  const video = document.createElement('video');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d'); 

  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(stream => {  
      video.src = URL.createObjectURL(stream);
      videoStreams.push(stream);

      video.addEventListener('canplay', () => {
        setTimeout(() => {          
          
          const fragment = document.createDocumentFragment();          

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);  

          const urlBlob = canvas.toDataURL();  

          const photo = document.createElement('div'); 
          photo.className = 'photo-box-app__photo';
          fragment.appendChild(photo);

          const img = document.createElement('img'); 
          img.style.height = '291px';         
          img.src = urlBlob;
                  
          photo.appendChild(img); 

          const cancelBtn = document.createElement('div');
          cancelBtn.className = 'photo-box-app__cancelBtn';
          cancelBtn.addEventListener('click', ev => {
            ev.currentTarget.parentElement.parentElement.removeChild(ev.currentTarget.parentElement);
            document.querySelector('video').style.display = 'block';
            takePhotoBtn.style.display = 'block';
          });
          photo.appendChild(cancelBtn);           

          const okBtn = document.createElement('div');
          okBtn.className = 'photo-box-app__okBtn';
          okBtn.addEventListener('click', () => {
            const chatItems = document.querySelectorAll('.photo__item_chat');
            const attachmentsItems = document.querySelectorAll('.msg-box-attachments__item');
            const index = chatItems.length + Array.from(attachmentsItems).filter(el => el.textContent.search(/.png/) > 0).length  + 1;
            const filetype = 'image/png';            
            const fileName = `image${index}.png`;

            addAttacmentsItem(filetype, fileName, urlBlob);  
   
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
  
  videoStreams.forEach(el => {
    el.getVideoTracks().map(track => track.stop());
  });

  const photo = app.querySelector('.photo-box-app__photo');
  
  if (photo) {
    photo.parentElement.removeChild(photo);
  }

  app.removeChild(document.querySelector('video'));
  photoBox.removeChild(document.querySelector('.photo-box__closeBtn'));

  msgBoxPhotoBtn.addEventListener('click', clickMsgBoxPhotoBtn);
}


function rollbackContentContactItems() {

  const contactsJSON = JSON.parse(localStorage.contactsJSONInit);
  localStorage.contactsJSON = JSON.stringify(contactsJSON);

  contactsJSON.contacts.forEach(el => {
    const lastMessageItem = document.querySelector(`[data-user-id="${el.user_id}"] .contacts-item__text .contact-item-text__message`);
    lastMessageItem.textContent = el.last_message.message_sender_id == el.user_id
    ? el.last_message.snippet 
    : `You: ${el.last_message.snippet}`;  
  });
}


function createContactsSection() {

  const contactsJSON = JSON.parse(localStorage.contactsJSON);

  const fragment = contactsJSON.contacts.reduce((memo, el) => {   
    const item = document.createElement('div');
    item.className = 'contacts__item'; 
    item.dataset.status = el.status;
    item.dataset.userId = el.user_id;

    const avatar = document.createElement('div');
    avatar.className = 'contacts-item__avatar';
    item.appendChild(avatar);    

    const img = document.createElement('img');
    img.className = 'avatar__pic';  
    img.src = el.avatar_pic_link;   
    avatar.appendChild(img); 

    const wrap = document.createElement('div');
    wrap.className = 'contacts-item__text';
    item.appendChild(wrap); 

    const name = document.createElement('div');
    name.className = 'contact-item-text__name';
    name.textContent = el.user_name;
    wrap.appendChild(name);

    const lastMessage = document.createElement('div');
    lastMessage.className = 'contact-item-text__message';

    if (el.last_message.snippet) {
      lastMessage.textContent = el.last_message.message_sender_id == el.user_id
      ? el.last_message.snippet 
      : `You: ${el.last_message.snippet}`;
    }      

    wrap.appendChild(lastMessage);     
    memo.appendChild(item);
    return memo;
    }, document.createDocumentFragment());   

  contactSection.appendChild(fragment); 

  addEventListenersContactItems();
}


function addEventListenersContactItems() {
  const contactItems = document.querySelectorAll('.contacts__item');

  Array.from(contactItems).forEach(el => {
    el.addEventListener('click', ev => {
      const messagesJSON = JSON.parse(localStorage.messagesJSON);        
      const contactsJSON = JSON.parse(localStorage.contactsJSON);      
      updateJSONFile('./contacts.json', JSON.stringify(contactsJSON));      
      updateJSONFile('./messages.json', JSON.stringify(messagesJSON));      
      const activeContact = ev.currentTarget;
      createChatHistoryInit(activeContact);
    });
  }); 
}


function createChatHistoryInit(activeContact) {

  const contactsJSON = JSON.parse(localStorage.contactsJSON);
  localStorage.contactsJSONInit = localStorage.contactsJSON;

  const contactItems = document.querySelectorAll('.contacts__item');
  Array.from(contactItems).forEach(el => {el.classList.remove('contacts__item_active')});
  activeContact.classList.add('contacts__item_active');

  chatHistorySection.textContent = '';
  sidePanelFiles.textContent = '';
  sidePanelAudio.textContent = '';
  sidePanelPhotos.textContent = '';
  clearAttacments();

  const topSectionTextName = document.querySelector('.top-section-text__name');
  topSectionTextName.textContent = activeContact.querySelector('.contact-item-text__name').textContent;
  const topSectionStatus = document.querySelector('.top-section-text__status');
  topSectionStatus.textContent = activeContact.dataset.status;

  const avatar = userInfoPanel.querySelector('.avatar__pic');
  avatar.src = activeContact.querySelector('.avatar__pic').src;

  const name = userInfoPanel.querySelector('.user-info-section__name');
  name.textContent = activeContact.querySelector('.contact-item-text__name').textContent;

  const status = userInfoPanel.querySelector('.user-info-section__status');
  status.textContent = activeContact.dataset.status;

  loadData('./messages.json')
    .then(result => {      
      localStorage.messagesJSON = result;
      createChatHistory(activeContact);
    });        
}


function createChatHistory(activeContact) {

  const messagesJSON = JSON.parse(localStorage.messagesJSON);

  const userMessages = messagesJSON.users.find(el => el.other_user_id == activeContact.dataset.userId);

  if (userMessages) {    
    userMessages.messages.forEach(el => {        
      const otherUserId = userMessages.other_user_id;      
      const avatarPic = activeContact.querySelector('img').src;
      const messageSenderId = el.message_sender_id;
      const timestamp = el.timestamp_precise;
      const messageText = el.message_text;
      const attachmentsMessage = el.attachments;      
      addMessageChat(otherUserId, avatarPic, messageSenderId, timestamp, messageText, attachmentsMessage);  
    }); 
   
  }    

  setConnectionWS(activeContact);
}


function sendMessage(ev) {

  ev.preventDefault();
  const activeContact = document.querySelector('.contacts__item_active');
  const audioItemsChat = document.querySelectorAll('.audio__item_chat .audio-item__playstate');

  const otherUserId = activeContact.dataset.userId;      
  const avatar = '';
  const messageSenderId = senderId;
  const timestamp = Date.now();
  const messageText = textInput.value;
  const attachmentsMessage = attachments; 

  addMessageChat(otherUserId, avatar, messageSenderId, timestamp, messageText, attachmentsMessage);

  const messageTextFragment = messageText.length > 20
  ? `You: ${messageText.substr(0, 20)}...`
  : `You: ${messageText}`;

  activeContact.querySelector('.contact-item-text__message').textContent = messageTextFragment;
  
  textInput.value = '';

  submitBtn.disabled = true;
  
  addMessageLocalStorage(otherUserId, messageSenderId, timestamp, messageText);
  
  clearAttacments();
  
  disableSendBtn(); 

  if (connections[otherUserId]) {
    connections[otherUserId].send(messageText);
  }  
}


function receiveMessage(ev, userId) {

  const activeContact = document.querySelector(`[data-user-id="${userId}"]`);

  if (ev.data == '...') {    
    activeContact.querySelector('.contact-item-text__message').textContent = 'typing...';
  } else {

    const otherUserId = activeContact.dataset.userId;      
    const avatar = activeContact.querySelector('.avatar__pic').src;
    const messageSenderId = otherUserId;
    const timestamp = String(Date.now());
    const messageText = ev.data;
    const attachmentsMessage = [];

    addMessageChat(otherUserId, avatar, messageSenderId, timestamp, messageText, attachmentsMessage);

    const messageTextFragment = messageText.length > 20
    ? `${messageText.substr(0, 20)}...`
    : messageText;

    activeContact.querySelector('.contact-item-text__message').textContent = messageTextFragment;    
    
    addMessageLocalStorage(otherUserId, messageSenderId, timestamp, messageText);
  } 
}


function addMessageChat(otherUserId, avatarPicture, messageSenderId, timestamp, messageText, attachmentsMessage) {

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
    attachmentsMessage.forEach((el, index) => { 

      if (el.type.search(/audio/) != -1) {
        const chatItems = document.querySelectorAll('.audio__item_chat');
        const key = chatItems.length + index + 1;
        addElementAudio(attachment, el.link, el.file_name, key);                 
      } else if (el.type.search(/image/) != -1) {
        addElementImage(attachment, el.link);
      } else {   
        addElementFile(attachment, el.link, el.file_name);
      }

    });          
  }  

  chatHistorySection.appendChild(message);
  chatHistorySection.scrollTop = 9999;
} 


function addMessageLocalStorage(otherUserId, messageSenderId, timestamp, messageText) {
  
  const messagesJSON = JSON.parse(localStorage.messagesJSON);
  const contactsJSON = JSON.parse(localStorage.contactsJSON);  

  const message = {};

  messagesJSON.users.forEach(el => {
    if (el.other_user_id == otherUserId) {
      message.message_sender_id = messageSenderId;
      message.timestamp_precise = timestamp;
      message.message_text = messageText;
      message.attachments = [];

      if (attachments.length) {
        const attachmentMessage = attachments.forEach(element => {
          const statusSend = sendAttacment(element);
          if (!statusSend) {
            message.attachments.push({type: element.type, file_name: element.file_name, link: `./files/${element.file_name}`});
          }
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
      el.status = document.querySelector('.contacts__item_active').dataset.status;
    }
    
    return el;
  });

  localStorage.messagesJSON = JSON.stringify(messagesJSON);
  // localStorage.contactsJSON = JSON.stringify(contactsJSON);
}


function sendAttacment(attachment) {
  const xhr = new XMLHttpRequest();
  const urlBlob = attachment.link;
  xhr.open('GET', urlBlob);
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {              
      console.log(`Файл "${attachment.file_name}" создан.`);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', './files');
      xhr.addEventListener('load', () => {

        if (xhr.status === 200) {
          console.log(`Файл "${attachment.file_name}" успешно передан.`);
          return 0;          
        } else {
          console.log(`Ошибка при отправке на сервер файла "${attachment.file_name}: ${xhr.statusText}".`);
          return 1;
        }

      });

      xhr.send(attachment);

    } else {
      console.log(`Ошибка при создании файла "${attachment.file_name} ${xhr.statusText}".`);
    }
  });
  
  xhr.send();
}


function addElementText(parentElement, text) {
  const messageText = document.createElement('div');
  messageText.className = 'ch-msg-cnt__text';
  messageText.textContent = text;
  parentElement.appendChild(messageText);
}


function addElementFile(parentElement, ref, fileName) {
  const itemChat = createElementFile(ref, fileName);
  itemChat.className = 'files__item files__item_chat';
  parentElement.appendChild(itemChat);
  const itemShared = createElementFile(ref, fileName);
  itemShared.className = 'files__item files__item_shared';
  sidePanelFiles.appendChild(itemShared);
}   


function addElementAudio(parentElement, ref, fileName, key) {
  const itemChat = createElementAudio(ref, fileName, key); 
  itemChat.className = 'audio__item audio__item_chat';
  itemChat.querySelector('.audio-item__playstate').dataset.key = key;
  parentElement.appendChild(itemChat); 
  const itemShared = createElementAudio(ref, fileName, key); 
  itemShared.className = 'audio__item audio__item_shared';  
  itemShared.querySelector('.audio-item__playstate').dataset.key = `${key}-s`;  
  sidePanelAudio.appendChild(itemShared);
}


function addElementImage(parentElement, ref) {  
  createElementImageChat(parentElement, ref);    
  const itemShared = createElementImageSidePanel(ref);
  itemShared.className = 'photos__item photos__item_shared'; 
  sidePanelPhotos.appendChild(itemShared);
} 


function createElementFile(ref, fileName) {

  const attachmentItem = document.createElement('div');   
  const icon = document.createElement('div');
  icon.className = 'files-item__icon';
  attachmentItem.appendChild(icon);

  const refEl = document.createElement('a');
  refEl.className = 'files-item__title';
  refEl.setAttribute('download', '');
  refEl.href = ref;
  refEl.textContent = fileName;
  attachmentItem.appendChild(refEl);

  return attachmentItem;
}


function createElementAudio(ref, fileName) {

  const attachmentItem = document.createElement('div');             
  const playBtn = document.createElement('div');
  playBtn.className = 'audio-item__play-button';   
  attachmentItem.appendChild(playBtn);

  const refEl = document.createElement('a');
  refEl.className = 'audio-item__playstate'; 
  refEl.href = ref;

  addEventListenerAudio(refEl);

  attachmentItem.appendChild(refEl);

  const title = document.createElement('div');
  title.className = 'audio-item__title'; 
  title.textContent = fileName;
  attachmentItem.appendChild(title);

  return attachmentItem;
}  


function createElementImageChat(parentElement, ref) {
  
  const attachmentItem = document.createElement('img');       
  attachmentItem.className = 'photo__item'; 
  attachmentItem.classList.add('photo__item_chat')
  attachmentItem.src = ref;

  attachmentItem.addEventListener('click', ev => {
    const isChat = true;
    showViewierPhoto(ev, isChat);
  });

  parentElement.appendChild(attachmentItem);
}


function createElementImageSidePanel(ref) {

  const item = document.createElement('div');  
  const link = document.createElement('a');       
  link.className = 'photos-item__link'; 
  link.href = ref;
  item.appendChild(link);

  const img = document.createElement('img');       
  img.className = 'photos-item__pic'; 
  img.src = ref;
  link.appendChild(img);

  const overlay = document.createElement('div');       
  overlay.className = 'photos-item__overlay'; 
  link.appendChild(overlay);  

  overlay.addEventListener('click', ev => {
    const isChat = false;
    showViewierPhoto(ev, isChat);
  });

  return item;
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
      player.dataset.trackName = ev.currentTarget.dataset.key;
      player.currentTime = ev.currentTarget.dataset.startTime;  
      player.play();
      player.controls = true;  

      const playBtns = document.querySelectorAll('.audio-item__playstate');
      
      Array.from(playBtns).forEach(el => {
        el.classList.remove('audio-item__playstate_play');
        el.dataset.startTime = 0;
      });    
    }
  });

  player.addEventListener('playing', ev => {
    const currentTrack = document.querySelector(`[data-key="${ev.currentTarget.dataset.trackName}"]`);
    currentTrack.classList.add('audio-item__playstate_play');
  });

  player.addEventListener('pause', ev => {
    const currentTrack = document.querySelector(`[data-key="${ev.currentTarget.dataset.trackName}"]`);
    currentTrack.classList.remove('audio-item__playstate_play');
    currentTrack.dataset.startTime = ev.currentTarget.currentTime;
  });
}


function addAttacmentsItem(fileType, fileName, ref) {
  
  const item = document.createElement('div');
  item.className = 'msg-box-attachments__item';
  attachmentsSection.appendChild(item);

  const title = document.createElement('div');
  title.className = 'msg-box-attachments-item__text';
  title.textContent = fileName;
  item.appendChild(title);    

  attachments.push({type: fileType, file_name: fileName, link: ref});

  const deleteBtn = document.createElement('div');
  deleteBtn.className = 'msg-box-attachments-item__delete-icon';

  deleteBtn.addEventListener('click', ev => {
    const removeElement = attachments.findIndex(el => {
      return el.file_name == ev.target.parentElement.querySelector('.msg-box-attachments-item__text').textContent
    });
    URL.revokeDataURL(attachments[removeElement].link);
    attachments.splice(removeElement, 1);
    attachmentsSection.removeChild(ev.target.parentElement);
    disableSendBtn();
  });

  item.appendChild(deleteBtn);

  disableSendBtn(); 
}


function clearAttacments() {
  attachments.splice(0, attachments.length);
  attachmentsSection.textContent = '';
}


function showViewierPhoto(ev, isChat) {

  ev.preventDefault();
  presentation.classList.add('image-view-box_show');
  presentation.querySelector('.image-view-box-top__pic').src = isChat
  ? ev.currentTarget.src
  : ev.currentTarget.previousElementSibling.src;

  const photos = sidePanelPhotos.cloneNode(true);
  photos.classList.remove('shared__content_photos');
  photos.classList.remove('shared__content');
  photos.classList.add('image-view-box__bottom');
  presentation.appendChild(photos);

  const photoList = document.querySelectorAll('.image-view-box__bottom .photos__item');
  
  Array.from(photoList).forEach(el => {      
    el.classList.remove('photos__item_shared');
    el.classList.add('photos__item_view-box');      
    el.firstElementChild.addEventListener('click', ev => {
      ev.preventDefault();
      presentation.querySelector('.image-view-box-top__pic').src = ev.target.previousElementSibling.src;
    });
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


