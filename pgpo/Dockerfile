FROM postgres:9.6
COPY init1.sql /docker-entrypoint-initdb.d/
COPY init2.sh /docker-entrypoint-initdb.d/
COPY pomanager.sq /docker-entrypoint-initdb.d/