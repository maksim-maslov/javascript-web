'use strict';

const contacts = `{"contacts":
										[	
											{"user_id":"13071",
											"user_name":"Andrey Samarin",
											"avatar_pic_link":"./img/avatar-pic1.jpg",
											"status":"Online",
											"last_message":
												{"snippet":"sit amet veniam, quis nostrud",
												"message_sender_id":"13071",
												"timestamp_precise":"1515575746535"
												}
											},		
											{"user_id":"13072",
											"user_name":"Aleksey Shevelev",
											"avatar_pic_link":"./img/avatar-pic2.jpg",
											"status":"Online",
											"last_message":
												{"snippet":"aliquip ex ea commodo ",
												"message_sender_id":"10001",
												"timestamp_precise":"1515575746535"
												}
											},
											{"user_id":"13073",
											"user_name":"Boris Klimov",
											"avatar_pic_link":"./img/avatar-pic3.jpg",
											"status":"Active 1h ago",
											"last_message":
												{"snippet":"consectetur adipiscing elit",
												"message_sender_id":"13073",
												"timestamp_precise":"1515575746535"
												}
											},
											{"user_id":"13074",
											"user_name":"Dmitry Kulikov",
											"avatar_pic_link":"./img/avatar-pic4.jpg",
											"status":"Active 4h ago",
											"last_message":
												{"snippet":"exercitation ullamco laboris",
												"message_sender_id":"13074",
												"timestamp_precise":"1515575746535"
												}
											},
											{"user_id":"13075",
											"user_name":"Gennady Yousupov",
											"avatar_pic_link":"./img/avatar-pic5.jpg",
											"status":"Online",
											"last_message":
												{"snippet":"veniam, quis nostrud ",
												"message_sender_id":"13075",
												"timestamp_precise":"1515575746535"
												}
											},
											{"user_id":"13076",
											"user_name":"Vasily Esmanov",
											"status":"Active 2h ago",
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

const topSectionControlElement = document.querySelector('.top-section__control-element');
const optionsMenu = document.querySelector('.options-menu');

const sharedControlElement = document.querySelectorAll('.shared-head__control-element');

const contactSection = document.querySelector('.contacts');
const chatHistorySection = document.querySelector('.chat-history');
const attachmentsSection = document.querySelector('.message-box__attachments');

const sidePanelFiles = document.querySelector('.shared__content_files');
const sidePanelAudio = document.querySelector('.shared__content_audio');
const sidePanelPhotos = document.querySelector('.shared__content_photos');

const player = document.querySelector('.audioplayer');

const contactsJSON = JSON.parse(contacts);

const messagesJSON = JSON.parse(messages); 


function createContactsSection() {

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
	el.addEventListener('click', ev => createChatHistorySection(ev.currentTarget));
}); 


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

const sidePanel = document.querySelector('.side-panel');	
const userInfoSection = document.querySelector('.user-info-section');		

function createChatHistorySection(otherUser) {
	
	Array.from(contactItems).forEach(el => {el.classList.remove('contacts__item_active')});
	otherUser.classList.add('contacts__item_active');

	chatHistorySection.textContent = '';
	sidePanelFiles.textContent = '';
	sidePanelAudio.textContent = '';
	sidePanelPhotos.textContent = '';
	player.controls = false;
	clearAttacments();

	const user = messagesJSON.users.find(el => {return el.other_user_id == otherUser.dataset.userId;});

	if (user) {
		const topSectionTextName = document.querySelector('.top-section-text__name');
		topSectionTextName.textContent = otherUser.querySelector('.contact-item-text__name').textContent;
		const topSectionTextStatus = document.querySelector('.top-section-text__status');
		topSectionTextStatus.textContent = otherUser.querySelector('.contact-item-text__name').dataset.status;

		const fragment = user.messages.reduce((memo, el, index) => {  
			const avatarPic = otherUser.querySelector('img').src;
			const messageElement = addMessage(index, user.other_user_id, el.message_sender_id, avatarPic, el.message_text, el.attachments, el.timestamp_precise);	
			memo.appendChild(messageElement);
			return memo;
		}, document.createDocumentFragment()); 

		chatHistorySection.appendChild(fragment);
	}

	const avatar = userInfoSection.querySelector('.avatar__pic');
	avatar.src = otherUser.querySelector('.avatar__pic').src;

	const name = userInfoSection.querySelector('.user-info-section__name');
	name.textContent = otherUser.querySelector('.contact-item-text__name').textContent;

	const status = userInfoSection.querySelector('.user-info-section__status');
	status.textContent = otherUser.querySelector('.contact-item-text__name').dataset.status;
		
}



function clearAttacments() {
	attachments.splice(0, attachments.length);
	attachmentsSection.textContent = '';
}



createChatHistorySection(document.querySelector('.contacts__item'));

function addAttacmentsItem(fileType, fileName, link) {
	
	const attachmentsItem = document.createElement('div');
	attachmentsItem.className = 'msg-box-attachments__item';
	attachmentsSection.appendChild(attachmentsItem);

	const attachmentsText = document.createElement('div');
	attachmentsText.className = 'msg-box-attachments-item__text';
	attachmentsText.textContent = fileName;
	attachmentsItem.appendChild(attachmentsText);

	const attachmentsDeleteIcon = document.createElement('div');
	attachmentsDeleteIcon.className = 'msg-box-attachments-item__delete-icon';

	attachmentsDeleteIcon.addEventListener('click', event => {
		const elementRemove = attachments.findIndex(el => {
			return el.file_name == event.target.parentElement.querySelector('.msg-box-attachments-item__text').textContent
		});
		URL.revokeObjectURL(attachments[elementRemove].link);
		attachments.splice(elementRemove, 1);
		attachmentsSection.removeChild(event.target.parentElement);
		disabledSendBtn();
	});

	attachmentsItem.appendChild(attachmentsDeleteIcon);

	attachments.push({type:fileType, file_name:fileName, link:link});

	disabledSendBtn(); 
}


const clipBtn = document.querySelector('#uploadbtn');

clipBtn.addEventListener('change', onSelectFiles);

function onSelectFiles(event) {
	const files = Array.from(event.target.files);
	files.forEach(file => {
		addAttacmentsItem(file.type, file.name, URL.createObjectURL(file));			
	});
}



const textInput = document.querySelector('.message-box__input');
const submitBtn = document.querySelector('#submitbtn');
const sendMsgBtn = document.querySelector('.submit-button');

function disabledSendBtn() {
	if (!textInput.value && !attachments.length) {
		submitBtn.disabled = true;
		sendMsgBtn.style.opacity = '0.4';
	} else {
		submitBtn.disabled = false;
		sendMsgBtn.style.opacity = '0.6';
	}
}

textInput.addEventListener('input', () => {
	disabledSendBtn();
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


function addMessage(index, otherUserId, messageSender, avatarPicture, messageText, attachments, timestamp) {

	const message = document.createElement('div');
	message.className = 'chat-history__message';

	const date = new Date(Number(timestamp));
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


submitBtn.addEventListener('click', sendMessage);

function sendMessage(event) {
	
	let index = 0;

	event.preventDefault();

	const otherUser = document.querySelector('.contacts__item_active');

	const audioItemsChat = document.querySelectorAll('.audio__item_chat .audio-item__playstate');

	if (audioItemsChat) {
		index = Number(audioItemsChat[audioItemsChat.length - 1].name);
		index++;
	} 

	const message = addMessage(String(index), otherUser.dataset.userId, messageSenderId, '', textInput.value, attachments, new Date());
	chatHistorySection.appendChild(message);
	otherUser.querySelector('.contact-item-text__message').textContent = `You: ${textInput.value.substr(0, 25)}`;
	textInput.value = '';
	submitBtn.disabled = true;
	clearAttacments();
	disabledSendBtn();
}


const photoBox = document.querySelector('.photo-box');
const app = document.querySelector('.photo-box__app');
const msgBoxPhotoBtn = document.querySelector('.message-box__photo-button');
const videoStreams = [];

msgBoxPhotoBtn.addEventListener('click', event => {
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
});

const takePhotoBtn = document.querySelector('.photo-box-app__controls'); 
takePhotoBtn.addEventListener('click', takePicture);

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

					const photoBoxItem = document.createElement('div'); 
					photoBoxItem.className = 'photo-box__item';
					fragment.appendChild(photoBoxItem);

					const img = document.createElement('img'); 
					img.style.height = '290px';         
					img.src = src;
					        
					photoBoxItem.appendChild(img); 

					const cancelBtn = document.createElement('div');
					cancelBtn.className = 'photo-box-app__cancelBtn';
					cancelBtn.addEventListener('click', event => {
						event.currentTarget.parentElement.parentElement.removeChild(event.currentTarget.parentElement);
						document.querySelector('video').style.display = 'block';
						takePhotoBtn.style.display = 'block';
					});
					photoBoxItem.appendChild(cancelBtn);           

					const okBtn = document.createElement('div');
					okBtn.className = 'photo-box-app__okBtn';
					okBtn.addEventListener('click', () => {
						addAttacmentsItem('image', 'photo', src);			
						closePhotoBox();							
					});         
					photoBoxItem.appendChild(okBtn); 				  				  

					document.querySelector('video').style.display = 'none';
					takePhotoBtn.style.display = 'none';
					app.insertBefore(fragment, app.firstElementChild);
          
				}, 100);
			}); 
		});  
}

function closePhotoBox() {
	const photoBoxItem = app.querySelector('.photo-box__item')
	if (photoBoxItem) {
		photoBoxItem.parentElement.removeChild(photoBoxItem);
	}
	photoBox.classList.remove('photo-box_show');
	videoStreams.forEach((el) => {
		el.getVideoTracks().map(track => track.stop());
	});
	Array.from(document.querySelectorAll('video')).forEach(el => {
		app.removeChild(el);
	});
	Array.from(document.querySelectorAll('.photo-box__closeBtn')).forEach((el) => {
		photoBox.removeChild(el);
	});
}	  



const clearHistoryMenuItem = document.querySelector('.options-menu__item_clear-history');

clearHistoryMenuItem.addEventListener('click', () => {
	chatHistorySection.textContent = '';
	sidePanelFiles.textContent = '';
	sidePanelAudio.textContent = '';
	sidePanelPhotos.textContent = '';

	const currentUser = document.querySelector('.contacts__item_active').dataset.userId;

	const userMessages = messagesJSON.users.findIndex(el => {
		return el.other_user_id == currentUser;
	});

	console.log(currentUser, userMessages);

	messagesJSON.users.splice(userMessages, 1);
	contactsJSON.contacts.forEach(el => {
		if (el.user_id == currentUser) {
			document.querySelector('.contacts__item_active  .contact-item-text__message').textContent = '';
			el.last_message = {snippet:'', message_sender_id:'', timestamp_precise:''}
			return;
		}
	});	

	player.controls = false;

	optionsMenu.classList.remove('options-menu_show');	
});

const userInfoMenuItem = document.querySelector('.options-menu__item_user-info');


userInfoMenuItem.addEventListener('click', () => {
	sidePanel.style.display = 'none';
	userInfoSection.style.display = 'block';	
	optionsMenu.classList.remove('options-menu_show');
});


const sharedFilesMenuItem = document.querySelector('.options-menu__item_shared-files');

sharedFilesMenuItem.addEventListener('click', () => {
	sidePanel.style.display = 'block';
	userInfoSection.style.display = 'none';	
	optionsMenu.classList.remove('options-menu_show');
});



sharedControlElement.forEach(el => {
	el.addEventListener('click', ev => {
	  const element = ev.target.parentElement.parentElement.querySelector('.shared__content');
		element.classList.toggle('shared__content_hide');
	});
});
	

topSectionControlElement.addEventListener('click', () => {
	optionsMenu.classList.toggle('options-menu_show');
});

















