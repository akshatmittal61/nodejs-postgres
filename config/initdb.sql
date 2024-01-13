-- initdb.sql

-- Create a user with environment variables
CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';

-- Grant necessary privileges to the user
ALTER USER ${DB_USER} WITH SUPERUSER;
