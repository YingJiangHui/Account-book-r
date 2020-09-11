#!/usr/bin/env bash

yarn build &
cd build &
git init &
git add . &
git commit -m 'deploy' &
git remote add gitee git@gitee.com:yingjianghui/accounts-book-website-r.git &
git push -u gitee master -f
cd -