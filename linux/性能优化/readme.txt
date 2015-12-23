linux查看CPU性能及工作状态的指令mpstat，vmstat，iostat，sar，top

衡量CPU性能的指标：

1，用户使用CPU的情况；
CPU运行常规用户进程
CPU运行niced process
CPU运行实时进程

2，系统使用CPU情况；
用于I/O管理：中断和驱动
用于内存管理：页面交换
用户进程管理：进程开始和上下文切换

3，WIO：用于进程等待磁盘I/O而使CPU处于空闲状态的比率。

4，CPU的空闲率，除了上面的WIO以外的空闲时间

5，CPU用于上下文交换的比率

6，nice

7，real-time

8，运行进程队列的长度

9，平均负载

Linux中常用的监控CPU整体性能的工具有：

§ mpstat： mpstat 不但能查看所有CPU的平均信息，还能查看指定CPU的信息。

§ vmstat：只能查看所有CPU的平均信息；查看cpu队列信息；

§ iostat: 只能查看所有CPU的平均信息。

§ sar： 与mpstat 一样，不但能查看CPU的平均信息，还能查看指定CPU的信息。

§ top：显示的信息同ps接近，但是top可以了解到CPU消耗，可以根据用户指定的时间来更新显示。

下面一一介绍：

一，vmstat

[root@localhost ~]#vmstat -n 3       (每个3秒刷新一次）
procs-----------memory--------------------swap-- ----io---- --system---- ------cpu--------
r b   swpd   free       buff       cache       si   so    bi    bo   in      cs        us   sy   id  wa
10    144 186164 105252 2386848    0    0     18   166  83     2          48   21  31  0
20    144 189620 105252 2386848    0    0      0   177  1039 1210   34   10  56  0
00    144 214324 105252 2386848    0    0      0    10   1071   670    32   5    63  0
00    144 202212 105252 2386848    0    0      0   189   1035   558    20   3    77  0
20    144 158772 105252 2386848    0    0      0   203  1065 2832    70  14  15  0

红色内容标示CPU相关的参数

PROC(ESSES)
--r:如果在processes中运行的序列(process r)是连续的大于在系统中的CPU的个数表示系统现在运行比较慢,有多数的进程等待CPU.
如果r的输出数大于系统中可用CPU个数的4倍的话,则系统面临着CPU短缺的问题,或者是CPU的速率过低,系统中有多数的进程在等待CPU,造成系统中进程运行过慢.
SYSTEM
--in:每秒产生的中断次数
--cs:每秒产生的上下文切换次数
上面2个值越大，会看到由内核消耗的CPU时间会越大
 
CPU
-us:用户进程消耗的CPU时间百分
us的值比较高时，说明用户进程消耗的CPU时间多，但是如果长期超50%的使用，那么我们就该考虑优化程序算法或者进行加速（比如PHP/PERL）
-sy:内核进程消耗的CPU时间百分比（sy的值高时，说明系统内核消耗的CPU资源多，这并不是良性表现，我们应该检查原因）
-wa:IO等待消耗的CPU时间百分比
wa的值高时，说明IO等待比较严重，这可能由于磁盘大量作随机访问造成，也有可能磁盘出现瓶颈（块操作）。
-id:CPU处于空闲状态时间百分比,如果空闲时间(cpu id)持续为0并且系统时间(cpu sy)是用户时间的两倍(cpu us) 系统则面临着CPU资源的短缺.

 解决办法:
当发生以上问题的时候请先调整应用程序对CPU的占用情况.使得应用程序能够更有效的使用CPU.同时可以考虑增加更多的CPU.  关于CPU的使用情况还可以结合mpstat,  ps aux top  prstat –a等等一些相应的命令来综合考虑关于具体的CPU的使用情况,和那些进程在占用大量的CPU时间.一般情况下，应用程序的问题会比较大一些.比如一些SQL语句不合理等等都会造成这样的现象.
 
二，sar
sar [options] [-A] [-o file] t [n]

