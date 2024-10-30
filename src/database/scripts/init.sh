# #!/bin/bash

# set -e
# set -u

# function create_user_and_database() {
# 	local database=$1
# 	echo "  Creating user and database '$database'"
# 	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
# 	    CREATE USER $database;
# 	    CREATE DATABASE $database;
# 	    GRANT ALL PRIVILEGES ON DATABASE $database TO $database;
# EOSQL
# }

# if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
# 	echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
# 	for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
# 		create_user_and_database $db
# 	done
# 	echo "Multiple databases created"
# fi


#!/usr/bin/env bash

LAST_EXECUTE_RES=""

function execute_on_db() {
    local statement="$1"

    cmd="PGPASSWORD=${POSTGRES_PASSWORD} psql -U ${POSTGRES_USER} -p ${POSTGRES_PORT:-5432}"
    if [ -n "$POSTGRES_HOST" ]; then
        # when running inside the /docker-entrypoint-initdb.d we need to connect to the local socket
        # but when running in the context of the application we need to connect to the host
        cmd="$cmd -h ${POSTGRES_HOST}"
    fi

    LAST_EXECUTE_RES=$(echo "$statement" | bash -c "$cmd" 2>&1)

    if [ $? -ne 0 ]; then
        echo "Error executing statement: $statement"
        echo "Error: $LAST_EXECUTE_RES"
        exit 1
    fi
}

function create_user_and_database() {
  local database=$1

  echo "Creating user and database '$database' if needed..."

  execute_on_db "\du"
  user_exists=$(echo "$LAST_EXECUTE_RES" | grep -w $database)
  if [ -z "$user_exists" ]; then
    echo "Creating user and database '$database'"

    statement=$(cat <<-EOSQL
       CREATE USER $database WITH PASSWORD '$database';
       CREATE DATABASE "$database" WITH OWNER $database;
       GRANT ALL PRIVILEGES ON DATABASE "$database" TO $database;
       ALTER USER "$database" CREATEDB;
EOSQL
    )

    execute_on_db "$statement"
  else
    echo "User '$database' already exists, skip."
  fi
}

echo "Initializing database: '$INIT_DATABASES'"
if [ -n "$INIT_DATABASES" ]; then
  for db in $(echo $INIT_DATABASES | tr ',' ' '); do
   create_user_and_database $db
  done
fi

echo "Databases are fully initialized 🎉"
