��һ��startup.sh��

export   JAVA_OPTS="$JAVA_OPTS -Xms256m -Xmx1024m -XX:PermSize=256m -XX:MaxPermSize=256m"
export   JAVA_OPTS="$JAVA_OPTS  -verbose:gc -Xloggc:../logs/gclog.log -XX:+HeapDumpOnOutOfMemoryError"
export   JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote=true"
export   JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.port=8999"   
export   JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.ssl=false" 
export   JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.authenticate=false" 
export   JAVA_OPTS="$JAVA_OPTS -Djava.rmi.server.hostname=119.254.84.180"



�ڶ���
ע��-Djava.rmi.server.hostname����������������ԣ�һ��Ҫ������ip,��������������ip
export  CATALINA_OPTS="$CATALINA_OPTS   -Dcom.sun.management.jmxremote.port=8999 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false  -Djava.rmi.server.hostname=119.254.84.180"
