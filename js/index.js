'use strict';

const senderId = '10001';  // id пользователя
const connections = {};    // Массив WS-соединений
const attachments = [];    // Массив, содержащий информацию о прикрепленных к сообщению файлах
const videoStreams = [];   // Массив открытых медиапотоков с веб-камеры

const contactSection = document.querySelector('.contacts');                     // HTMLElement списка контактов
const chatHistorySection = document.querySelector('.chat-history');             // HTMLElement истории сообщений
const attachmentsSection = document.querySelector('.message-box__attachments'); // HTMLElement прикрепленных к сообщению файлов
const sidePanel = document.querySelector('.side-panel');                        // HTMLElement боковой панели
const userInfoPanel = document.querySelector('.user-info-panel');               // HTMLElement панели User Info

const sidePanelFiles = document.querySelector('.shared__content_files');        // HTMLElement панели Shared Files
const sidePanelAudio = document.querySelector('.shared__content_audio');        // HTMLElement панели Shared Audio
const sidePanelPhotos = document.querySelector('.shared__content_photos');      // HTMLElement панели Shared Photos

const textInput = document.querySelector('.message-box__input');                // поле ввода сообщения
const submitBtn = document.querySelector('#submitbtn');                         // кнопка отправки сообщения
const sendMsgBtn = document.querySelector('.submit-button');                    // HTMLElement кнопки отправки сообщения
const clipBtn = document.querySelector('#uploadbtn');                           // кнопка прикрепления файла к сообщению
const msgBoxPhotoBtn = document.querySelector('.message-box__photo-button');    // кнопка запуска веб-камеры 
const takePhotoBtn = document.querySelector('.photo-box-app__controls');        // кнопка "сделать фото"

const photoBox = document.querySelector('.photo-box');                          // "окно веб-камеры""
const app = document.querySelector('.photo-box__app');                          // элементы управления в "окне веб-каб=меры"

const presentation = document.querySelector('.image-view-box');                 // просмотрщик файлов изображений

const optionsMenuItems = document.querySelector('.options-menu');               // меню опций

const player = document.querySelector('.audioplayer');                          // аудиопроигрыватель


//Получает данные
//param url - url ресурса
//

function loadData(url) {
  return new Promise((done, fail) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
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


//Отправляет данные 
//param url - url ресурса
//param data - данные в формате json
//

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


//Обновляет данные
//param url - url ресурса
//param data - данные в формате json
//

function updateJSONFile(url, data) {
  sendData(url, data)
    .then(result => {
      console.log(`Файл "${result}" обновлен`)
    })
    .catch(error => {
      console.log(`Ошибка при обновлении файла "${url}": ${error}`);
      rollbackContentContactItems();
    });
}


//Устанавливает соединение по протоколу WebSocket
//param activeContact - HTMLElement из списка контактов
//

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


//Обновляет статус собеседника
//param userId - id собеседника
//param status - новый статус ('Online'/'Offline')
//

function updateStatusActiveContact(userId, status) {
  const activeContact = document.querySelector(`[data-user-id="${userId}"]`);
  activeContact.dataset.status = status;
  const topSectionStatus = document.querySelector('.top-section-text__status');
  topSectionStatus.textContent = status;
  const userInfoPanelStatus = userInfoPanel.querySelector('.user-info-panel__status');
  userInfoPanelStatus.textContent = status;
}


//Инициализирует приложение
//

function init() {

  addEventListenersControlElements();
  
  textInput.addEventListener('input', () => {
    disableSendBtn();
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


//Добавляет обработчики событий для меню опций и элементов скрывающих боковые панели
//
  
function addEventListenersControlElements() {

  sidePanel.addEventListener('click', ev => {
    if (ev.target.classList.contains('shared-head__control-element')) {
      const element = ev.target.parentElement.parentElement.querySelector('.shared__content');
      element.classList.toggle('shared__content_hide');
    }    
  });

    
  const topSectionControlElement = document.querySelector('.top-section__control-element');
  topSectionControlElement.addEventListener('click', () => {
    optionsMenuItems.classList.toggle('options-menu_show');
  });

  const userInfoMenuItem = document.querySelector('.options-menu__item_user-info');
  userInfoMenuItem.addEventListener('click', () => toggleSidePanel(false));

  const sharedFilesMenuItem = document.querySelector('.options-menu__item_shared-files');
  sharedFilesMenuItem.addEventListener('click', () => toggleSidePanel(true));

  const clearHistoryMenuItem = document.querySelector('.options-menu__item_clear-history');
  clearHistoryMenuItem.addEventListener('click', clearHistory);

  msgBoxPhotoBtn.addEventListener('click', clickMsgBoxPhotoBtn);  
}


//Показывает и скрывает инфрмацию о пользователе
//

function toggleSidePanel(isShared) {
  optionsMenuItems.classList.remove('options-menu_show');
  if (isShared) {
    sidePanel.classList.add('side-panel_show');
    userInfoPanel.classList.remove('user-info-panel_show');
  } else {
    sidePanel.classList.remove('side-panel_show');
    userInfoPanel.classList.add('user-info-panel_show');
  }    
}


//Очищает историю переписки с текущим собеседником
//

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
    }
  });

  localStorage.messagesJSON = JSON.stringify(messagesJSON);
  localStorage.contactsJSON = JSON.stringify(contactsJSON);

  updateJSONFile('./contacts.json', JSON.stringify(contactsJSON));
  updateJSONFile('./messages.json', JSON.stringify(messagesJSON));
}


//Обрабатывет событие выбора файла для отправки в сообщении
//param ev - объект события MouseEvent
//

function onSelectFiles(ev) {
  const files = Array.from(ev.target.files);
  files.forEach(file => {
    const fileType = 
    addAttacmentsItem(file.type, file.name, URL.createObjectURL(file));      
  });
}


//Запускает веб-камеру, открывает и обрабатывает медиапоток с веб-камеры
//param ev - объект события MouseEvent
//  

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


//Создает фото с веб-камеры"
//

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


//Останавливает запись с веб-камеры
//

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


//Производит откат текста последнего сообщения в HTMLElement из списка контактов
//

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


//Создает и отображает список контактов (в левой части окна браузера)
//

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


//Добавляет обработчики событий на HTMLElement-ы из списка контактов
//

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


//Инициализирует чат
//param activeContact - выбранный HTMLElement из списка контактов
//

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

  const name = userInfoPanel.querySelector('.user-info-panel__name');
  name.textContent = activeContact.querySelector('.contact-item-text__name').textContent;

  loadData('./messages.json')
    .then(result => {      
      localStorage.messagesJSON = result;
      createChatHistory(activeContact);
    });        
}


