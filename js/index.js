'use strict';

const contacts = `{"contacts":
										[	
											{"user_id":"13071",
											"user_name":"Andrey Samarin",
											"avatar_pic_link":"./img/avatar-pic1.jpg",
											"last_message":
												{"snippet":"sit amet veniam, quis nostrud",
												"message_sender_id":"13071",
												"timestamp_precise":"1515575746535"
												}
											},		
											{"user_id":"13072",
											"user_name":"Aleksey Shevelev",
											"avatar_pic_link":"./img/avatar-pic2.jpg",
											"last_message":
												{"snippet":"aliquip ex ea commodo ",
												"message_sender_id":"10001",
												"timestamp_precise":"1515575746535"
												}
											},
											{"user_id":"13073",
											"user_name":"Boris Klimov",
											"avatar_pic_link":"./img/avatar-pic3.jpg",
											"last_message":
												{"snippet":"consectetur adipiscing elit",
												"message_sender_id":"13073",
												"timestamp_precise":"1515575746535"
												}
											},
											{"user_id":"13074",
											"user_name":"Dmitry Kulikov",
											"avatar_pic_link":"./img/avatar-pic4.jpg",
											"last_message":
												{"snippet":"exercitation ullamco laboris",
												"message_sender_id":"13074",
												"timestamp_precise":"1515575746535"
												}
											},
											{"user_id":"13075",
											"user_name":"Gennady Yousupov",
											"avatar_pic_link":"./img/avatar-pic5.jpg",
											"last_message":
												{"snippet":"veniam, quis nostrud ",
												"message_sender_id":"13075",
												"timestamp_precise":"1515575746535"
												}
											},
											{"user_id":"13076",
											"user_name":"Vasily Esmanov",
											"avatar_pic_link":"./img/avatar-pic6.jpg",
											"last_message":
												{"snippet":"do eiusmod tempor incididunt",
												"message_sender_id":"13076",
												"timestamp_precise":"1515575746535"
												}
											}
										]
									}`;



