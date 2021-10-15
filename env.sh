#!/bin/sh
HEROKU_ENV=$(printenv)

touch ./.env

for pair in $HEROKU_ENV; do
    # echo $pair
    arr=(${pair//=/ })
    var=${arr[0]}  
    if [ "$var" = "NEXT_PUBLIC_AUTH_URL" ]; then
        val=${arr[1]}
        echo $pair >> ./.env
    fi
done