//Выводит историю переписки
//param activeContact - выбранный HTMLElement из списка контактов
//

function createChatHistory(activeContact) {

  const status = userInfoPanel.querySelector('.user-info-panel__status');
  status.textContent = activeContact.dataset.status;

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

  scrollDown();

  setConnectionWS(activeContact);
}


//Отправляет сообщение из текстового поля и прикрепленные файлы собеседнику
//param ev - объект события MouseEvent
//

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


//Обработчик события получения сообщения по WS-соединению
//param ev - объект события ...
//param userId - id собеседника
//

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


//Добавляет в чат сообщение 
//param otherUserId - id собеседника
//param avatarPicture - ссылка на изображение аватара собеседника
//param messageSenderId - id отправителя сообщения
//param timestamp - время сообщения в миллисекундах
//param messageText - текст сообщения
//param attachmentsMessage - массив файлов, прикрепленных к сообщению
//

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
} 


//Добавляет сообщение в массив сообщений в localStorage
//param otherUserId - id собеседника
//param messageSenderId - id отправителя сообщения
//param timestamp - время сообщения в миллисекундах
//param messageText - текст сообщения
//

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
  });

  scrollDown();

  localStorage.messagesJSON = JSON.stringify(messagesJSON);
  // localStorage.contactsJSON = JSON.stringify(contactsJSON);
}


//Автоматически скроллит чат
//

function scrollDown() {
  const timerId = setInterval(() => {chatHistorySection.scrollTop += 500}, 10);    
  setTimeout(() => clearInterval(timerId), 500);
}


//Отправляет прикрепленные к сообщению файлы
//param attachment - объект из массива прикрепленных к сообщению файлов
//

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
          console.log(`Ошибка при отправке на сервер файла "${attachment.file_name}": ${xhr.statusText}.`);
          return 1;
        }

      });

      xhr.send(attachment);

    } else {
      console.log(`Ошибка при создании файла "${attachment.file_name}": ${xhr.statusText}.`);
    }
  });
  
  xhr.send();
}


//Добавляет текст сообщения в HTMLElement чата
//param parentElement - HTMLElement, в который будет помещен созданный элемент
//param text - текст сообщения
//

function addElementText(parentElement, text) {
  const messageText = document.createElement('div');
  messageText.className = 'ch-msg-cnt__text';
  messageText.textContent = text;
  parentElement.appendChild(messageText);
}


