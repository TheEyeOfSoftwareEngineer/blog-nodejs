#!/bin/sh

cd /Users/yao/VscodeProjects/blog-nodejs/blog-nodejs/blog-nodejs/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "">access.log