const messages = `{"users":
										[
											{"other_user_id":"13071",	
											"user_name":"Andrey Samarin",
											"status":"Active 1h ago",
											"messages":
												[
													{"message_sender_id":"13071",
													"timestamp_precise":"1515516705866",
													"message_text":"orem ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi utiv",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"veniam, quis nostrud exercitation ullamco laboris nisi ut",			
													"attachments":[]
													},		
													{"message_sender_id":"13071",
													"timestamp_precise":"1515516705866",
													"message_text":"nostrud exercitation ullamco",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"sit amet veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris",			
													"attachments":[]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"file",
															"file_name":"Requiem for a Dream, Hubert Selby, Jr..pdf",
															"link":"./files/Requiem for a Dream, Hubert Selby, Jr..rtf"
															}
														]
													},
													{"message_sender_id":"13071",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"file",
															"file_name":"The Green Mile, Stephen King.pdf",
															"link":"./files/The Green Mile, Stephen King.rtf"
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"audio",
															"file_name":"And Out Of Love - In Armin van Buuren feat Sharon den Adel",
															"link":"./files/And Out Of Love - In Armin van Buuren feat Sharon den Adel.mp3"
															}
														]
													},
													{"message_sender_id":"13071",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"audio",
															"file_name":"Full Focus - Armin van Buuren",
															"link":"./files/Full Focus - Armin van Buuren.mp3"
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic1",
															"link":"./img/s-photos-pic1.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"13071",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic2",
															"link":"./img/s-photos-pic2.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic3",
															"link":"./img/s-photos-pic3.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"13071",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic4",
															"link":"./img/s-photos-pic4.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic5",
															"link":"./img/s-photos-pic5.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"13071",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic6",
															"link":"./img/s-photos-pic6.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic7",
															"link":"./img/s-photos-pic7.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"13071",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic8",
															"link":"./img/s-photos-pic8.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic9",
															"link":"./img/s-photos-pic9.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													}								
												]
											},
											{"other_user_id":"13072",	
											"user_name":"Aleksey Shevelev",
											"status":"Online",
											"messages":
												[
													{"message_sender_id":"13072",
													"timestamp_precise":"1515516705866",
													"message_text":"orem ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi utiv",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"quis nostrud exercitation ullamco laboris nisi",			
													"attachments":[]
													},		
													{"message_sender_id":"13072",
													"timestamp_precise":"1515516705866",
													"message_text":"exercitation ullamco laboris nisi ut veniam",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"veniam, quis nostrud exercitation ullamco laboris nisi ut",			
													"attachments":[]
													},		
													{"message_sender_id":"13072",
													"timestamp_precise":"1515516705866",
													"message_text":"nostrud exercitation ullamco",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"sit amet veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris",			
													"attachments":[]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"file",
															"file_name":"Requiem for a Dream, Hubert Selby, Jr..pdf",
															"link":"./files/Requiem for a Dream, Hubert Selby, Jr..rtf"
															}
														]
													},
													{"message_sender_id":"13072",
													"timestamp_precise":"1515516705866",
													"message_text":"fhdfghdjdg",			
													"attachments":
														[
															{"type":"file",
															"file_name":"The Green Mile, Stephen King.pdf",
															"link":"./files/The Green Mile, Stephen King.rtf"
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"sdfgsfsafgfdhdfgjdhjdhjdhj",			
													"attachments":
														[
															{"type":"audio",
															"file_name":"And Out Of Love - In Armin van Buuren feat Sharon den Adel",
															"link":"./files/And Out Of Love - In Armin van Buuren feat Sharon den Adel.mp3"
															}
														]
													},
													{"message_sender_id":"13072",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"audio",
															"file_name":"Full Focus - Armin van Buuren",
															"link":"./files/Full Focus - Armin van Buuren.mp3"
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic1",
															"link":"./img/s-photos-pic1.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"13072",
													"timestamp_precise":"1515516705866",
													"message_text":"bndgfhjfghkglgk",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic2",
															"link":"./img/s-photos-pic2.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic3",
															"link":"./img/s-photos-pic3.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"13072",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic4",
															"link":"./img/s-photos-pic4.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic5",
															"link":"./img/s-photos-pic5.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"13072",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic6",
															"link":"./img/s-photos-pic6.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic7",
															"link":"./img/s-photos-pic7.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"13072",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic8",
															"link":"./img/s-photos-pic8.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic9",
															"link":"./img/s-photos-pic9.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"13072",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic10",
															"link":"./img/s-photos-pic10.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic11",
															"link":"./img/s-photos-pic11.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													},
													{"message_sender_id":"13072",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"image",
															"file_name":"s-photos-pic12",
															"link":"./img/s-photos-pic12.jpg",
															"original_dimensions":{"x":600,"y":600}
															}
														]
													}
												]
											},
											{"other_user_id":"13073",	
											"user_name":"Boris Klimov",
											"status":"Online",
											"messages":
												[
													{"message_sender_id":"13073",
													"timestamp_precise":"1515516705866",
													"message_text":"orem ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi utiv",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"quis nostrud exercitation ullamco laboris nisi",			
													"attachments":[]
													},		
													{"message_sender_id":"13073",
													"timestamp_precise":"1515516705866",
													"message_text":"exercitation ullamco laboris nisi ut veniam",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"veniam, quis nostrud exercitation ullamco laboris nisi ut",			
													"attachments":[]
													},		
													{"message_sender_id":"13073",
													"timestamp_precise":"1515516705866",
													"message_text":"nostrud exercitation ullamco",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"sit amet veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris",			
													"attachments":[]
													}
												]
											},
											{"other_user_id":"13074",	
											"user_name":"Dmitry Kulikov",
											"status":"Active 4h ago",
											"messages":
												[
													{"message_sender_id":"13074",
													"timestamp_precise":"1515516705866",
													"message_text":"orem ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi utiv",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"quis nostrud exercitation ullamco laboris nisi",			
													"attachments":[]
													},		
													{"message_sender_id":"13074",
													"timestamp_precise":"1515516705866",
													"message_text":"exercitation ullamco laboris nisi ut veniam",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"veniam, quis nostrud exercitation ullamco laboris nisi ut",			
													"attachments":[]
													},		
													{"message_sender_id":"13074",
													"timestamp_precise":"1515516705866",
													"message_text":"nostrud exercitation ullamco",			
													"attachments":[]
													}
												]
											},
											{"other_user_id":"13075",	
											"user_name":"Gennady Yousupov",
											"status":"Online",
											"messages":
												[
													{"message_sender_id":"13075",
													"timestamp_precise":"1515516705866",
													"message_text":"orem ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi utiv",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"quis nostrud exercitation ullamco laboris nisi",			
													"attachments":[]
													},		
													{"message_sender_id":"13075",
													"timestamp_precise":"1515516705866",
													"message_text":"exercitation ullamco laboris nisi ut veniam",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"veniam, quis nostrud exercitation ullamco laboris nisi ut",			
													"attachments":[]
													}
												]
											},
											{"other_user_id":"13076",	
											"user_name":"Vasily Esmanov",
											"status":"Active 2h ago",
											"messages":
												[
													{"message_sender_id":"13076",
													"timestamp_precise":"1515516705866",
													"message_text":"orem ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris nisi utiv",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"quis nostrud exercitation ullamco laboris nisi",			
													"attachments":[]
													},		
													{"message_sender_id":"13076",
													"timestamp_precise":"1515516705866",
													"message_text":"exercitation ullamco laboris nisi ut veniam",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"veniam, quis nostrud exercitation ullamco laboris nisi ut",			
													"attachments":[]
													},		
													{"message_sender_id":"13076",
													"timestamp_precise":"1515516705866",
													"message_text":"nostrud exercitation ullamco",			
													"attachments":[]
													},		
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"sit amet veniam, quis nostrud exercitation ullamco laboris nisi ut veniam, quis nostrud exercitation ullamco laboris",			
													"attachments":[]
													},
													{"message_sender_id":"10001",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"file",
															"file_name":"Requiem for a Dream, Hubert Selby, Jr..pdf",
															"link":"./files/Requiem for a Dream, Hubert Selby, Jr..rtf"
															}
														]
													},
													{"message_sender_id":"13076",
													"timestamp_precise":"1515516705866",
													"message_text":"",			
													"attachments":
														[
															{"type":"audio",
															"file_name":"Full Focus - Armin van Buuren",
															"link":"./files/Full Focus - Armin van Buuren.mp3"
															}
														]
													}
												]
											}
										]
									}`;



