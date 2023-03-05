

-- Table for forum comments

drop table if exists comments;

create table comments (
  comment_id integer not null primary key autoincrement,
  post_id int(4) not null,
  user_id int(4) not null,
  body varchar(30) not null,
  created timestamp default (datetime('now')) not null,

  foreign key(post_id) references posts(post_id)
);
