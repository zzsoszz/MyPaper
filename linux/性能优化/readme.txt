linux�鿴CPU���ܼ�����״̬��ָ��mpstat��vmstat��iostat��sar��top

����CPU���ܵ�ָ�꣺

1���û�ʹ��CPU�������
CPU���г����û�����
CPU����niced process
CPU����ʵʱ����

2��ϵͳʹ��CPU�����
����I/O�����жϺ�����
�����ڴ����ҳ�潻��
�û����̹������̿�ʼ���������л�

3��WIO�����ڽ��̵ȴ�����I/O��ʹCPU���ڿ���״̬�ı��ʡ�

4��CPU�Ŀ����ʣ����������WIO����Ŀ���ʱ��

5��CPU���������Ľ����ı���

6��nice

7��real-time

8�����н��̶��еĳ���

9��ƽ������

Linux�г��õļ��CPU�������ܵĹ����У�

�� mpstat�� mpstat �����ܲ鿴����CPU��ƽ����Ϣ�����ܲ鿴ָ��CPU����Ϣ��

�� vmstat��ֻ�ܲ鿴����CPU��ƽ����Ϣ���鿴cpu������Ϣ��

�� iostat: ֻ�ܲ鿴����CPU��ƽ����Ϣ��

�� sar�� ��mpstat һ���������ܲ鿴CPU��ƽ����Ϣ�����ܲ鿴ָ��CPU����Ϣ��

�� top����ʾ����Ϣͬps�ӽ�������top�����˽⵽CPU���ģ����Ը����û�ָ����ʱ����������ʾ��

����һһ���ܣ�

һ��vmstat

[root@localhost ~]#vmstat -n 3       (ÿ��3��ˢ��һ�Σ�
procs-----------memory--------------------swap-- ----io---- --system---- ------cpu--------
r b   swpd   free       buff       cache       si   so    bi    bo   in      cs        us   sy   id  wa
10    144 186164 105252 2386848    0    0     18   166  83     2          48   21  31  0
20    144 189620 105252 2386848    0    0      0   177  1039 1210   34   10  56  0
00    144 214324 105252 2386848    0    0      0    10   1071   670    32   5    63  0
00    144 202212 105252 2386848    0    0      0   189   1035   558    20   3    77  0
20    144 158772 105252 2386848    0    0      0   203  1065 2832    70  14  15  0

��ɫ���ݱ�ʾCPU��صĲ���

PROC(ESSES)
--r:�����processes�����е�����(process r)�������Ĵ�����ϵͳ�е�CPU�ĸ�����ʾϵͳ�������бȽ���,�ж����Ľ��̵ȴ�CPU.
���r�����������ϵͳ�п���CPU������4���Ļ�,��ϵͳ������CPU��ȱ������,������CPU�����ʹ���,ϵͳ���ж����Ľ����ڵȴ�CPU,���ϵͳ�н������й���.
SYSTEM
--in:ÿ��������жϴ���
--cs:ÿ��������������л�����
����2��ֵԽ�󣬻ῴ�����ں����ĵ�CPUʱ���Խ��
 
CPU
-us:�û��������ĵ�CPUʱ��ٷ�
us��ֵ�Ƚϸ�ʱ��˵���û��������ĵ�CPUʱ��࣬����������ڳ�50%��ʹ�ã���ô���Ǿ͸ÿ����Ż������㷨���߽��м��٣�����PHP/PERL��
-sy:�ں˽������ĵ�CPUʱ��ٷֱȣ�sy��ֵ��ʱ��˵��ϵͳ�ں����ĵ�CPU��Դ�࣬�Ⲣ�������Ա��֣�����Ӧ�ü��ԭ��
-wa:IO�ȴ����ĵ�CPUʱ��ٷֱ�
wa��ֵ��ʱ��˵��IO�ȴ��Ƚ����أ���������ڴ��̴��������������ɣ�Ҳ�п��ܴ��̳���ƿ�������������
-id:CPU���ڿ���״̬ʱ��ٷֱ�,�������ʱ��(cpu id)����Ϊ0����ϵͳʱ��(cpu sy)���û�ʱ�������(cpu us) ϵͳ��������CPU��Դ�Ķ�ȱ.

 ����취:
���������������ʱ�����ȵ���Ӧ�ó����CPU��ռ�����.ʹ��Ӧ�ó����ܹ�����Ч��ʹ��CPU.ͬʱ���Կ������Ӹ����CPU.  ����CPU��ʹ����������Խ��mpstat,  ps aux top  prstat �Ca�ȵ�һЩ��Ӧ���������ۺϿ��ǹ��ھ����CPU��ʹ�����,����Щ������ռ�ô�����CPUʱ��.һ������£�Ӧ�ó���������Ƚϴ�һЩ.����һЩSQL��䲻����ȵȶ����������������.
 
����sar
sar [options] [-A] [-o file] t [n]

���������У�n ��t ��������������������������ʹ�����tΪ����������Ǳ�����
�Ĳ�����nΪ�����������ǿ�ѡ�ģ�Ĭ��ֵ��1��-o file��ʾ���������Զ����Ƹ�ʽ
������ļ��У�file �ڴ˴����ǹؼ��֣����ļ�����options Ϊ������ѡ�sar����
��ѡ��ܶ࣬����ֻ�г�����ѡ�

-A�����б�����ܺ͡�
-u��CPU������
-v�����̡�I�ڵ㡢�ļ�������״̬��
-d��Ӳ��ʹ�ñ��档
-r���ڴ�ͽ����ռ��ʹ��ͳ�ơ�
-g������I/O�������
-b��������ʹ�������
-a���ļ���д�����
-c��ϵͳ���������
-q��������г��Ⱥ�ϵͳƽ������
-R�����̵Ļ�����
-y���ն��豸������
-w��ϵͳ�������
-x { pid | SELF | ALL }������ָ������ID��ͳ����Ϣ��SELF�ؼ�����sar���̱����ͳ�ƣ�ALL�ؼ���������ϵͳ���̵�ͳ�ơ�

��sar����CPU�����ʵķ���
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
 
����ʾ���ݰ�����

����%user��CPU�����û�ģʽ�µ�ʱ��ٷֱȡ�
        %nice��CPU���ڴ�NICEֵ���û�ģʽ�µ�ʱ��ٷֱȡ�
����%system��CPU����ϵͳģʽ�µ�ʱ��ٷֱȡ�
����%iowait��CPU�ȴ�����������ʱ��İٷֱȡ�
        %steal���������ά����һ�����⴦����ʱ������CPU������ʶ�ȴ�ʱ��ٷֱȡ�
����%idle��CPU����ʱ��ٷֱȡ�
        �����е���ʾ�У�����Ӧ��Ҫע��%iowait��%idle��%iowait��ֵ���ߣ���ʾӲ�̴���I/Oƿ����%idleֵ�ߣ���ʾCPU�Ͽ��У����%idleֵ�ߵ�ϵͳ��Ӧ��ʱ���п�����CPU�ȴ������ڴ棬��ʱӦ�Ӵ��ڴ�������%idleֵ�����������10����ôϵͳ��CPU����������Խϵͣ�����ϵͳ������Ҫ�������Դ��CPU��
 
��sar�������н��̶��г��ȷ�����
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
 
runq-sz ׼�����еĽ������ж��С�
plist-sz  ���̶�����Ľ��̺��̵߳�����
ldavg-1  ǰһ���ӵ�ϵͳƽ������(load average)
ldavg-5  ǰ����ӵ�ϵͳƽ������(load average)
ldavg-15  ǰ15���ӵ�ϵͳƽ������(load average)
 
˳��˵һ��load avarage�ĺ���
load average�������Ϊÿ����CPU�ȴ����еĽ��̸���.
��Linuxϵͳ�У�sar -q��uptime��w��top���������ϵͳƽ������load average���������ôʲô��ϵͳƽ�������أ�
����ϵͳƽ�����ر�����Ϊ���ض�ʱ���������ж����е�ƽ�������������һ����������������������ͻ�λ�����ж����У�
����- ��û���ڵȴ�I/O�����Ľ��
����- ��û����������ȴ�״̬(Ҳ����û�е���'wait')
����- û�б�ֹͣ(���磺�ȴ���ֹ)
�������磺
# uptime
����20:55:40 up 24 days,  3:06,  1 user,  load average: 8.13, 5.90, 4.94
�������������������ݱ�ʾ�ڹ�ȥ��1��5��15���������ж����е�ƽ������������
����һ����˵ֻҪÿ��CPU�ĵ�ǰ�������������3��ôϵͳ�����ܾ������õģ����ÿ��CPU������������5����ô�ͱ�ʾ��̨�������������������⡣�� �������������˵������ϵͳ������CPU����ô��ÿ��CPU�ĵ�ǰ������Ϊ��8.13/2=4.065�����ʾ��ϵͳ�������ǿ��Խ��ܵġ�
 
