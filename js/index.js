'use strict';

const senderId = '10001';     // id пользователя
const connections = {};    		// Массив WS-соединений
const attachmentsInfo = [];   // Массив c информацией о прикрепленных к сообщению файлах
let videoStream = '';         // Медиапоток с веб-камеры

const contactList = document.querySelector('.contacts');                        // HTMLElement списка контактов
const chatHistory = document.querySelector('.chat__history');                    // HTMLElement истории сообщений
const attachments = document.querySelector('.message-box__attachments');        // HTMLElement прикрепленных к сообщению файлов
const sharedPanel = document.querySelector('.side-panel');                      // HTMLElement боковой панели
const userInfoPanel = document.querySelector('.user-info-panel');               // HTMLElement панели User Info

const sidePanelFiles = document.querySelector('.shared__content_files');        // HTMLElement панели Shared Files
const sidePanelAudio = document.querySelector('.shared__content_audio');        // HTMLElement панели Shared Audio
const sidePanelPhotos = document.querySelector('.shared__content_photos');      // HTMLElement панели Shared Photos

const textInput = document.querySelector('.message-box__input');                // поле ввода сообщения
const submitBtn = document.querySelector('#submitbtn');                         // кнопка отправки сообщения
const sendMsgBtn = document.querySelector('.submit-button');                    // тег Label для связи с кнопкой отправки сообщения
const clipBtn = document.querySelector('#uploadbtn');                           // кнопка прикрепления файла к сообщению
const msgBoxPhotoBtn = document.querySelector('#photobtn');                     // кнопка запуска видеорекордера 
const photoBtn = document.querySelector('.photo-button');                       // тег Label для связи с кнопкой запуска видеорекордера


const videorecorder = document.querySelector('.videorecorder');                 // видеорекордер
const wrapVideo = document.querySelector('.videorecorder-app__video');          // оборачивающий тег для элементов видео
const video = document.querySelector('.app__video');                            // тег video
const takePhotoBtn = document.querySelector('.app__controls');                  // кнопка "снять фото"
const canvas = document.querySelector('.app-photo__canvas');                    // тег canvas
const ctx = canvas.getContext('2d');                                            // контекст canvas
const wrapPhoto = document.querySelector('.videorecorder-app__photo');          // оборачивающий тег для элементов фото
const photo = document.querySelector('.app-photo__img');                        // фото
const cancelBtn = document.querySelector('.app-photo__cancelBtn');              // кнопка отмена
const okBtn = document.querySelector('.app-photo__okBtn');                      // кнопка ok
const closeBtnPhotoBox = document.querySelector('.videorecorder__closeBtn');    // кнопка закрытия окна видеорекордера

const presenter = document.querySelector('.presenter');                         // просмотрщик изображений

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
      clearLastMessage();
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

  const topSectionStatus = document.querySelector('.top-text__status');
  topSectionStatus.textContent = status;

  const userInfoPanelStatus = userInfoPanel.querySelector('.user-info-panel__status');
  userInfoPanelStatus.textContent = status;
}


//Инициализирует приложение
//

