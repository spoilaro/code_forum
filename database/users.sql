


-- Table for forum users

drop table if exists users;

create table users (
  email varchar(255) not null primary key,
  created timestamp not null
);
