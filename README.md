# docker-compose-example
<pre>
Примеры файлов yml для развертывания приложений в контейнерах.

Файл ./docker-compose.yml  устанавливает приложение "Закупка велосипедов" на порт 2000. Так же устанавливается Postgresql (изолированно) 
с базой pomanager и PgAdmin4 на порт 7000. Пример:

Приложение:
Логин: Admin ,
Пароль: Roma12345678

PgAdmin4:
Логин администратора: efimmanevich@gmail.com ,
Пароль: aA12345678 ,
Connection:
host: db ,
port: 5432 ,
user: postgres ,
password: aA12345678 ,
database: pomanager


Файл ./unoform/docker-compose.yml устанавливает конвертер файлов word в pdf:
http://hostname:4000/unoconv.html

Файл ./gitlab/docker-compose.yml устанавливает gitlab 
</pre>