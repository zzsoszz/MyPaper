java���ⶨλ����
 



 http://blog.csdn.net/fenglibing/article/details/6411953

JDK���ù���ʹ��

һ��javah����(C Header and Stub File Generator)

����jps����(Java Virtual Machine Process Status Tool)

����jstack����(Java Stack Trace)

�ġ�jstat����(Java Virtual Machine Statistics Monitoring Tool)

�塢jmap����(Java Memory Map)

����jinfo����(Java Configuration Info)

�ߡ�jconsole����(Java Monitoring and Management Console)

�ˡ�jvisualvm����(Java Virtual Machine Monitoring, Troubleshooting, and Profiling Tool)

�š�jhat����(Java Heap Analyse Tool)

ʮ��Jdb����(The Java Debugger)

 

ʮһ��Jstatd����(Java Statistics Monitoring Daemon)

----------------------------------------------------------------
Java�ѣ�Shallow Size��Retained Size 
http://blog.csdn.net/kingzone_2008/article/details/9083327
jmap -dump:format=b,file=test.bin 4939
jmap -dump:format=b,file=outfile 
jmap -J-d64 -heap pid
jmap -histo 4939
jhat -J-Xmx512m <heap dump file>

 

 


---------------ʵս


tomcat����
vi  catalina.sh
export  CATALINA_OPTS="$CATALINA_OPTS   -Dcom.sun.management.jmxremote.port=8999 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false  -Djava.rmi.server.hostname=119.254.84.180"
ʹ��jvisualvm.exe���߼��

�鿨�ڴ�ռ������
ps -aux | sort -k4nr 

һǧ����30���ڴ����
jstat -gcutil 5584 1000 30

��ջ�鿴
jstack -l 5584

dump�ڴ���Ϣ
jmap -dump:format=b,file=test.hprof 4939

����dump����ڴ�
jhat -J-Xmx512m test.hprof

ps -aux | sort -k4nr 

-----------------------------------------------------------------------------------ʹ��MemoryAnalyzer����ڴ�й¶

1.ģ�����
package com.bxtel.demo;

import java.util.HashMap;

public class Main {

 public static void main(String[] args) {
  BigContainner bg=new BigContainner();
  HashMap userinfomap=new HashMap();
  bg.setUserinfomap(userinfomap);
  for(int i=0;i<100000000;i++)
  {
   System.out.println(i);
   UserInfo userinfo=new UserInfo();
   userinfo.setUsername("qingtian"+i);
   userinfo.setPassword("password"+i);
   CardInfo cardInfo=new CardInfo();
   cardInfo.setCardno("carno"+i);
   userinfo.setCardInfo(cardInfo);
   userinfomap.put(i, userinfo);
   try {
    Thread.sleep(1);
   } catch (InterruptedException e) {
    e.printStackTrace();
   }
   
   
  }
 }
}

