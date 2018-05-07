#!/bin/sh
service tomcat stop
cd /opt/pharmarket
git fetch --all
git reset --hard origin/master
mvn -Pprod package -DskipTests
rm -rf /opt/tomcat/webapps/pharmarket.war
rm -rf /opt/tomcat/webapps/pharmarket
rm -rf /opt/tomcat/work/Catalina/localhost/
cp /opt/target/pharmarket-0.0.1.war /opt/tomcat/webapps/pharmarket.war
service tomcat start