����iostat
 
#iostat -c 2 10
Linux 2.6.18-53.el5PAE (localhost.localdomain)  03/28/2009
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
                    30.10    0.00          4.89         5.63    0.00   59.38
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
                    8.46       0.00          1.74         0.25    0.00   89.55
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
                    22.06     0.00          11.28       1.25    0.00   65.41
 
�ģ�mpstat
mpstat ��Multiprocessor Statistics����д����ʵʱϵͳ��ع��ߡ��䱨����CPU��һЩͳ����Ϣ����Щ��Ϣ�����/proc/stat�ļ��С��ڶ�CPUsϵͳ��䲻���ܲ鿴����CPU��ƽ��״����Ϣ�������ܹ��鿴�ض�CPU����Ϣ������ֻ���� mpstat��CPU��صĲ�����mpstat���﷨���£�

mpstat [-P {|ALL}] [internal [count]]

�����ĺ������£�

���� ����

-P {|ALL} ��ʾ����ĸ�CPU�� cpu��[0,cpu����-1]��ȡֵ

internal ���ڵ����β����ļ��ʱ��

count �����Ĵ�����countֻ�ܺ�delayһ��ʹ��

��û�в���ʱ��mpstat����ʾϵͳ�����Ժ�������Ϣ��ƽ��ֵ����intervalʱ����һ�е���Ϣ��ϵͳ����������ƽ����Ϣ���ӵڶ��п�ʼ�����Ϊǰһ��intervalʱ��ε�ƽ����Ϣ����CPU�йص�����ĺ������£�

���� ���� ��/proc/stat�������

CPU ������ID

user ��internalʱ�����û�̬��CPUʱ�䣨%�� �������� niceֵΪ�� ���� dusr/dtotal*100

nice ��internalʱ����niceֵΪ�����̵�CPUʱ�䣨%�� dnice/dtotal*100

system ��internalʱ��������ʱ�䣨%�� dsystem/dtotal*100

iowait ��internalʱ����Ӳ��IO�ȴ�ʱ�䣨%�� diowait/dtotal*100

irq ��internalʱ�������ж�ʱ�䣨%�� dirq/dtotal*100

soft ��internalʱ�������ж�ʱ�䣨%�� dsoftirq/dtotal*100

idle ��internalʱ����CPU��ȥ�ȴ�����IO���������Ϊ�κ�ԭ������е�ʱ������ʱ�� ��%�� didle/dtotal*100

intr/s ��internalʱ����ÿ��CPU���յ��жϵĴ��� dintr/dtotal*100

CPU�ܵĹ���ʱ��=total_cur=user+system+nice+idle+iowait+irq+softirq

total_pre=pre_user+ pre_system+ pre_nice+ pre_idle+ pre_iowait+ pre_irq+ pre_softirq

duser=user_cur �C user_pre

dtotal=total_cur-total_pre

����_cur ��ʾ��ǰֵ��_pre��ʾintervalʱ��ǰ��ֵ���ϱ��е�����ֵ��ȡ����λС���㡣
#mpstat -P ALL 2 10
Linux 2.6.18-53.el5PAE (localhost.localdomain)  03/28/2009
 
10:07:57 PM  CPU   %user   %nice    %sys %iowait    %irq   %soft  %steal   %idle    intr/s
10:07:59 PM  all   20.75    0.00   10.50    1.50    0.25    0.25    0.00   66.75   1294.50
10:07:59 PM    0   16.00    0.00    9.00    1.50    0.00    0.00    0.00   73.50   1000.50
10:07:59 PM    1   25.76    0.00   12.12    1.52    0.00    0.51    0.00   60.10    294.00



















