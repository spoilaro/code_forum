


-- Table for forum users

drop table if exists users;

create table users (
  user_id integer not null primary key autoincrement,
  email varchar(255) not null,
  password varchar(255) not null,
  created timestamp not null
);