在命令行中，n 和t 两个参数组合起来定义采样间隔和次数，t为采样间隔，是必须有
的参数，n为采样次数，是可选的，默认值是1，-o file表示将命令结果以二进制格式
存放在文件中，file 在此处不是关键字，是文件名。options 为命令行选项，sar命令
的选项很多，下面只列出常用选项：

-A：所有报告的总和。
-u：CPU利用率
-v：进程、I节点、文件和锁表状态。
-d：硬盘使用报告。
-r：内存和交换空间的使用统计。
-g：串口I/O的情况。
-b：缓冲区使用情况。
-a：文件读写情况。
-c：系统调用情况。
-q：报告队列长度和系统平均负载
-R：进程的活动情况。
-y：终端设备活动情况。
-w：系统交换活动。
-x { pid | SELF | ALL }：报告指定进程ID的统计信息，SELF关键字是sar进程本身的统计，ALL关键字是所有系统进程的统计。

用sar进行CPU利用率的分析
#sar -u 2 10
Linux 2.6.18-53.el5PAE (localhost.localdomain)  03/28/2009
07:40:17 PM       CPU     %user     %nice   %system   %iowait    %steal     %idle
07:40:19 PM       all         12.44      0.00         6.97          1.74         0.00        78.86
07:40:21 PM       all         26.75      0.00        12.50         16.00       0.00        44.75
07:40:23 PM       all         16.96      0.00         7.98          0.00         0.00        75.06
07:40:25 PM       all         22.50      0.00         7.00          3.25         0.00        67.25
07:40:27 PM       all         7.25        0.00         2.75          2.50         0.00        87.50
07:40:29 PM       all         20.05      0.00         8.56          2.93         0.00        68.46
07:40:31 PM       all         13.97      0.00         6.23          3.49         0.00        76.31
07:40:33 PM       all         8.25        0.00         0.75          3.50         0.00        87.50
07:40:35 PM       all         13.25      0.00         5.75          4.00         0.00        77.00
07:40:37 PM       all         10.03      0.00         0.50          2.51         0.00        86.97
Average:             all         15.15      0.00         5.91          3.99         0.00        74.95
 
在显示内容包括：

　　%user：CPU处在用户模式下的时间百分比。
        %nice：CPU处在带NICE值的用户模式下的时间百分比。
　　%system：CPU处在系统模式下的时间百分比。
　　%iowait：CPU等待输入输出完成时间的百分比。
        %steal：管理程序维护另一个虚拟处理器时，虚拟CPU的无意识等待时间百分比。
　　%idle：CPU空闲时间百分比。
        在所有的显示中，我们应主要注意%iowait和%idle，%iowait的值过高，表示硬盘存在I/O瓶颈，%idle值高，表示CPU较空闲，如果%idle值高但系统响应慢时，有可能是CPU等待分配内存，此时应加大内存容量。%idle值如果持续低于10，那么系统的CPU处理能力相对较低，表明系统中最需要解决的资源是CPU。
 
用sar进行运行进程队列长度分析：
#sar -q 2 10
Linux 2.6.18-53.el5PAE (localhost.localdomain)  03/28/2009
07:58:14 PM   runq-sz  plist-sz   ldavg-1   ldavg-5  ldavg-15
07:58:16 PM         0         493          0.64        0.56        0.49
07:58:18 PM         1         491          0.64        0.56        0.49
07:58:20 PM         1         488          0.59        0.55        0.49
07:58:22 PM         0         487          0.59        0.55        0.49
07:58:24 PM         0         485          0.59        0.55        0.49
07:58:26 PM         1         483          0.78        0.59        0.50
07:58:28 PM         0         481          0.78        0.59        0.50
07:58:30 PM         1         480          0.72        0.58        0.50
07:58:32 PM         0         477          0.72        0.58        0.50
07:58:34 PM         0         474          0.72        0.58        0.50
Average:               0         484          0.68        0.57        0.49
 