��ϵͳ��ء����ܼ��vmstat,mpstat,iostat

    ���ͷ��ࣺ linux��ά 

LinuxCache�UP 

ʮ����ǿ���Linux���ܼ�⹤��  http://www.bitscn.com/os/linux/201007/188702.html

 



    һ��ϵͳ�������ܼ�⹤�ߣ�uptime

[root@WebServer ~]# uptime ��ͬw��������ĵ�һ����Ϣ��
09:40:52 up 5 days, 57 min, 1 user, load average: 0.00, 0.00, 0.00


    uptime�������ڲ鿴�����������˶೤ʱ���Լ��ж��ٸ��û���¼�����ٻ�֪���������еĸ��������
    load average����ʾ�����1-��5-��15���ӵĸ��������
    ����ֵ����ȴ�CPU����Ľ����������CPUû��ʱ�䴦����Щ���̣�load averageֵ�����ߣ���֮��ή�͡�
    ��CPU������ͬ������£�ֵ������ͬ��

    ����CPU��⣺mpstat ����ο�MAN�ֲᣩ

 

 mpstat 1 111  [1��ˢ�£�111��]


�﷨��mpstat [ options... ] [ <interval> [ <count> ] ]
[root@WebServer ~]# mpstat 1
Linux 2.6.9-89.ELsmp (WebServer) 08/18/09

10:08:25 CPU %user %nice %system %iowait %irq %soft %idle intr/s
10:08:26 all 0.00 0.00 0.00 0.00 0.00 0.00 100.00 1005.00
10:08:27 all 0.00 0.00 0.00 0.12 0.00 0.00 99.88 1031.00
10:08:28 all 0.00 0.00 0.00 0.00 0.00 0.00 100.00 1009.00
10:08:29 all 0.00 0.00 0.00 0.00 0.00 0.00 100.00 1030.00
10:08:30 all 0.00 0.00 0.00 0.00 0.00 0.00 100.00 1006.00
1.CPU ����������ţ�all��ʾ���д�������ƽ����ֵ��
Processor number. The keyword all indicates that statistics are calculated as averages among all processors.

2.%user ���û�̬��CPU�����ʰٷֱȣ�
Show the percentage of CPU utilization that occurred while executing at the user level (application).


3.%nice ���û�̬�����ȼ���CPU�������ʰٷֱȣ�
Show the percentage of CPU utilization that occurred while executing at the user level with nice priority.

4.%system ���ں�̬��CPU�����ʰٷֱȣ�
Show the percentage of CPU utilization that occurred while executing at the system level (kernel). Note that
this does not include the time spent servicing interrupts or softirqs.

5.%iowait ����interval�����io�ĵȴ��ٷֱȣ�interval Ϊ����Ƶ�ʣ��籾�ĵ�1Ϊÿһ���Ӳ���һ�Σ�
Show the percentage of time that the CPU or CPUs were idle during which the system had an outstanding disk I/O request.


6.%irq ����interval�����,CPU���жϰٷֱȣ�
Show the percentage of time spent by the CPU or CPUs to service interrupts.


7.%soft ����interval�����,CPU�����жϰٷֱȣ�
Show the percentage of time spent by the CPU or CPUs to service softirqs. A softirq (software interrupt) is
one of up to 32 enumerated software interrupts which can run on multiple CPUs at once.


8.%idle ����interval����ڣ�CPU�����ðٷֱȣ�������I/O����ĵȴ���
Show the percentage of time that the CPU or CPUs were idle and the system did not have an outstanding
disk I/O request.


9.intr/s ����interval��������е�CPUÿ���ж�����
Show the total number of interrupts received per second by the CPU or CPUs.

  


     �����ڴ��⣺vmstat ����ο�MAN�ֲᣩ

 


vmstat 5 10 cpu�ܵ�����

 

 

 