const messageSenderId = '10001';
const attachments = [];

const clipBtn = document.querySelector('#uploadbtn');

const topSectionControlElement = document.querySelector('.top-section__control-element');
const optionsMenu = document.querySelector('.options-menu');

const sharedControlElement = document.querySelectorAll('.shared-head__control-element');

const player = document.querySelector('.audioplayer');

const sidePanelFiles = document.querySelector('.shared__content_files');
const sidePanelAudio = document.querySelector('.shared__content_audio');
const sidePanelPhotos = document.querySelector('.shared__content_photos');
const chatHistorySection = document.querySelector('.chat-history');
const contactSection = document.querySelector('.contacts');
const attachmentsSection = document.querySelector('.message-box__attachments');

sharedControlElement.forEach(el => {
	el.addEventListener('click', ev => {
		const element = ev.target.parentElement.parentElement.querySelector('.shared__content');
		element.classList.toggle('shared__content_hide');
	});
});
	

topSectionControlElement.addEventListener('click', () => {
	optionsMenu.classList.toggle('options-menu_show');
});


function createContactsSection() {
	const data = JSON.parse(contacts); 
	const fragment = data.contacts.reduce((memo, el) => {   
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
    text.appendChild(textName);
    
    const textMessage = document.createElement('div');
    textMessage.className = 'contact-item-text__message';

    textMessage.textContent = el.last_message.message_sender_id == el.user_id 
    ? el.last_message.snippet 
    : `You: ${el.last_message.snippet}`;

    text.appendChild(textMessage);     
    memo.appendChild(contactsItem);
    return memo;
  }, document.createDocumentFragment());    
  return fragment;  
}


