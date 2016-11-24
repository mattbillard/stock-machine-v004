#!/usr/bin/env bash

cd ../
NODE_ENV=dev nodemon -w server -w server.js server.js
