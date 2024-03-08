### Summary
This directory holds files which are used to reset the database and populate the DB.

### Other info
// connect to DB and execute a sql file
psql -U postgres -d joeyshomes -a -f resetTables.sql 
