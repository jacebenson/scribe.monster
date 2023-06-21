#!/bin/bash

# This file will start up the PostgreSQL database, Redis server, and the dev server.
# Then it will tail the log file.
echo "Checking .env and .env.default for required variables"

# Loop over each required variable and check if it exists in the .env file
required_variables=("DATABASE_URL" "SESSION_SECRET" "CACHE_HOST" "CACHE_PASSWORD")
errors=0

for variable in "${required_variables[@]}"; do
  if ! grep -q "^${variable}=" .env; then
    echo "${variable} is missing from .env file"
    errors=$((errors + 1))
  fi
done

if [[ $errors -gt 0 ]]; then
  exit 1
fi

# delete and recreate the log file
rm -f .logs.txt
touch .logs.txt
rm -f .logs.rwdev.txt
touch .logs.rwdev.txt

# Start the following 4 processes in parallel
docker-compose build postgres && docker-compose up -d postgres
docker-compose build redis && docker-compose up -d redis
yarn rw dev --side web > /dev/null &
yarn rw dev --side api > .logs.rwdev.txt &
# tail two log files in parallel
# .logs.txt (formatted) and .logs.rwdev.txt (raw)

# tail -f .logs.txt | while IFS= read -r line; do
#   #timestamp=$(date +"%H:%M:%S") # neesd to include ms
#   timestamp=$(date +"%T.%3N")
#   message=$(echo "$line" | sed -e 's/.*"msg":"\([^"]*\)".*/\1/')
#   echo "${timestamp} - ${message}"
# done

# attempt at 2x logs
tail -f .logs.txt | while IFS= read -r line; do
  #timestamp=$(date +"%H:%M:%S") # neesd to include ms
  timestamp=$(date +"%T.%3N")
  message=$(echo "$line" | sed -e 's/.*"msg":"\([^"]*\)".*/\1/')
  # if theres still a message... echo it
  if [[ $message != "" ]]; then
    echo "${timestamp} - ${message}"
  fi
done