runq-sz 准备运行的进程运行队列。
plist-sz  进程队列里的进程和线程的数量
ldavg-1  前一分钟的系统平均负载(load average)
ldavg-5  前五分钟的系统平均负载(load average)
ldavg-15  前15分钟的系统平均负载(load average)
 
顺便说一下load avarage的含义
load average可以理解为每秒钟CPU等待运行的进程个数.
在Linux系统中，sar -q、uptime、w、top等命令都会有系统平均负载load average的输出，那么什么是系统平均负载呢？
　　系统平均负载被定义为在特定时间间隔内运行队列中的平均任务数。如果一个进程满足以下条件则其就会位于运行队列中：
　　- 它没有在等待I/O操作的结果
　　- 它没有主动进入等待状态(也就是没有调用'wait')
　　- 没有被停止(例如：等待终止)
　　例如：
# uptime
　　20:55:40 up 24 days,  3:06,  1 user,  load average: 8.13, 5.90, 4.94
　　命令输出的最后内容表示在过去的1、5、15分钟内运行队列中的平均进程数量。
　　一般来说只要每个CPU的当前活动进程数不大于3那么系统的性能就是良好的，如果每个CPU的任务数大于5，那么就表示这台机器的性能有严重问题。对 于上面的例子来说，假设系统有两个CPU，那么其每个CPU的当前任务数为：8.13/2=4.065。这表示该系统的性能是可以接受的。
 
三，iostat
 
#iostat -c 2 10
Linux 2.6.18-53.el5PAE (localhost.localdomain)  03/28/2009
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
                    30.10    0.00          4.89         5.63    0.00   59.38
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
                    8.46       0.00          1.74         0.25    0.00   89.55
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
                    22.06     0.00          11.28       1.25    0.00   65.41
 
四，mpstat
mpstat 是Multiprocessor Statistics的缩写，是实时系统监控工具。其报告与CPU的一些统计信息，这些信息存放在/proc/stat文件中。在多CPUs系统里，其不但能查看所有CPU的平均状况信息，而且能够查看特定CPU的信息。下面只介绍 mpstat与CPU相关的参数，mpstat的语法如下：

mpstat [-P {|ALL}] [internal [count]]

参数的含义如下：

参数 解释

-P {|ALL} 表示监控哪个CPU， cpu在[0,cpu个数-1]中取值

internal 相邻的两次采样的间隔时间

count 采样的次数，count只能和delay一起使用

当没有参数时，mpstat则显示系统启动以后所有信息的平均值。有interval时，第一行的信息自系统启动以来的平均信息。从第二行开始，输出为前一个interval时间段的平均信息。与CPU有关的输出的含义如下：

参数 解释 从/proc/stat获得数据

CPU 处理器ID

user 在internal时间段里，用户态的CPU时间（%） ，不包含 nice值为负 进程 dusr/dtotal*100

nice 在internal时间段里，nice值为负进程的CPU时间（%） dnice/dtotal*100

system 在internal时间段里，核心时间（%） dsystem/dtotal*100

iowait 在internal时间段里，硬盘IO等待时间（%） diowait/dtotal*100

irq 在internal时间段里，软中断时间（%） dirq/dtotal*100

soft 在internal时间段里，软中断时间（%） dsoftirq/dtotal*100

idle 在internal时间段里，CPU除去等待磁盘IO操作外的因为任何原因而空闲的时间闲置时间 （%） didle/dtotal*100

intr/s 在internal时间段里，每秒CPU接收的中断的次数 dintr/dtotal*100

CPU总的工作时间=total_cur=user+system+nice+idle+iowait+irq+softirq

total_pre=pre_user+ pre_system+ pre_nice+ pre_idle+ pre_iowait+ pre_irq+ pre_softirq

duser=user_cur – user_pre

dtotal=total_cur-total_pre

其中_cur 表示当前值，_pre表示interval时间前的值。上表中的所有值可取到两位小数点。
#mpstat -P ALL 2 10
Linux 2.6.18-53.el5PAE (localhost.localdomain)  03/28/2009
 