�﷨��vmstat [-V] [-n] [delay [count]]

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


 Procs��

 r: The number of processes waiting for run time. ���ڵȴ�������Ľ�������
 b: The number of processes in uninterruptible sleep. ���������Ľ�������

 Memory ��

 swpd: the amount of virtual memory used. ������������ʹ��������
 free: the amount of idle memory. �����е������ڴ����� ��
 buff: the amount of memory used as buffers. ����Ϊbuffer cache���ڴ棬�Կ��豸�Ķ�д���л��壩
 cache: the amount of memory used as cache. ����Ϊpage cache���ڴ棬�ļ�ϵͳ��cache��
 inact: the amount of inactive memory. (-a option) ��������ڴ�����
 active: the amount of active memory. (-a option) ������ڴ�����

 Swap ��
 si: Amount of memory swapped in from disk (/s).��ÿ���SWAP�����������뵽�ڴ��������
 so: Amount of memory swapped to disk (/s).��ÿ����ڴ滻����SWAP����������������

 IO ��
 bi: Blocks received from a block device (blocks/s).��ÿ��ӿ��豸�������ݵ�����-->�����̣�
 bo: Blocks sent to a block device (blocks/s). ��ÿ����豸д�����ݵ�����-->д���̣�

 System��
 in: The number of interrupts per second, including the clock. ��ÿ��������жϴ���������ʱ���жϣ�
 cs: The number of context switches per second. ��ÿ��������������л�������

 CPU ��
 These are percentages of total CPU time.
 us: Time spent running non-kernel code. (user time, including nice time) ���û��������ĵ�CPUʱ��ٷֱȣ�
 sy: Time spent running kernel code. (system time) ���ں˽������ĵ�CPUʱ��ٷֱȣ�
 id: Time spent idle. Prior to Linux 2.5.41, this includes IO-wait time. ��IO�ȴ����ĵ�CPUʱ��ٷֱȣ�
 wa: Time spent waiting for IO. Prior to Linux 2.5.41, shown as zero. ��CPU���ڿ���״̬ʱ��ٷֱȣ�

 

 
vmstat��һ����ȫ������ܷ������ߣ����Թ۲쵽ϵͳ�Ľ���״̬���ڴ�ʹ�á������ڴ�ʹ�á����̵�IO���жϡ��������л���CPUʹ�õȡ����� Linux �����ܷ�����100%��� vmstat ������ݵĺ��壬�������Ӧ�ã��Ƕ�ϵͳ���ܷ��������������ǻ��������ˡ�
������vmstat�������������
[root@monitor-www ~]# vmstat 1 5
procs �� �������Cmemory�������������Cswap����io���C ��-system�� ���Ccpu��
r  b  swpd       free     buff      cache  si so  bi    bo       in    cs   us sy  id wa st
1 0 84780 909744 267428 1912076  0 0  20   94      0        0     2  1  95  1 0
1 2 84780 894968 267428 1912216  0 0   0 1396   2301 11337  8  3  89  0 0
1 0 84780 900680 267428 1912340  0 0 76 1428  1854 8082     7  2  90  0 0
1 0 84780 902544 267432 1912548  0 0 116 928  1655 7502    7  2  92   0 0
2 0 84780 900076 267432 1912948  0 0 180 904 1963 8703    10  3  87  0 0
������������£�
1��procs
a.r�б�ʾ���к͵ȴ�CPUʱ��Ƭ�Ľ����������ֵ������ڴ���ϵͳCPU��������˵��CPU��Դ���㣬���Կ�������CPU��
b.b�б�ʾ�ڵȴ���Դ�Ľ��������������ڵȴ�I/O�����ڴ潻���ȡ�
2��memory
a.swpd�б�ʾ�л����ڴ潻�������ڴ���������KBΪ��λ�������swpd��ֵ��Ϊ0���߱Ƚϴ󣬶���si��so��ֵ����Ϊ0����ô�������һ�㲻�õ��ģ�����Ӱ��ϵͳ���ܣ�
b.free�б�ʾ��ǰ���е������ڴ���������KBΪ��λ����
c.buff�б�ʾbuffers cache���ڴ�������һ��Կ��豸�Ķ�д����Ҫ���壻
d.cache�б�ʾpage cached���ڴ�������һ�����ļ�ϵͳ��cached��Ƶ�����ʵ��ļ����ᱻcached�����cachedֵ�ϴ󣬾�˵��cached�ļ����϶ࡣ�����ʱIO�е�bi�Ƚ�С����˵���ļ�ϵͳЧ�ʱȽϺá�
3��swap
a.si�б�ʾ�ɴ��̵����ڴ� ��Ҳ�����ڴ�����ڴ潻������������
b.so�б�ʾ���ڴ������� ��Ҳ�����ڴ潻���������ڴ������
c.һ������£�si��so��ֵ��Ϊ0�����si��so��ֵ���ڲ�Ϊ0�����ʾϵͳ�ڴ治�㣬��Ҫ�����Ƿ�����ϵͳ�ڴ� ��
4��IO
a.bi�б�ʾ�ӿ��豸����������������������̣���λKB/�룩
b.bo�б�ʾд�뵽���豸��������������д���̣���λKB/�룩
�������õ�bi+bo�ο�ֵΪ1000���������1000������waֵ�Ƚϴ����ʾϵͳ����IO����ƿ����
5��system
a.in�б�ʾ��ĳһʱ�����й۲쵽��ÿ���豸�ж�����
b.cs�б�ʾÿ��������������л�������
����������ֵԽ�󣬻ῴ���ں����ĵ�CPUʱ���Խ�ࡣ
6��CPU
a.us����ʾ���û���������CPU��ʱ��ٷֱȡ�us��ֵ�Ƚϸ�ʱ��˵���û��������ĵ�CPUʱ��࣬������ڴ���50%����Ҫ�����Ż�����ɶ�ġ�
b.sy����ʾ���ں˽�������CPU��ʱ��ٷֱȡ�sy��ֵ�Ƚϸ�ʱ����˵���ں����ĵ�CPUʱ��ࣻ���us+sy����80%����˵��CPU����Դ���ڲ��㡣
c.id����ʾ��CPU���ڿ���״̬��ʱ��ٷֱȣ�
d.wa�б�ʾIO�ȴ���ռ��CPUʱ��ٷֱȡ�waֵԽ�ߣ�˵��IO�ȴ�Խ���ء����waֵ����20%��˵��IO�ȴ����� ��
e.st��һ�㲻��ע�������ռ�õ�ʱ��ٷֱȡ� ��Linux 2.6.11��

 

 

 

     �ġ������⣺ iostat  ������

 

 

