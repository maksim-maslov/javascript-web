Необходимо реализовать приложение "Сервис обмена сообщениями". Приложение будет запускаться и работать в браузере. После реализации версия проекта будет доступна по ссылке: [https://maksim-maslov.github.io/javascript-web](https://maksim-maslov.github.io/javascript-web)


![preview.png](https://github.com/maksim-maslov/javascript-web/blob/master/res/preview.png)

### Описание

В верхней части окна отображаются имя и статус собеседника. 

В верхнем правом углу расположен элемент управления чатом. При клике по нему раскрывается меню опций: информация о пользователе (User Info), очистка истории переписки (Clear History). 
При повторном клике на элемент управления - меню сворачивается.

С левой стороны расположен список контактов. Каждый элемент списка содержит аватар, имя и фрагмент текста последнего сообщения из переписки или информацию о том, что собеседник сейчас печатает сообщение. 
При клике на элемент открывается история переписки.

В правой части расположены панели с файлами в общем доступе: Shared Files, Shared Audio и Shared Photos. Каждая панель может закрываться и открываться при клике на элемент управления. 

Панели Shared Files, Shared Audio содержат список элементов. 
Элемент списка для панели Shared Files состоит из иконки и ссылки для загрузки файла, при клике на ней открывается окно для загрузки файла.
Элемент списка для панели Shared Audio состоит из кнопки play (pause) и названия аудиозаписи. При клике на кнопке play - начинается воспроизведение, иконка на кнопке при этом меняется на pause.
Панель Shared Photos содержит коллекцию миниатюр фото. При клике на миниатюру фотографии отображается увеличенная фотография.

По центру находится история переписки и окно отправки сообщений. 
История переписки состоит из элементов: аватар и текст сообщений собеседника с выравниванием по левой стороне и сообщений пользователя с выравниванием по правой стороне.

В окне отправки сообщений расположены кнопки "прикрепить файл" и "отправить фото", поле для ввода текста сообщения и кнопка отправки сообщения. 
При клике на кнопку "прикрепить файл" открывается окно для выбора файла для отправки, после выбора файла - его содержимое отправляется в сообщении собеседнику.
В случае выбора аудиофайла, в список элементов на боковой панели Shared Audio добавляется ссылка на аудиозапись, в остальных случаях - добавляется ссылка на файл в список элементов на боковой панели Shared Files.

При клике на кнопку "отправить фото" запрашивается доступ к веб-камере, и в случае если доступ предоставлен, текущий кадр с веб-камеры отправляется в сообщении, миниатюра фото добавляется в коллекцию на боковой панели Shared Photos.
