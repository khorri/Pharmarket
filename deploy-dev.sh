#!/bin/sh
service tomcat stop
git fetch --all
git reset --hard origin/master
mvn  package -DskipTests
rm -rf /opt/tomcat/webapps/tracker.war
rm -rf /opt/tomcat/webapps/tracker
rm -rf /opt/tomcat/work/Catalina/localhost/
cp target/tracker-0.0.4-beta.war /opt/tomcat/webapps/tracker.war
service tomcat start

