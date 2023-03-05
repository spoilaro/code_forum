
-- Table for forum posts

drop table if exists posts;

create table posts (
  post_id integer not null primary key autoincrement,
  post_name varchar(255) not null,
  user_id int(4) not null,
  created timestamp default (datetime('now')),
  body text,
  likes int(4) default 0,

  foreign key(user_id) references users(user_id)
);
