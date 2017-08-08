create database liimex;
use liimex;
create table Users(id smallint not null auto_increment,
    first_name varchar(100),
    last_name varchar(100),
    userid varchar(100),
    password varchar(150),
    created DATETIME,
    modified DATETIME,
    url varchar(100),
    primary key(id)
);
