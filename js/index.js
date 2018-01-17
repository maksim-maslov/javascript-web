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
											"message_sender_id":"13072",
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





const topSectionControlElement = document.querySelector('.top-section__control-element');
const optionsMenu = document.querySelector('.options-menu');

const sharedControlElement = document.querySelectorAll('.shared-head__control-element');

const sharedAudioPlaystate = document.querySelectorAll('.s-audio-item__playstate');
const player = document.querySelector('.audioplayer');


sharedAudioPlaystate.forEach(el => {
	el.addEventListener('click', ev => {
		ev.preventDefault();

		if (!ev.target.dataset.startTime) {
			ev.target.dataset.startTime = 0;
		}
				
		if (ev.target.classList.contains('s-audio-item__playstate_play')) {
			player.pause();
			ev.target.dataset.startTime = player.currentTime;
		} else {
			player.src = ev.target.href;
			player.dataset.trackName = ev.target.name;
			player.currentTime = ev.target.dataset.startTime;	
			player.play();
			player.controls = true;				
			sharedAudioPlaystate.forEach(el => {
				el.classList.remove('s-audio-item__playstate_play');
				el.dataset.startTime = 0;
			});			
		}
	});
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

player.addEventListener('playing', (ev) => {
	const currentTrack = document.querySelector("[name='" + ev.target.dataset.trackName + "']");
	currentTrack.classList.add('s-audio-item__playstate_play');
});

player.addEventListener('pause', (ev) => {
	const currentTrack = document.querySelector("[name='" + ev.target.dataset.trackName + "']");
	currentTrack.classList.remove('s-audio-item__playstate_play');
});


function createContactsSection() {
	let data = JSON.parse(contacts); 
	const fragment = data.contacts.reduce((memo, el) => {   
    const contactsItem = document.createElement('div');
    contactsItem.className = 'contacts__item'; 
    const contactsItemAvatar = document.createElement('div');
    contactsItemAvatar.className = 'contacts-item__avatar';
    contactsItem.appendChild(contactsItemAvatar);    
    const avatarPic = document.createElement('img');
    avatarPic.className = 'avatar__pic';  
    avatarPic.src = el.avatar_pic_link;   
    contactsItemAvatar.appendChild(avatarPic); 
    const contactsItemText = document.createElement('div');
    contactsItemText.className = 'contacts-item__text';
    contactsItem.appendChild(contactsItemText); 
    const contactsItemTextName = document.createElement('div');
    contactsItemTextName.className = 'contact-item-text__name';
    contactsItemTextName.textContent = el.user_name;
    contactsItemText.appendChild(contactsItemTextName);
    const contactsItemTextMessage = document.createElement('div');
    contactsItemTextMessage.className = 'contact-item-text__message';
    contactsItemTextMessage.textContent = el.last_message.snippet;
    contactsItemText.appendChild(contactsItemTextMessage);     
    memo.appendChild(contactsItem);
    return memo;
  }, document.createDocumentFragment());    
  return fragment;  
}

const contactSection = document.querySelector('.contacts');

contactSection.appendChild(createContactsSection());

function createChatHistorySection() {

}

















const messages = `{"other_user_id":"13076",
									"user_name":"Andrey Samarin",
									"status":"Online",
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
											{"message_sender_id":"10001",
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
									}`;






