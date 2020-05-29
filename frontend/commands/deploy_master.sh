#!/bin/sh

pm2 delete flightsrip-fe
echo "Old FE web interface stopped"
pm2 start yarn --interpreter bash --name flightsrip-fe -- start
echo "New FE web interface stopped"