contactSection.appendChild(createContactsSection());

const contactItems = document.querySelectorAll('.contacts__item');

Array.from(contactItems).forEach(el => {
	el.addEventListener('click', (ev) => createChatHistorySection(ev.currentTarget));
}); 


function addEventListenerAudio() {
	const audioPlaystate = document.querySelectorAll('.audio-item__playstate');
	// console.log(chatHistorySection);
	// console.log(audioPlaystate);

	audioPlaystate.forEach(el => {
		el.addEventListener('click', ev => {
			ev.preventDefault();

			if (!ev.target.dataset.startTime) {
				ev.target.dataset.startTime = 0;
			}
					
			if (ev.target.classList.contains('audio-item__playstate_play')) {
				player.pause();
			} else {
				player.src = ev.target.href;
				player.dataset.trackName = ev.target.name;
				player.currentTime = ev.target.dataset.startTime;	
				player.play();
				player.controls = true;				
				
				audioPlaystate.forEach(el => {
					el.classList.remove('audio-item__playstate_play');
					el.dataset.startTime = 0;
				});			
			}
		});
	});

	player.addEventListener('playing', ev => {
		const currentTrack = document.querySelector("[name='" + ev.target.dataset.trackName + "']");
		currentTrack.classList.add('audio-item__playstate_play');
	});

	player.addEventListener('pause', ev => {
		const currentTrack = document.querySelector("[name='" + ev.target.dataset.trackName + "']");
		currentTrack.classList.remove('audio-item__playstate_play');
		currentTrack.dataset.startTime = ev.target.currentTime;
	});
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
	attachmentItem.appendChild(audioLink);
	const title = document.createElement('div');
  title.className = 'audio-item__title'; 
  title.textContent = fileName;
	attachmentItem.appendChild(title);
	return attachmentItem;
}	


function createElementImageChat(parentElement, link) {
	const attachmentItem = document.createElement('img');			 
	attachmentItem.className = 'ch-msg-cnt-attachment__picture'; 
	attachmentItem.src = link;
	parentElement.appendChild(attachmentItem);
}


function createElementImageSidePanelPhotos(link) {
	const sidePanelPhotoItem = document.createElement('div');			 
	sidePanelPhotoItem.className = 'photos__item photos__item_shared'; 
	sidePanelPhotos.appendChild(sidePanelPhotoItem);
	
	const sidePanelPhotoLink = document.createElement('a');			 
	sidePanelPhotoLink.className = 'photos-item__link'; 
	sidePanelPhotoLink.href = link;
	sidePanelPhotoLink.target = '_blank';
	sidePanelPhotoItem.appendChild(sidePanelPhotoLink);

	const sidePanelPhotoImg = document.createElement('img');			 
	sidePanelPhotoImg.className = 'photos-item__pic'; 
	sidePanelPhotoImg.src = link;
	sidePanelPhotoLink.appendChild(sidePanelPhotoImg);

	const sidePanelPhotoOverlay = document.createElement('div');			 
	sidePanelPhotoOverlay.className = 'photos-item__overlay'; 
	sidePanelPhotoLink.appendChild(sidePanelPhotoOverlay);
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
	addEventListenerAudio();
}

function addElementImage(parentElement, link) {
	createElementImageChat(parentElement, link);	
	createElementImageSidePanelPhotos(link);
} 

function addElementText(parentElement, text) {
	const messageText = document.createElement('div');
  messageText.className = 'ch-msg-cnt__text';
  messageText.textContent = text;
  parentElement.appendChild(messageText);
}

