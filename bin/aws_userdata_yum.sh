#!/bin/bash
yum update
yum install -y git httpd
git clone https://github.com/TroyCode/go_home_time.git
mv go_home_time/* /var/www/html/
service httpd start