10:07:57 PM  CPU   %user   %nice    %sys %iowait    %irq   %soft  %steal   %idle    intr/s
10:07:59 PM  all   20.75    0.00   10.50    1.50    0.25    0.25    0.00   66.75   1294.50
10:07:59 PM    0   16.00    0.00    9.00    1.50    0.00    0.00    0.00   73.50   1000.50
10:07:59 PM    1   25.76    0.00   12.12    1.52    0.00    0.51    0.00   60.10    294.00



















【系统监控】性能检测vmstat,mpstat,iostat

    博客分类： linux运维 

LinuxCache活动UP 

十三个强大的Linux性能监测工具  http://www.bitscn.com/os/linux/201007/188702.html

 



    一、系统整体性能检测工具：uptime

[root@WebServer ~]# uptime （同w命令输出的第一行信息）
09:40:52 up 5 days, 57 min, 1 user, load average: 0.00, 0.00, 0.00


    uptime命令用于查看服务器运行了多长时间以及有多少个用户登录，快速获知服务器运行的负载情况。
    load average，显示了最近1-，5-，15分钟的负荷情况。
    它的值代表等待CPU处理的进程数，如果CPU没有时间处理这些进程，load average值会升高；反之则会降低。
    在CPU数量不同的情况下，值有所不同。

    二、CPU监测：mpstat （请参考MAN手册）

 

 mpstat 1 111  [1秒刷新，111次]


语法：mpstat [ options... ] [ <interval> [ <count> ] ]
[root@WebServer ~]# mpstat 1
Linux 2.6.9-89.ELsmp (WebServer) 08/18/09

10:08:25 CPU %user %nice %system %iowait %irq %soft %idle intr/s
10:08:26 all 0.00 0.00 0.00 0.00 0.00 0.00 100.00 1005.00
10:08:27 all 0.00 0.00 0.00 0.12 0.00 0.00 99.88 1031.00
10:08:28 all 0.00 0.00 0.00 0.00 0.00 0.00 100.00 1009.00
10:08:29 all 0.00 0.00 0.00 0.00 0.00 0.00 100.00 1030.00
10:08:30 all 0.00 0.00 0.00 0.00 0.00 0.00 100.00 1006.00
1.CPU （处理器编号，all表示所有处理器的平均数值）
Processor number. The keyword all indicates that statistics are calculated as averages among all processors.

2.%user （用户态的CPU利用率百分比）
Show the percentage of CPU utilization that occurred while executing at the user level (application).


3.%nice （用户态的优先级别CPU的利用率百分比）
Show the percentage of CPU utilization that occurred while executing at the user level with nice priority.

4.%system （内核态的CPU利用率百分比）
Show the percentage of CPU utilization that occurred while executing at the system level (kernel). Note that
this does not include the time spent servicing interrupts or softirqs.

5.%iowait （在interval间段内io的等待百分比，interval 为采样频率，如本文的1为每一秒钟采样一次）
Show the percentage of time that the CPU or CPUs were idle during which the system had an outstanding disk I/O request.


6.%irq （在interval间段内,CPU的中断百分比）
Show the percentage of time spent by the CPU or CPUs to service interrupts.


7.%soft （在interval间段内,CPU的软中断百分比）
Show the percentage of time spent by the CPU or CPUs to service softirqs. A softirq (software interrupt) is
one of up to 32 enumerated software interrupts which can run on multiple CPUs at once.


8.%idle （在interval间段内，CPU的闲置百分比，不包括I/O请求的等待）
Show the percentage of time that the CPU or CPUs were idle and the system did not have an outstanding
disk I/O request.


9.intr/s （在interval间段内所有的CPU每秒中断数）
Show the total number of interrupts received per second by the CPU or CPUs.

  


     三、内存监测：vmstat （请参考MAN手册）

 


vmstat 5 10 cpu总的性能

 

 

 


语法：vmstat [-V] [-n] [delay [count]]