function addMessage(index, otherUserId, messageSender, avatarPicture, messageText, attachments, timestamp) {
	const message = document.createElement('div');
  message.className = 'chat-history__message';
  const date = new Date(Number(timestamp))
  message.title = date.toLocaleString('ru-Ru');
  
  if (messageSender == otherUserId) {
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

  if (attachments.length) {
  	const attachment = document.createElement('div');
	  attachment.className = 'ch-msg-cnt__attachment';
	  messageContent.appendChild(attachment);
	  attachments.forEach(element => {	  	  

    	if (element.type.search(/audio/) != -1) {
    		addElementAudio(attachment, element.link, element.file_name, index);	    		   		
    	}	else if (element.type.search(/image/) != -1) {
    		addElementImage(attachment, element.link);
    	} else { 	
		  	addElementFile(attachment, element.link, element.file_name);
    	}
    	
	  });		    	
  }
  return message;
} 


function clearAttacments() {
	attachments.splice(0, attachments.length);
	attachmentsSection.textContent = '';
}


function createChatHistorySection(otherUser) {
	Array.from(contactItems).forEach(el => {el.classList.remove('contacts__item_active')});
	otherUser.classList.add('contacts__item_active');
	chatHistorySection.textContent = '';
	sidePanelFiles.textContent = '';
	sidePanelAudio.textContent = '';
	sidePanelPhotos.textContent = '';
	player.controls = false;
	clearAttacments();
	const data = JSON.parse(messages); 
	const user = data.users.find(el => {return el.other_user_id == otherUser.dataset.userId;});
	const topSectionTextName = document.querySelector('.top-section-text__name');
	topSectionTextName.textContent = user.user_name;
	const topSectionTextStatus = document.querySelector('.top-section-text__status');
	topSectionTextStatus.textContent = user.status;

	const fragment = user.messages.reduce((memo, el, index) => {  
		const avatarPic = otherUser.querySelector('img').src;
		const messageElement = addMessage(index, user.other_user_id, el.message_sender_id, avatarPic, el.message_text, el.attachments, el.timestamp_precise);	
    memo.appendChild(messageElement);
    return memo;
  }, document.createDocumentFragment()); 

  chatHistorySection.appendChild(fragment);
}

createChatHistorySection(document.querySelector('.contacts__item'));

clipBtn.addEventListener('change', onSelectFiles);

function onSelectFiles(event) {
	const files = Array.from(event.target.files);
	files.forEach(file => {
		const attachmentsItem = document.createElement('div');
		attachmentsItem.className = 'msg-box-attachments__item';
		attachmentsSection.appendChild(attachmentsItem);

		const attachmentsText = document.createElement('div');
		attachmentsText.className = 'msg-box-attachments-item__text';
		attachmentsText.textContent = file.name;
		attachmentsItem.appendChild(attachmentsText);

		const attachmentsDeleteIcon = document.createElement('div');
		attachmentsDeleteIcon.className = 'msg-box-attachments-item__delete-icon';
		attachmentsItem.appendChild(attachmentsDeleteIcon);

		attachments.push({type:file.type, file_name:file.name, link:URL.createObjectURL(file)}); 
	});
	if (attachments) {
		deleteClip();
	}	
}


function deleteClip() {
	const deleteClip = document.querySelectorAll('.msg-box-attachments-item__delete-icon');

	Array.from(deleteClip).forEach((el) => {
		el.addEventListener('click', event => {
			const elementRemove = attachments.findIndex(el => {
				return el.file_name == event.target.parentElement.querySelector('.msg-box-attachments-item__text').textContent
			});
			URL.revokeObjectURL(attachments[elementRemove].link);
			attachments.splice(elementRemove, 1);
			attachmentsSection.removeChild(event.target.parentElement);
		});
	});
}	


const sendMsgBtn = document.querySelector('.message-box__send-message-button');

sendMsgBtn.addEventListener('click', sendMessage);

function sendMessage(event) {
	event.preventDefault();
	let index = 0;
	const otherUser = document.querySelector('.contacts__item_active');
	const audioItemsChat = document.querySelectorAll('.audio__item_chat .audio-item__playstate');
	if (audioItemsChat) {
		index = Number(audioItemsChat[audioItemsChat.length - 1].name);
		index++;
	} 
	const textInput = document.querySelector('.message-box__input');
	const message = addMessage(String(index), otherUser.dataset.userId, messageSenderId, '', textInput.value, attachments, '1515516705866');
	chatHistorySection.appendChild(message);
	addEventListenerAudio();
	textInput.value = '';
	clearAttacments();
}
























