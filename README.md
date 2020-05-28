# news-explorer-api

В данном проекте имеется тестовая версия сервера.
Запуск сервера осуществляется командой npm run start.
Запуск сервера c хот релоудом осуществляется командой npm run dev.
Сервер будет обращаться к базе данных по адресу: mongodb://localhost:27017/mestodb
Перед началом работы необходимо передать секретный код для токена в переменную окружения - JWT_SECRET(на публичном сервере уже есть)
Код был размещен на виртуальной машине Яндекс.Облако и имеет публичный ip - 130.193.38.84
Также для сервера были приобретены и настроены бесплатные домены:

24sere.ga
www.24sere.ga

Результаты всех запросов записываются в: logs/request.log
Ошибки, вызванные в запросах будут записываться в: logs/error.log
Данные ссылки были написаны для разработки, чтобы обратиться к данным адресам на сервере, заменить "localhost:3000" на "24sere.ga".
Регистрация пользователя проходит по адресу:
https://localhost:3000/signup
Далее пользователю необходимо получить токен для авторизациия на сайте, для этого ему необходимо отправить post-запрос на адрес:
https://localhost:3000/signin, и указать свой логин и пароль в теле 

После сервер выдаст ваш персональный токен, необходимый для дальнейшей авторизации и работе на сервере(его необходимо будет отправлять в заголовках запроса ключа authorization)
Когда вы успешно авторизировались, то можете получить доступ к следующим действиям:

Получить имя текущего пользователя и его email можно по адресу(тип запроса - get):
https://localhost:3000/users/me
Массив со статьями, который сохранил данный авторизованный пользователь(вы), можно получить по адресу(тип запроса - get):
https://localhost:3000/articles
Создать статью можно по адресу(тип запроса - post):
https://localhost:3000/articles(необходимо учитывать валидацию при создании статьи)
Удалить статью по id можно по адресу(тип запроса - delete):
https://localhost:3000/articles/(articleId - id статьи), но вы можете удалить лишь ту статью, владельцем которой являетесь именно вы


