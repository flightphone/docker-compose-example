# docker-compose-example
Примеры файлов yml для разворачивания приложений в контейнерах.

Файл ./docker-compose.yml  устанавливает приложение "Закупка велосипедов" на порт 2000. Так же устанавливается Postgresql (изолированно) 
с базой pomanager и PgAdmin4 на порт 7000. Пример:

Приложение:
http://84.201.148.77:2000
Логин: Admin
Пароль: Roma12345678

PgAdmin4:
http://84.201.148.77:7000
Логин администратора: efimmanevich@gmail.com
Пароль: aA12345678
Connection:
host: db
port: 5432
user: postgres
password: aA12345678
database: pomanager


Файл ./unoform/docker-compose.yml устанавливает конвертер файлов word в pdf:
http://84.201.148.77:4000/unoconv.html

Файл ./gitlab/docker-compose.yml устанавливает gitlab 
http://84.201.148.77


