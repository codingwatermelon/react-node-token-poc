#!/bin/bash
psql -U postgres -d joeyshomes -a -f resetTables.sql

psql -U postgres -d joeyshomes -a -f createTables.sql

./insertData.sh