#!/bin/sh

yarn install
echo "Installed NPM packages"
pm2 delete flightsrip-be
echo "Old BE web interface stopped"
pm2 start yarn --interpreter bash --name flightsrip-be -- start
echo "New BE web interface stopped"