[root@WebServer ~]# vmstat 1
procs ------- ----memory---------- ---swap-- -----io------system-- - ---cpu----
r b swpd free buff cache si so bi bo in cs us sy id wa
0 0 0 29377720 76724 3249428 0 0 0 1 4 8 0 0 100 0
0 0 0 29377720 76724 3249428 0 0 0 0 1031 76 0 0 100 0
0 0 0 29377720 76724 3249428 0 0 0 0 1010 34 0 0 100 0
0 0 0 29377720 76724 3249428 0 0 0 0 1028 78 0 0 100 0
0 0 0 29377720 76724 3249428 0 0 0 0 1025 32 0 0 100 0
0 0 0 29377720 76724 3249428 0 0 0 36 1049 82 0 0 100 0
0 0 0 29377720 76724 3249428 0 0 0 0 1025 28 0 0 100 0
0 0 0 29377720 76724 3249428 0 0 0 0 1028 78 0 0 100 0
0 0 0 29377720 76724 3249428 0 0 0 0 1006 36 0 0 100 0


 Procs：

 r: The number of processes waiting for run time. （在等待队列里的进程数）
 b: The number of processes in uninterruptible sleep. （被阻塞的进程数）

 Memory ：

 swpd: the amount of virtual memory used. （交换分区的使用总数）
 free: the amount of idle memory. （空闲的物理内存总数 ）
 buff: the amount of memory used as buffers. （作为buffer cache的内存，对块设备的读写进行缓冲）
 cache: the amount of memory used as cache. （作为page cache的内存，文件系统的cache）
 inact: the amount of inactive memory. (-a option) （不活动的内存数）
 active: the amount of active memory. (-a option) （活动的内存数）

 Swap ：
 si: Amount of memory swapped in from disk (/s).（每秒从SWAP交换分区换入到内存的数量）
 so: Amount of memory swapped to disk (/s).（每秒从内存换出到SWAP交换分区的数量）

 IO ：
 bi: Blocks received from a block device (blocks/s).（每秒从块设备读入数据的总量-->读磁盘）
 bo: Blocks sent to a block device (blocks/s). （每秒块设备写入数据的总量-->写磁盘）

 System：
 in: The number of interrupts per second, including the clock. （每秒产生的中断次数，包括时钟中断）
 cs: The number of context switches per second. （每秒产生的上下文切换次数）

 CPU ：
 These are percentages of total CPU time.
 us: Time spent running non-kernel code. (user time, including nice time) （用户进程消耗的CPU时间百分比）
 sy: Time spent running kernel code. (system time) （内核进程消耗的CPU时间百分比）
 id: Time spent idle. Prior to Linux 2.5.41, this includes IO-wait time. （IO等待消耗的CPU时间百分比）
 wa: Time spent waiting for IO. Prior to Linux 2.5.41, shown as zero. （CPU处于空闲状态时间百分比）

 

 