# iostat -x   1


avg-cpu:  %user   %nice %system %iowait  %steal   %idle
                    24.13    0.00    8.22       2.50         0.00   65.15

Device:         rrqm/s   wrqm/s     r/s     w/s   rsec/s   wsec/s avgrq-sz avgqu-sz   await  svctm  %util
sda              17.51   107.98    9.98   14.52   250.06   980.07    50.20     3.23  131.70   2.53   6.19

 

 

���� -d ��ʾ����ʾ�豸�����̣�ʹ��״̬��

-kĳЩʹ��blockΪ��λ����ǿ��ʹ��KilobytesΪ��λ��

1 10��ʾ��������ʾÿ��1��ˢ��һ�Σ�����ʾ10�Ρ�



tin      ��ʾ��ϵͳΪ���� tty ��ȡ���ַ�������
tout     ��ʾ��ϵͳΪ���� tty д����ַ�������
% user     ��ʾ�����û�����Ӧ�ó���ִ��ʱ������ CPU ʹ���ʰٷֱȡ�
% sys     ��ʾ����ϵͳ�����ںˣ�ִ��ʱ������ CPU ʹ���ʰٷֱȡ�
% idle     ��ʾ���� CPU ���в���ϵͳû��δ��ɵĴ��� I/O ����ʱ��ʱ��ٷֱȡ�
% iowait     ��ʾ�� CPU �����ڼ�ϵͳ��δ��ɵĴ��� I/O ����ʱ��ʱ��ٷֱȡ�

 

