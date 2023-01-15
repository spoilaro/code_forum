
-- Table for forum posts

drop table if exists posts;

create table posts (
  post_id int(4) not null primary key,
  post_name varchar(30) not null,
  user_id int(4),
  created timestamp not null,

  foreign key(user_id) references users(user_id)
);