vmstat是一个很全面的性能分析工具，可以观察到系统的进程状态、内存使用、虚拟内存使用、磁盘的IO、中断、上下文切换、CPU使用等。对于 Linux 的性能分析，100%理解 vmstat 输出内容的含义，并能灵活应用，那对系统性能分析的能力就算是基本掌握了。
下面是vmstat命令的输出结果：
[root@monitor-www ~]# vmstat 1 5
procs — ———–memory——————–swap——io—– —-system— —–cpu—
r  b  swpd       free     buff      cache  si so  bi    bo       in    cs   us sy  id wa st
1 0 84780 909744 267428 1912076  0 0  20   94      0        0     2  1  95  1 0
1 2 84780 894968 267428 1912216  0 0   0 1396   2301 11337  8  3  89  0 0
1 0 84780 900680 267428 1912340  0 0 76 1428  1854 8082     7  2  90  0 0
1 0 84780 902544 267432 1912548  0 0 116 928  1655 7502    7  2  92   0 0
2 0 84780 900076 267432 1912948  0 0 180 904 1963 8703    10  3  87  0 0
对输出解释如下：
1）procs
a.r列表示运行和等待CPU时间片的进程数，这个值如果长期大于系统CPU个数，就说明CPU资源不足，可以考虑增加CPU；
b.b列表示在等待资源的进程数，比如正在等待I/O或者内存交换等。
2）memory
a.swpd列表示切换到内存交换区的内存数量（以KB为单位）。如果swpd的值不为0或者比较大，而且si、so的值长期为0，那么这种情况一般不用担心，不会影响系统性能；
b.free列表示当前空闲的物理内存数量（以KB为单位）；
c.buff列表示buffers cache的内存数量，一般对块设备的读写才需要缓冲；
d.cache列表示page cached的内存数量，一般作文件系统的cached，频繁访问的文件都会被cached。如果cached值较大，就说明cached文件数较多。如果此时IO中的bi比较小，就说明文件系统效率比较好。
3）swap
a.si列表示由磁盘调入内存 ，也就是内存进入内存交换区的数量；
b.so列表示由内存调入磁盘 ，也就是内存交换区进入内存的数量
c.一般情况下，si、so的值都为0，如果si、so的值长期不为0，则表示系统内存不足，需要考虑是否增加系统内存 。
4）IO
a.bi列表示从块设备读入的数据总量（即读磁盘，单位KB/秒）
b.bo列表示写入到块设备的数据总量（即写磁盘，单位KB/秒）
这里设置的bi+bo参考值为1000，如果超过1000，而且wa值比较大，则表示系统磁盘IO性能瓶颈。
5）system
a.in列表示在某一时间间隔中观察到的每秒设备中断数；
b.cs列表示每秒产生的上下文切换次数。
上面这两个值越大，会看到内核消耗的CPU时间就越多。
6）CPU
a.us列显示了用户进程消耗CPU的时间百分比。us的值比较高时，说明用户进程消耗的CPU时间多，如果长期大于50%，需要考虑优化程序啥的。
b.sy列显示了内核进程消耗CPU的时间百分比。sy的值比较高时，就说明内核消耗的CPU时间多；如果us+sy超过80%，就说明CPU的资源存在不足。
c.id列显示了CPU处在空闲状态的时间百分比；
d.wa列表示IO等待所占的CPU时间百分比。wa值越高，说明IO等待越严重。如果wa值超过20%，说明IO等待严重 。
e.st列一般不关注，虚拟机占用的时间百分比。 （Linux 2.6.11）

 

 

 

     四、网络监测： iostat  吞吐量

 

 

# iostat -x   1


avg-cpu:  %user   %nice %system %iowait  %steal   %idle
                    24.13    0.00    8.22       2.50         0.00   65.15

Device:         rrqm/s   wrqm/s     r/s     w/s   rsec/s   wsec/s avgrq-sz avgqu-sz   await  svctm  %util
sda              17.51   107.98    9.98   14.52   250.06   980.07    50.20     3.23  131.70   2.53   6.19

 

 

参数 -d 表示，显示设备（磁盘）使用状态；

-k某些使用block为单位的列强制使用Kilobytes为单位；

1 10表示，数据显示每隔1秒刷新一次，共显示10次。



tin      显示了系统为所有 tty 读取的字符总数。
tout     显示了系统为所有 tty 写入的字符总数。
% user     显示了在用户级（应用程序）执行时产生的 CPU 使用率百分比。
% sys     显示了在系统级（内核）执行时产生的 CPU 使用率百分比。
% idle     显示了在 CPU 空闲并且系统没有未完成的磁盘 I/O 请求时的时间百分比。
% iowait     显示了 CPU 空闲期间系统有未完成的磁盘 I/O 请求时的时间百分比。

 

