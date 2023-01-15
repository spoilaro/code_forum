
# Script to build database system

# Table for forum users
sqlite3 forum.db ".read users.sql"

# Table for forum posts
sqlite3 forum.db ".read posts.sql"

# Table for forum comments
sqlite3 forum.db ".read comments.sql"
