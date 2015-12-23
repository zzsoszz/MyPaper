 查看CentOS版本方法 (2011-11-15 10:43:19)
转载
▼
标签： 杂谈 	分类： centos
查看CentOS版本方法  
有以下命令可以查看：

# lsb_release -a
LSB Version:    :core-3.1-ia32:core-3.1-noarch:graphics-3.1-ia32:graphics-3.1-noarch
Distributor ID: CentOS
Description:    CentOS release 5.4 (Final)
Release:        5.4
Codename:       Final


这个命令适用于所有的linux，包括Redhat、SuSE、Debian、Centos等发行版。

root@MyMail ~ # uname
Linux
root@MyMail ~ # uname -r
2.6.18-164.el5
[root@localhost ~]# uname -a
Linux localhost.localdomain 2.6.18-194.el5 #1 SMP Fri Apr 2 14:58:35 EDT 2010 i686 i686 i386 GNU/Linux


以下二种方法适用于RedHat,CentOS

root@MyMail ~ # cat /etc/redhat-release
CentOS release 5.4 (Final)

登录到linux执行rpm -q redhat-release

#rpm -q redhat-release
或CentOS

root@MyMail ~ # rpm -q centos-release
centos-release-5-4.el5.centos.1


当前centos 版本与redhat对应的版本的命令
# cat /proc/version






 由于Redhat和CentOS的发行版本现在众多，所以我们应该知道CentOS和Redhat及linux内核之间版本的对应关系对维护系统还是很有帮助的。对应的列表如下：

Redhat 9.0———————————————2.4.20-8

RHEL 3 Update 8————————————2.4.21-47

RHEL 4 ————————————————2.6.9-5
RHEL 4 Update 1————————————2.6.9-11
RHEL 4 Update 2————————————2.6.9-22
RHEL 4 Update 3————————————2.6.9-34
RHEL 4 Update 4————————————2.6.9-42
RHEL 4 Update 5————————————2.6.9-55
RHEL 4 Update 6————————————2.6.9-67
RHEL 4 Update 7————————————2.6.9-78

CentOS 5/RHEL 5 ———————————2.6.18-8
CentOS 5.1/RHEL 5 Update 1——————2.6.18-53
CentOS 5.2/RHEL 5 Update 2——————2.6.18-92
CentOS 5.3/RHEL 5 Update 3——————2.6.18-128
CentOS 5.4/RHEL 5 Update 4——————2.6.18-164
CentOS 5.5/RHEL 5 Update 5——————2.6.18-194
CentOS 5.6/RHEL 5 Update 6——————2.6.18-238
CentOS 5.7/RHEL 5 Update 7——————2.6.18-274
CentOS 5.8/RHEL 5 Update 8——————2.6.18-308
CentOS 5.9/RHEL 5 Update 9——————2.6.18-348
CentOS 5.10/RHEL 5 Update 10——————2.6.18-371
CentOS 6.0/RHEL 6 Update 0——————2.6.32-71
CentOS 6.1/RHEL 6 Update 1——————2.6.32-131
CentOS 6.2/RHEL 6 Update 2——————2.6.32-220
CentOS 6.3/RHEL 6 Update 3——————2.6.32-279
CentOS 6.4/RHEL 6 Update 4——————2.6.32-358
CentOS 6.5/RHEL 6 Update 5——————2.6.32-431