//Добавляет файл в HTMLElement чата и на боковую панель
//param parentElement - HTMLElement, в который будет помещен созданный элемент
//param ref - ссылка на файл
//param fileName - имя файла
//

function addElementFile(parentElement, ref, fileName) {
  const itemChat = createElementFile(ref, fileName);
  itemChat.className = 'files__item files__item_chat';
  parentElement.appendChild(itemChat);
  const itemShared = createElementFile(ref, fileName);
  itemShared.className = 'files__item files__item_shared';
  sidePanelFiles.appendChild(itemShared);
}   


//Добавляет аудиофайл в HTMLElement чата и на боковую панель
//param parentElement - HTMLElement, в который будет помещен созданный элемент
//param ref - ссылка на аудиофайл
//param fileName - имя аудиофайла
//param key = ключ для обозначения уникальности аудиофайлов в окне браузера
//

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


//Добавляет файл изображения в HTMLElement чата и на боковую панель
//param parentElement - HTMLElement, в который будет помещен созданный элемент
//param ref - ссылка на файл изображения
//

function addElementImage(parentElement, ref) {  
  createElementImageChat(parentElement, ref);    
  const itemShared = createElementImageSidePanel(ref);
  itemShared.className = 'photos__item photos__item_shared'; 
  sidePanelPhotos.appendChild(itemShared);
} 


//Создает HTMLElement для файла в чат
//param ref - ссылка на файл
//param fileName - имя файла
//return item - созданный HTMLElement
//

function createElementFile(ref, fileName) {

  const item = document.createElement('div');   
  const icon = document.createElement('div');
  icon.className = 'files-item__icon';
  item.appendChild(icon);

  const refEl = document.createElement('a');
  refEl.className = 'files-item__title';
  refEl.setAttribute('download', '');
  refEl.href = ref;
  refEl.textContent = fileName;
  item.appendChild(refEl);

  return item;
}


//Создает HTMLElement для аудиофайла в чат
//param ref - ссылка на аудиофайл
//param fileName - имя аудиофайла
//return item - созданный HTMLElement
//

function createElementAudio(ref, fileName) {

  const item = document.createElement('div');             
  const playBtn = document.createElement('div');
  playBtn.className = 'audio-item__play-button';   
  item.appendChild(playBtn);

  const refEl = document.createElement('a');
  refEl.className = 'audio-item__playstate'; 
  refEl.href = ref;

  addEventListenerAudio(refEl);

  item.appendChild(refEl);

  const title = document.createElement('div');
  title.className = 'audio-item__title'; 
  title.textContent = fileName;
  item.appendChild(title);

  return item;
}  


//Создает HTMLElement для файла изображения в чат
//param parentElement - HTMLElement, в который будет помещен созданный элемент
//param ref - ссылка на файл изображения
//

function createElementImageChat(parentElement, ref) {
  
  const item = document.createElement('img');       
  item.className = 'photo__item'; 
  item.classList.add('photo__item_chat')
  item.src = ref;

  item.addEventListener('click', ev => {
    const isChat = true;
    showViewierPhoto(ev, isChat);
  });

  parentElement.appendChild(item);
}


//Создает HTMLElement для файла изображения на боковую панель
//param ref - ссылка на файл изображения
//return item - созданный HTMLElement
//

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


//Добавляет обработчик события на кнопку воспроизведения аудиофайла
//param item - HTMLElement кнопки
//

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


//Добавляет в массив информацию о прикрепленном к сообщению файле
//fileType - тип файла
//fileName - имя файла
//param ref - ссылка на файл
//

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
    
    attachments.splice(removeElement, 1);
    attachmentsSection.removeChild(ev.target.parentElement);
    disableSendBtn();
  });

  item.appendChild(deleteBtn);

  disableSendBtn(); 
}


//Очищает массив прикрепленных к сообщению файлов
//

function clearAttacments() {
  attachments.splice(0, attachments.length);
  attachmentsSection.textContent = '';
}


//Отображает просмотрщик файлов изображений
//ev - объект события MouseEvent
//isChat - чат или боковая панель
//

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


//Блокирует/разблокирует кнопку отправки сообщений
//

function disableSendBtn() {
  if (!textInput.value && !attachments.length) {
    submitBtn.disabled = true;
    sendMsgBtn.classList.remove('submit-button_unlock');
  } else {
    submitBtn.disabled = false;
    sendMsgBtn.classList.add('submit-button_unlock');
  }
}
  

//Запускает приложение
//

init();


