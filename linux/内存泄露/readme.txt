java问题定位技术
 



 http://blog.csdn.net/fenglibing/article/details/6411953

JDK内置工具使用

一、javah命令(C Header and Stub File Generator)

二、jps命令(Java Virtual Machine Process Status Tool)

三、jstack命令(Java Stack Trace)

四、jstat命令(Java Virtual Machine Statistics Monitoring Tool)

五、jmap命令(Java Memory Map)

六、jinfo命令(Java Configuration Info)

七、jconsole命令(Java Monitoring and Management Console)

八、jvisualvm命令(Java Virtual Machine Monitoring, Troubleshooting, and Profiling Tool)

九、jhat命令(Java Heap Analyse Tool)

十、Jdb命令(The Java Debugger)

 

十一、Jstatd命令(Java Statistics Monitoring Daemon)

----------------------------------------------------------------
Java堆：Shallow Size和Retained Size 
http://blog.csdn.net/kingzone_2008/article/details/9083327
jmap -dump:format=b,file=test.bin 4939
jmap -dump:format=b,file=outfile 
jmap -J-d64 -heap pid
jmap -histo 4939
jhat -J-Xmx512m <heap dump file>

 

 


---------------实战


tomcat配置
vi  catalina.sh
export  CATALINA_OPTS="$CATALINA_OPTS   -Dcom.sun.management.jmxremote.port=8999 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false  -Djava.rmi.server.hostname=119.254.84.180"
使用jvisualvm.exe在线监控

查卡内存占用排序
ps -aux | sort -k4nr 

一千毫秒30次内存分配
jstat -gcutil 5584 1000 30

堆栈查看
jstack -l 5584

dump内存信息
jmap -dump:format=b,file=test.hprof 4939

分析dump后的内存
jhat -J-Xmx512m test.hprof

ps -aux | sort -k4nr 

-----------------------------------------------------------------------------------使用MemoryAnalyzer检查内存泄露

1.模拟代码
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

