#!/bin/bash

docker-compose -f docker-compose-mongo-test/docker-compose.yml up mongo-test -d

echo "setting up mongo container"

COUNTER=0
until docker exec mongo-test bash -c mongosh --eval "printjson(db.serverStatus())"
do
  sleep 1
  COUNTER=$((COUNTER+1))
  if [[ ${COUNTER} -eq 30 ]]; then
    echo "MongoDB did not initialize within 30 seconds, exiting"
    exit 2
  fi
  echo "Waiting for MongoDB to initialize... ${COUNTER}/30"
done

echo "importing test data"

docker exec mongo-test bash ./scripts/init-import-data.sh

echo "running unit test"

cross-env TESTING=supertest vitest run controllers

echo "tearing down all containers"
docker-compose -f docker-compose-mongo-test/docker-compose.yml down -v --remove-orphans