更完整的一个对照表格
CentOS version Architectures[13]RHEL base KernelCentOS release dateRHEL release date Delay (days)
2.1 i386 2.1 2.4.9 14 May 2004[1] 17 May 2002[14] 728
3.1 i386, x86-64, IA-64, s390, s390x 3.1 2.4.21-15 19 March 2004[15] 23 October 2003[14] 148
3.3 i386, x86-64, IA-64, s390, s390x 3.3 2.4.21-20 17 September 2004 3 September 2004 14
3.4 i386, x86-64, IA-64, s390, s390x 3.4 2.4.21-27 23 January 2005 12 December 2004 42
3.5 i386 3.5 2.4.21-32 10 June 2005[16] 18 May 2005 23
3.6 i386 3.6 2.4.21-37 1 November 2005[17] 28 September 2005 34
3.7 i386, x86-64, IA-64, s390, s390x 3.7 2.4.21-40 10 April 2006[18] 17 March 2006 23
3.8 i386, x86-64 3.8 2.4.21-47 25 August 2006[19] 20 July 2006 36
3.9 i386, x86-64, IA-64, s390, s390x 3.9 2.4.21-50 26 July 2007[20] 15 June 2007 41
4.0 i386, x86-64, various 4.0 2.6.9-5 9 March 2005[21] 14 February 2005[22] 23
4.1 i386, IA-64, s390 4.1 2.6.9-11 12 June 2005[23] 8 June 2005 4
4.2 i386, x86-64, IA-64, s390, s390x, alpha 4.2 2.6.9-22 13 October 2005[24] 5 October 2005 8
4.3 i386, x86-64, IA-64, s390, s390x 4.3 2.6.9-34 21 March 2006[25] 12 March 2006 9
4.4 i386, x86-64 4.4 2.6.9-42 30 August 2006[26] 10 August 2006 20
4.5 i386, x86-64, IA-64 4.5 2.6.9-55 17 May 2007[27] 1 May 2007 16
4.6 i386, x86-64, IA-64, Alpha, s390, s390x, PowerPC (beta), SPARC (beta) 4.6 2.6.9-67 16 December 2007[28] 16 November 2007[29] 30
4.7 i386, x86-64 4.7 2.6.9-78 13 September 2008[30] 24 July 2008[31] 51
4.8 i386, x86-64 4.8 2.6.9-89 21 August 2009[32] 18 May 2009[33] 95
4.9 i386, x86-64 4.9 2.6.9-100 2 March 2011[34] 16 February 2011[35] 14
5.0 i386, x86-64 5.0 2.6.18-8 12 April 2007[36] 14 March 2007[37] 28
5.1 i386, x86-64 5.1 2.6.18-53 2 December 2007[38] 7 November 2007[39] 25
5.2 i386, x86-64 5.2 2.6.18-92 24 June 2008[40] 21 May 2008[41] 34
5.3 i386, x86-64 5.3 2.6.18-128 31 March 2009[42] 20 January 2009[43] 69
5.4 i386, x86-64 5.4 2.6.18-164 21 October 2009[44] 2 September 2009[45] 49
5.5 i386, x86-64 5.5 2.6.18-194 14 May 2010[46] 31 March 2010[47] 44
5.6 i386, x86-64 5.6 2.6.18-238 8 April 2011[48] 13 January 2011[49] 85
5.7 i386, x86-64 5.7 2.6.18-274 13 September 2011[50] 21 July 2011[51] 54
5.8 i386, x86-64 5.8 2.6.18-308 7 March 2012[52] 21 February 2012[53] 15
5.9 i386, x86-64 5.9 2.6.18-348 17 January 2013[54] 7 January 2013[55] 10
5.10 i386, x86-64 5.10 2.6.18-371 19 October 2013[56] 30 September 2013[57] 19
6.0 i386, x86-64 6.0 2.6.32-71 10 July 2011[58] 10 November 2010[59] 242
6.1 i386, x86-64 6.1 2.6.32-131 9 December 2011[60] 19 May 2011[61] 204
6.2 i386, x86-64 6.2 2.6.32-220 20 December 2011[62] 6 December 2011[63] 14
6.3 i386, x86-64 6.3 2.6.32-279 9 July 2012[64] 21 June 2012[65] 18
6.4 i386, x86-64 6.4 2.6.32-358 9 March 2013[66] 21 February 2013[67] 15
6.5 i386, x86-64 6.5 2.6.32-431 1 December 2013[68] 21 November 2013[69] 10 