function init() {

  addEventListenersControls();
  
  textInput.addEventListener('input', () => disableSendBtn());

  clipBtn.addEventListener('change', onSelectFiles);  

  takePhotoBtn.addEventListener('click', takePhoto);

  submitBtn.addEventListener('click', sendMessage);

  closeBtnPhotoBox.addEventListener('click', closePhotoBox);

  chatHistory.addEventListener('click', ev => clickMedia(ev));  

  sharedPanel.addEventListener('click', ev => clickMedia(ev));

  presenter.addEventListener('click', ev => {
  	if (ev.target.classList.contains('photo-item__img')) {
	    presenter.querySelector('.presenter-top__pic').src = ev.target.src;
  	}	    
	});

	const presenterCloseBtn = document.querySelector('.presenter__closeBtn');
  presenterCloseBtn.addEventListener('click', ev => {
    const node = document.querySelector('.presenter__bottom');
    presenter.removeChild(node);
    presenter.classList.remove('presenter_show');
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

  loadData('./contacts.json')
    .then(result => {
      localStorage.contactsJSON = result;    
      createContactsSection();
      const activeContact = document.querySelector('.contacts__item');
      createChatHistoryInit(activeContact);             
    });
}


//Обработчик клика по фото или кнопке play
//

function clickMedia(ev) {

	if (ev.target.classList.contains('photo-item__img')) {
  	showViewierPhoto(ev);
	}   
	if (ev.target.classList.contains('audio-item__playstate')) {
  	playAudio(ev);
	} 
}


//Добавляет обработчики событий для меню опций и элементов скрывающих боковые панели
//
  
function addEventListenersControls() {

  sharedPanel.addEventListener('click', ev => {
    if (ev.target.classList.contains('shared-head__control')) {
      const element = ev.currentTarget.querySelector(`[data-testid="${ev.target.dataset.testId}"]`);
      element.classList.toggle('shared__content_hide');
    }    
  });
    
  const topSectionControlElement = document.querySelector('.top__control');
  topSectionControlElement.addEventListener('click', () => {
    optionsMenuItems.classList.toggle('options-menu_show');
  });

  optionsMenuItems.addEventListener('click', addEventListenerMenuItem);

  msgBoxPhotoBtn.addEventListener('click', clickMsgBoxPhotoBtn);  

  cancelBtn.addEventListener('click', ev => {
	  photo.src = '';
	  wrapPhoto.classList.add('videorecorder-app__photo_hide');
	  wrapVideo.classList.remove('videorecorder-app__video_hide');
	});

	okBtn.addEventListener('click', () => {
	  const chatItems = document.querySelectorAll('.photo__item_chat');
	  const attachmentsItems = document.querySelectorAll('.msg-box-attachments__item');
	  const index = chatItems.length + Array.from(attachmentsItems).filter(el => el.textContent.search(/.png/) > 0).length  + 1;
	  const filetype = 'image/png';            
	  const fileName = `image${index}.png`;
	  const urlBlob = photo.src;

	  addAttacment(filetype, fileName, urlBlob);  

	  closePhotoBox();              
	}); 
}


//Обработчик события 'click' для элементов меню 
//param ev - объект события MouseEvent
//

function addEventListenerMenuItem(ev) {

	optionsMenuItems.classList.remove('options-menu_show');
	
	if (ev.target.classList.contains('options-menu__item_user-info')) {
		sharedPanel.classList.remove('side-panel_show');
  	userInfoPanel.classList.add('user-info-panel_show');  		
	}

	if (ev.target.classList.contains('options-menu__item_shared-files')) {
		sharedPanel.classList.add('side-panel_show');
  	userInfoPanel.classList.remove('user-info-panel_show');
	}

	if (ev.target.classList.contains('options-menu__item_clear-history')) {
		clearHistory();
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

  chatHistory.textContent = '';
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
  files.forEach(file => addAttacment(file.type, file.name, URL.createObjectURL(file)));
}


//Запускает веб-камеру, открывает и обрабатывает медиапоток с веб-камеры
//param ev - объект события MouseEvent
//  

function clickMsgBoxPhotoBtn(ev) {
  
  ev.preventDefault();
  videorecorder.classList.add('videorecorder_show');

  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(stream => {      
      video.src = URL.createObjectURL(stream);     
      videoStream = stream;
    });

  msgBoxPhotoBtn.disabled = true;
  photoBtn.classList.remove('photo-button_unlock');
}


// Создает снимок с веб-камеры
//

function takePhoto() {  

	canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  canvas.toBlob(blob => {
  	photo.src = URL.createObjectURL(blob);
  });
  wrapPhoto.classList.remove('videorecorder-app__photo_hide');
  wrapVideo.classList.add('videorecorder-app__video_hide');
}


//Останавливает запись с веб-камеры
//

function closePhotoBox() {

  videorecorder.classList.remove('videorecorder_show');
  
  videoStream.getVideoTracks().map(track => track.stop());

  URL.revokeObjectURL(video.src);

  photo.src = '';
  wrapPhoto.classList.add('videorecorder-app__photo_hide');
  wrapVideo.classList.remove('videorecorder-app__video_hide');

  msgBoxPhotoBtn.disabled = false;
  photoBtn.classList.add('photo-button_unlock');
}


//Удаляет текст последнего сообщения в списке контактов
//

function clearLastMessage() {

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

  contactList.appendChild(fragment); 

  addEventListenersContactItems();
}


//Добавляет обработчики событий на HTMLElement-ы из списка контактов
//

function addEventListenersContactItems() {

  const contactItems = document.querySelectorAll('.contacts__item');

  Array.from(contactItems).forEach(el => {
    el.addEventListener('click', ev => {
      updateJSONFile('./contacts.json', localStorage.contactsJSON);      
      updateJSONFile('./messages.json', localStorage.messagesJSON);      
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

  chatHistory.textContent = '';
  sidePanelFiles.textContent = '';
  sidePanelAudio.textContent = '';
  sidePanelPhotos.textContent = '';
  clearAttacments();

  const topSectionTextName = document.querySelector('.top-text__name');
  topSectionTextName.textContent = activeContact.querySelector('.contact-item-text__name').textContent;
  const topSectionStatus = document.querySelector('.top-text__status');
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
  const attachmentsMessage = attachmentsInfo; 

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
    const text = createText(messageText);  
    messageContent.appendChild(text);      
  } 

  if (attachmentsMessage.length) {
  	
    const attachment = document.createElement('div');
    attachment.className = 'ch-msg-cnt__attachment';
    messageContent.appendChild(attachment);
    attachmentsMessage.forEach((el, index) => { 

      if (el.type.search(/audio/) != -1) {

        const chatItems = document.querySelectorAll('.audio__item_chat');
        const key = chatItems.length + index + 1;
        
        const audioChat = createAudio(el.link, el.file_name, key); 
			  audioChat.className = 'audio__item audio__item_chat';
			  audioChat.querySelector('.audio-item__playstate').dataset.key = key;
			  attachment.appendChild(audioChat); 
			  
			  const audioShared = createAudio(el.link, el.file_name, key); 
			  audioShared.className = 'audio__item audio__item_shared';  
			  audioShared.querySelector('.audio-item__playstate').dataset.key = `${key}-s`;  
			  sidePanelAudio.appendChild(audioShared);  

      } else if (el.type.search(/image/) != -1) {   

        const imgChat = createImage(el.link);
        imgChat.classList.add('photo__item_chat');
        attachment.appendChild(imgChat);

        const imgShared = createImage(el.link);
			  imgShared.classList.add('photo__item_shared');
			  sidePanelPhotos.appendChild(imgShared);

      } else {   

      	const fileChat = createFile(el.link, el.file_name);
			  fileChat.className = 'files__item files__item_chat';
			  attachment.appendChild(fileChat);

			  const fileShared = createFile(el.link, el.file_name);
			  fileShared.className = 'files__item files__item_shared';
			  sidePanelFiles.appendChild(fileShared);
      }

    });          
  }

  chatHistory.appendChild(message);
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

      if (attachmentsInfo.length) {
        const attachmentMessage = attachmentsInfo.forEach(element => {
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
}


//Cкроллит чат
//

function scrollDown() {
  const timerId = setInterval(() => {chatHistory.scrollTop += 500}, 10);    
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


//Создает HTMLElement с текстом сообщения
//param messageText - текст сообщения
//return text - созданный HTMLElement
//

function createText(messageText) {
  const item = document.createElement('div');
  item.className = 'ch-msg-cnt__text';
  item.textContent = messageText;
  return item;
}


//Создает HTMLElement img
//param ref - ссылка на файл изображения
//return item - созданный HTMLElement
//

function createImage(ref) {  

	const img = document.createElement('img');       
  img.className = 'photo-item__img'; 
  img.src = ref;

  const item = document.createElement('div');       
  item.className = 'photo__item'; 
  item.appendChild(img);

  return item;
} 


//Создает HTMLElement для файла в чат
//param ref - ссылка на файл
//param fileName - имя файла
//return item - созданный HTMLElement
//

function createFile(ref, fileName) {

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


//Создает HTMLElement для аудиофайла
//param ref - ссылка на аудиофайл
//param fileName - имя аудиофайла
//return item - созданный HTMLElement
//

function createAudio(ref, fileName) {

  const item = document.createElement('div');             
  const playBtn = document.createElement('div');
  playBtn.className = 'audio-item__play-button';   
  item.appendChild(playBtn);

  const a = document.createElement('a');
  a.className = 'audio-item__playstate'; 
  a.href = ref;

  playBtn.appendChild(a);

  const title = document.createElement('div');
  title.className = 'audio-item__title'; 
  title.textContent = fileName;
  item.appendChild(title);

  return item;
} 


//Добавляет обработчик события на кнопку play
//param ev - объект события MouseEvent
//

function playAudio(ev) {

  ev.preventDefault();
  
  if (!ev.target.dataset.startTime) {
    ev.target.dataset.startTime = 0;
  }
    
  if (ev.target.classList.contains('audio-item__playstate_play')) {
    player.pause();
  } else {
    player.src = ev.target.href;
    player.dataset.trackName = ev.target.dataset.key;
    player.currentTime = ev.target.dataset.startTime;  
    player.play();
    player.controls = true;  

    const playBtns = document.querySelectorAll('.audio-item__playstate');
    
    Array.from(playBtns).forEach(el => {
      el.classList.remove('audio-item__playstate_play');
      el.dataset.startTime = 0;
    });    
  }
}


//Добавляет в массив информацию о прикрепленном к сообщению файле
//fileType - тип файла
//fileName - имя файла
//param ref - ссылка на файл
//

function addAttacment(fileType, fileName, ref) {
  
  const item = document.createElement('div');
  item.className = 'msg-box-attachments__item';
  attachments.appendChild(item);

  const title = document.createElement('div');
  title.className = 'msg-box-attachments-item__title';
  title.textContent = fileName;
  item.appendChild(title);    

  attachmentsInfo.push({type: fileType, file_name: fileName, link: ref});

  const deleteBtn = document.createElement('div');
  deleteBtn.className = 'msg-box-attachments-item__delete-icon';

  item.addEventListener('click', ev => {
  	if (ev.target.classList.contains('msg-box-attachments-item__delete-icon')) {  		
  		const removeElement = attachmentsInfo.findIndex(el => {
	      return el.file_name == ev.currentTarget.querySelector('.msg-box-attachments-item__title').textContent;
	    });
	    URL.revokeObjectURL(attachmentsInfo[removeElement].link);
	    attachmentsInfo.splice(removeElement, 1);
	    attachments.removeChild(ev.currentTarget);
	    disableSendBtn();
  	}	    
  });

  item.appendChild(deleteBtn);

  disableSendBtn(); 
}


//Удаляет информацию о прикрепленных к сообщению файлах
//

function clearAttacments() {
  attachmentsInfo.splice(0, attachmentsInfo.length);
  attachments.textContent = '';
}


//Показывает просмотрщик фото
//ev - объект события MouseEvent
//

function showViewierPhoto(ev) {

  ev.preventDefault();
  presenter.classList.add('presenter_show');
  presenter.querySelector('.presenter-top__pic').src = ev.target.src;

  const node = sidePanelPhotos.cloneNode(true);
  node.classList.remove('shared__content_photos');
  node.classList.remove('shared__content');
  node.classList.add('presenter__bottom');
  presenter.appendChild(node);

  const items = document.querySelectorAll('.presenter .photo__item');
  
  Array.from(items).forEach(el => {
    el.classList.remove('photo__item_shared');
    el.classList.add('photo__item_presenter');  
  });
}  


//Блокирует/разблокирует кнопку отправки сообщений
//

function disableSendBtn() {
  if (!textInput.value && !attachmentsInfo.length) {
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