rrqm/s:   ÿ����� merge �Ķ�������Ŀ.�� delta(rmerge)/s
wrqm/s:  ÿ����� merge ��д������Ŀ.�� delta(wmerge)/s
r/s:           ÿ����ɵĶ� I/O �豸����.�� delta(rio)/s
w/s :         ÿ����ɵ�д I/O �豸����.�� delta(wio)/s
rsec/s:    ÿ���������.�� delta(rsect)/s
wsec/s:  ÿ��д������.�� delta(wsect)/s
rkB/s:      ÿ���K�ֽ���.�� rsect/s ��һ��,��Ϊÿ������СΪ512�ֽ�.(��Ҫ����)
wkB/s:    ÿ��дK�ֽ���.�� wsect/s ��һ��.(��Ҫ����)
avgrq-sz: ƽ��ÿ���豸I/O���������ݴ�С (����).delta(rsect+wsect)/delta(rio+wio)
avgqu-sz : ƽ��I/O���г���.�� delta(aveq)/s/1000 (��Ϊaveq�ĵ�λΪ����).
await:    ƽ��ÿ���豸I/O�����ĵȴ�ʱ�� (����).�� delta(ruse+wuse)/delta(rio+wio)
svctm:   ƽ��ÿ���豸I/O�����ķ���ʱ�� (����).�� delta(use)/delta(rio+wio)
%util :      һ�����аٷ�֮���ٵ�ʱ������ I/O ����,����˵һ�����ж���ʱ�� I/O �����Ƿǿյ�.�� delta(use)/s/1000 (��Ϊuse�ĵ�λΪ����)

��� %util �ӽ� 100%,˵��������I/O����̫��,I/Oϵͳ�Ѿ�������,�ô��̿��ܴ���ƿ��.
idleС��70% IOѹ���ͽϴ���,һ���ȡ�ٶ��н϶��wait.
ͬʱ���Խ��vmstat �鿴�鿴b����(�ȴ���Դ�Ľ�����) ��wa����(IO�ȴ���ռ�õ�CPUʱ��İٷֱ�,�߹�30%ʱIOѹ����)
���� await �Ĳ���ҲҪ��� svctm ���ο�.��Ĺ��߾�һ���� IO ������.
avgqu-sz Ҳ�Ǹ��� IO ����ʱ��Ҫע��ĵط�,�������ֱ��ÿ�β��������ݵĴ�С,���������,�������õ�С�Ļ�,��ʵ IO Ҳ���С.��������õĴ�,��IO �����ݻ��.Ҳ����ͨ�� avgqu-sz �� ( r/s or w/s ) = rsec/s or wsec/s.Ҳ���ǽ�,�����ٶ��������������.

 

 

Linuxϵͳ�������������⣬һ�����ǿ���ͨ��top��iostat��free��vmstat���������鿴������λ���⡣����iostat���Ը������ṩ�ḻ��IO״̬���ݡ�

1. ����ʹ��

$iostat -d -k 1 10

���� -d ��ʾ����ʾ�豸�����̣�ʹ��״̬��-kĳЩʹ��blockΪ��λ����ǿ��ʹ��KilobytesΪ��λ��1 10��ʾ��������ʾÿ��1��ˢ��һ�Σ�����ʾ10�Ρ�

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

tps�����豸ÿ��Ĵ��������Indicate the number of transfers per second that were issued to the device.������һ�δ��䡱��˼�ǡ�һ��I/O���󡱡�����߼�������ܻᱻ�ϲ�Ϊ��һ��I/O���󡱡���һ�δ��䡱����Ĵ�С��δ֪�ġ�

kB_read/s��ÿ����豸��drive expressed����ȡ����������

kB_wrtn/s��ÿ�����豸��drive expressed��д�����������

kB_read����ȡ������������

kB_wrtn��д�����������������

 

��Щ��λ��ΪKilobytes��

����������У����ǿ��Կ�������sda�Լ����ĸ���������ͳ�����ݣ���ʱͳ�ƵĴ�����TPS��39.29�������Ǹ���������TPS������Ϊ��˲��ֵ��������TPS�����ϸ���ڸ�������TPS���ܺͣ�

2. -x ����

ʹ��-x�������ǿ��Ի�ø���ͳ����Ϣ��

iostat -d -x -k 1 10

Device: rrqm/s wrqm/s r/s w/s rsec/s wsec/s rkB/s wkB/s avgrq-sz avgqu-sz await svctm %util

sda 1.56 28.31 7.80 31.49 42.51 2.92 21.26 1.46 1.16 0.03 0.79 2.62 10.28

Device: rrqm/s wrqm/s r/s w/s rsec/s wsec/s rkB/s wkB/s avgrq-sz avgqu-sz await svctm %util