rrqm/s:   每秒进行 merge 的读操作数目.即 delta(rmerge)/s
wrqm/s:  每秒进行 merge 的写操作数目.即 delta(wmerge)/s
r/s:           每秒完成的读 I/O 设备次数.即 delta(rio)/s
w/s :         每秒完成的写 I/O 设备次数.即 delta(wio)/s
rsec/s:    每秒读扇区数.即 delta(rsect)/s
wsec/s:  每秒写扇区数.即 delta(wsect)/s
rkB/s:      每秒读K字节数.是 rsect/s 的一半,因为每扇区大小为512字节.(需要计算)
wkB/s:    每秒写K字节数.是 wsect/s 的一半.(需要计算)
avgrq-sz: 平均每次设备I/O操作的数据大小 (扇区).delta(rsect+wsect)/delta(rio+wio)
avgqu-sz : 平均I/O队列长度.即 delta(aveq)/s/1000 (因为aveq的单位为毫秒).
await:    平均每次设备I/O操作的等待时间 (毫秒).即 delta(ruse+wuse)/delta(rio+wio)
svctm:   平均每次设备I/O操作的服务时间 (毫秒).即 delta(use)/delta(rio+wio)
%util :      一秒中有百分之多少的时间用于 I/O 操作,或者说一秒中有多少时间 I/O 队列是非空的.即 delta(use)/s/1000 (因为use的单位为毫秒)

如果 %util 接近 100%,说明产生的I/O请求太多,I/O系统已经满负荷,该磁盘可能存在瓶颈.
idle小于70% IO压力就较大了,一般读取速度有较多的wait.
同时可以结合vmstat 查看查看b参数(等待资源的进程数) 和wa参数(IO等待所占用的CPU时间的百分比,高过30%时IO压力高)
另外 await 的参数也要多和 svctm 来参考.差的过高就一定有 IO 的问题.
avgqu-sz 也是个做 IO 调优时需要注意的地方,这个就是直接每次操作的数据的大小,如果次数多,但数据拿的小的话,其实 IO 也会很小.如果数据拿的大,才IO 的数据会高.也可以通过 avgqu-sz × ( r/s or w/s ) = rsec/s or wsec/s.也就是讲,读定速度是这个来决定的.

 

 

Linux系统出现了性能问题，一般我们可以通过top、iostat、free、vmstat等命令来查看初步定位问题。其中iostat可以给我们提供丰富的IO状态数据。

1. 基本使用

$iostat -d -k 1 10

参数 -d 表示，显示设备（磁盘）使用状态；-k某些使用block为单位的列强制使用Kilobytes为单位；1 10表示，数据显示每隔1秒刷新一次，共显示10次。

$iostat -d -k 1 10

Device: tps kB_read/s kB_wrtn/s kB_read kB_wrtn

sda 39.29 21.14 1.44 441339807 29990031

sda1 0.00 0.00 0.00 1623 523

sda2 1.32 1.43 4.54 29834273 94827104

sda3 6.30 0.85 24.95 17816289 520725244

sda5 0.85 0.46 3.40 9543503 70970116

sda6 0.00 0.00 0.00 550 236

sda7 0.00 0.00 0.00 406 0

sda8 0.00 0.00 0.00 406 0

sda9 0.00 0.00 0.00 406 0

sda10 60.68 18.35 71.43 383002263 1490928140

Device: tps kB_read/s kB_wrtn/s kB_read kB_wrtn

sda 327.55 5159.18 102.04 5056 100 sda1 0.00 0.00 0.00 0 0

tps：该设备每秒的传输次数（Indicate the number of transfers per second that were issued to the device.）。“一次传输”意思是“一次I/O请求”。多个逻辑请求可能会被合并为“一次I/O请求”。“一次传输”请求的大小是未知的。

kB_read/s：每秒从设备（drive expressed）读取的数据量；

kB_wrtn/s：每秒向设备（drive expressed）写入的数据量；

kB_read：读取的总数据量；

kB_wrtn：写入的总数量数据量；

 

这些单位都为Kilobytes。

上面的例子中，我们可以看到磁盘sda以及它的各个分区的统计数据，当时统计的磁盘总TPS是39.29，下面是各个分区的TPS。（因为是瞬间值，所以总TPS并不严格等于各个分区TPS的总和）

2. -x 参数

使用-x参数我们可以获得更多统计信息。

iostat -d -x -k 1 10

Device: rrqm/s wrqm/s r/s w/s rsec/s wsec/s rkB/s wkB/s avgrq-sz avgqu-sz await svctm %util

