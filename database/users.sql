


-- Table for forum users

drop table if exists users;

create table users (
  user_id int(4) not null primary key,
  created timestamp not null

);