sda 2.00 20.00 381.00 7.00 12320.00 216.00 6160.00 108.00 32.31 1.75 4.50 2.17 84.20

rrqm/s��ÿ������豸��صĶ�ȡ�����ж��ٱ�Merge�ˣ���ϵͳ������Ҫ��ȡ���ݵ�ʱ��VFS�����󷢵�����FS�����FS���ֲ�ͬ�Ķ�ȡ�����ȡ������ͬBlock�����ݣ�FS�Ὣ�������ϲ�Merge����wrqm/s��ÿ������豸��ص�д�������ж��ٱ�Merge�ˡ�

rsec/s��ÿ���ȡ����������wsec/��ÿ��д�����������r/s��The number of read requests that were issued to the device per second��w/s��The number of write requests that were issued to the device per second��

await��ÿһ��IO����Ĵ����ƽ��ʱ�䣨��λ��΢����룩������������ΪIO����Ӧʱ�䣬һ���ϵͳIO��Ӧʱ��Ӧ�õ���5ms���������10ms�ͱȽϴ��ˡ�

%util����ͳ��ʱ�������д���IOʱ�䣬�����ܹ�ͳ��ʱ�䡣���磬���ͳ�Ƽ��1�룬���豸��0.8���ڴ���IO����0.2�����ã���ô���豸��%util = 0.8/1 = 80%�����Ըò�����ʾ���豸�ķ�æ�̶ȡ�һ��أ�����ò�����100%��ʾ�豸�Ѿ��ӽ������������� ����Ȼ����Ƕ���̣���ʹ%util��100%����Ϊ���̵Ĳ������������Դ���ʹ��δ�ؾ͵���ƿ������

3. -c ����

iostat������������ȡcpu����״ֵ̬��

iostat -c 1 10

avg-cpu: %user %nice %sys %iowait %idle 1.98 0.00 0.35 11.45 86.22

avg-cpu: %user %nice %sys %iowait %idle 1.62 0.00 0.25 34.46 63.67

4. �����÷�

$iostat -d -k 1 10 #�鿴TPS����������Ϣ iostat -d -x -k 1 10 #�鿴�豸ʹ���ʣ�%util������Ӧʱ�䣨await�� iostat -c 1 10 #�鿴cpu״̬

5. ʵ������

$iostat -d -k 1 |grep sda10

Device: tps kB_read/s kB_wrtn/s kB_read kB_wrtn

sda10 60.72 18.95 71.53 395637647 1493241908

sda10 299.02 4266.67 129.41 4352 132

sda10 483.84 4589.90 4117.17 4544 4076

sda10 218.00 3360.00 100.00 3360 100

sda10 546.00 8784.00 124.00 8784 124

sda10 827.00 13232.00 136.00 13232 136

���濴��������ÿ�봫�����ƽ��Լ400��ÿ����̶�ȡԼ5MB��д��Լ1MB��

iostat -d -x -k 1

Device: rrqm/s wrqm/s r/s w/s rsec/s wsec/s rkB/s wkB/s avgrq-sz avgqu-sz await svctm %util

sda 1.56 28.31 7.84 31.50 43.65 3.16 21.82 1.58 1.19 0.03 0.80 2.61 10.29

sda 1.98 24.75 419.80 6.93 13465.35 253.47 6732.67 126.73 32.15 2.00 4.70 2.00 85.25

sda 3.06 41.84 444.90 54.08 14204.08 2048.98 7102.04 1024.49 32.57 2.10 4.21 1.85 92.24

���Կ������̵�ƽ����Ӧʱ��<5ms������ʹ����>80��������Ӧ�����������Ѿ��ܷ�æ�ˡ�

 


     �塢�����⣺ lsof ����ο�MAN�ֲᣩ

    ���ڹ�˾�ĳ���Ҫ��һ���˿ڼ���������Ҫ���ö˿ڵ�״̬��Ϣ��������22�˿ڽ���

[root@WebServer ~]# lsof -i:22
COMMAND PID USER FD TYPE DEVICE SIZE NODE NAME
sshd 11664 root 3u IPv6 109820 TCP 192.168.0.157:22->192.168.0.99:1174 (ESTABLISHED)
sshd 24927 root 3u IPv6 62643 TCP *:22 (LISTEN)
