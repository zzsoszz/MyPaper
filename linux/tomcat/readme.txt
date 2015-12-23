第一种startup.sh加

export   JAVA_OPTS="$JAVA_OPTS -Xms256m -Xmx1024m -XX:PermSize=256m -XX:MaxPermSize=256m"
export   JAVA_OPTS="$JAVA_OPTS  -verbose:gc -Xloggc:../logs/gclog.log -XX:+HeapDumpOnOutOfMemoryError"
export   JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote=true"
export   JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.port=8999"   
export   JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.ssl=false" 
export   JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.authenticate=false" 
export   JAVA_OPTS="$JAVA_OPTS -Djava.rmi.server.hostname=119.254.84.180"



第二种
注意-Djava.rmi.server.hostname参数如果是外网调试，一定要用外网ip,内网调试用内网ip
export  CATALINA_OPTS="$CATALINA_OPTS   -Dcom.sun.management.jmxremote.port=8999 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false  -Djava.rmi.server.hostname=119.254.84.180"