sda 1.56 28.31 7.80 31.49 42.51 2.92 21.26 1.46 1.16 0.03 0.79 2.62 10.28

Device: rrqm/s wrqm/s r/s w/s rsec/s wsec/s rkB/s wkB/s avgrq-sz avgqu-sz await svctm %util

sda 2.00 20.00 381.00 7.00 12320.00 216.00 6160.00 108.00 32.31 1.75 4.50 2.17 84.20

rrqm/s：每秒这个设备相关的读取请求有多少被Merge了（当系统调用需要读取数据的时候，VFS将请求发到各个FS，如果FS发现不同的读取请求读取的是相同Block的数据，FS会将这个请求合并Merge）；wrqm/s：每秒这个设备相关的写入请求有多少被Merge了。

rsec/s：每秒读取的扇区数；wsec/：每秒写入的扇区数。r/s：The number of read requests that were issued to the device per second；w/s：The number of write requests that were issued to the device per second；

await：每一个IO请求的处理的平均时间（单位是微秒毫秒）。这里可以理解为IO的响应时间，一般地系统IO响应时间应该低于5ms，如果大于10ms就比较大了。

%util：在统计时间内所有处理IO时间，除以总共统计时间。例如，如果统计间隔1秒，该设备有0.8秒在处理IO，而0.2秒闲置，那么该设备的%util = 0.8/1 = 80%，所以该参数暗示了设备的繁忙程度。一般地，如果该参数是100%表示设备已经接近满负荷运行了 （当然如果是多磁盘，即使%util是100%，因为磁盘的并发能力，所以磁盘使用未必就到了瓶颈）。

3. -c 参数

iostat还可以用来获取cpu部分状态值：

iostat -c 1 10

avg-cpu: %user %nice %sys %iowait %idle 1.98 0.00 0.35 11.45 86.22

avg-cpu: %user %nice %sys %iowait %idle 1.62 0.00 0.25 34.46 63.67

4. 常见用法

$iostat -d -k 1 10 #查看TPS和吞吐量信息 iostat -d -x -k 1 10 #查看设备使用率（%util）、响应时间（await） iostat -c 1 10 #查看cpu状态

5. 实例分析

$iostat -d -k 1 |grep sda10

Device: tps kB_read/s kB_wrtn/s kB_read kB_wrtn

sda10 60.72 18.95 71.53 395637647 1493241908

sda10 299.02 4266.67 129.41 4352 132

sda10 483.84 4589.90 4117.17 4544 4076

sda10 218.00 3360.00 100.00 3360 100

sda10 546.00 8784.00 124.00 8784 124

sda10 827.00 13232.00 136.00 13232 136

上面看到，磁盘每秒传输次数平均约400；每秒磁盘读取约5MB，写入约1MB。

iostat -d -x -k 1

Device: rrqm/s wrqm/s r/s w/s rsec/s wsec/s rkB/s wkB/s avgrq-sz avgqu-sz await svctm %util

sda 1.56 28.31 7.84 31.50 43.65 3.16 21.82 1.58 1.19 0.03 0.80 2.61 10.29

sda 1.98 24.75 419.80 6.93 13465.35 253.47 6732.67 126.73 32.15 2.00 4.70 2.00 85.25

sda 3.06 41.84 444.90 54.08 14204.08 2048.98 7102.04 1024.49 32.57 2.10 4.21 1.85 92.24

可以看到磁盘的平均响应时间<5ms，磁盘使用率>80。磁盘响应正常，但是已经很繁忙了。

 


     五、网络监测： lsof （请参考MAN手册）

    由于公司的程序要在一个端口监听，所以要监测该端口的状态信息。这里用22端口讲解

[root@WebServer ~]# lsof -i:22
COMMAND PID USER FD TYPE DEVICE SIZE NODE NAME
sshd 11664 root 3u IPv6 109820 TCP 192.168.0.157:22->192.168.0.99:1174 (ESTABLISHED)
sshd 24927 root 3u IPv6 62643 TCP *:22 (LISTEN)
