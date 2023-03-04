
-- Table for forum posts

drop table if exists posts;

create table posts (
  post_id integer not null primary key autoincrement,
  post_name varchar(30) not null,
  user_id int(4),
  created timestamp default (datetime('now')),
  body text,
  likes int(4),

  foreign key(user_id) references users(user_id)
);
