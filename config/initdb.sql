-- initdb.sql

-- Create a user with environment variables
CREATE USER ${POSTGRES_USERNAME} WITH PASSWORD '${POSTGRES_PASSWORD}';

-- Grant necessary privileges to the user
ALTER USER ${POSTGRES_USERNAME} WITH SUPERUSER;
