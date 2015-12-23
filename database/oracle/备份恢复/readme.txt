alter database datafile  '/tmp/FY_REC_DATA.DAT' offline drop;
alter database datafile  '/tmp/FY_REC_DATA.DAT' offline;
alter database datafile  '/tmp/FY_RST_DATA.DAT' offline;



alter database datafile 21 offline;
alter database datafile 22 offline;
alter tablespace FY_RST_DATA offline immediate; 
select * from v$logfile;

select name,status from v$datafile; 
select ts#,name from v$tablespace;
select tablespace_name,status from dba_tablespaces; 



v$recover_file




SQL> select status, name from  v$controlfile; 
/u01/app/oracle/oradata/hotel/control01.ctl
/u01/app/oracle/oradata/hotel/control02.ctl
/u01/app/oracle/oradata/hotel/control03.ctl








今天刚准备去游玩呢,这时偏偏接到了同事的电话,说他们创建不了表了,让我帮忙看看,唉,真是好郁闷啊,没有办法就登陆服务器看下了,我试着创建了一个表,提示表空间不足,那这个好办扩大表空间就OK了呗,正在得意洋洋的时候,出现了如下的2个错误:

ORA-01157: cannot identify/lock data file 10 - see DBWR trace file 

ORA-01110: data file 10: '/home/oracle/oradata/ora10/xxt_mt_msg09.ora'

郁闷,居然出现了错误,看了当前目录居然这个文件不知道被谁删除了,我直接狂汗,通过千辛万苦找了解决的方法:

SQL>  startup mount;
SQL>  alter database create datafile '/home/oracle/oradata/ora10/xxt_mt_msg09.ora';
SQL>  set autorecovery on;
SQL>  recover datafile '/home/oracle/oradata/ora10/xxt_mt_msg09.ora';
SQL>  alter database datafile '/home/oracle/oradata/ora10/xxt_mt_msg09.ora' online;

SQL>  alter   tablespace   XXT_mt_as_msg   online;

SQL>  alter database open;


alter database create datafile '/tmp/FY_REC_DATA.DAT';
alter database create datafile '/tmp/FY_RST_DATA.DAT';

现在再到当前的数据库文件目录发现这个xxt_mt_msg09.ora已经还原回来了,然后重新扩大了下表空间,这下又可以创建表了.





Oracle里的set零零碎碎的，这里整理归纳一下

 

SQL> set timing on;          //设置显示“已用时间：XXXX”

SQL> set autotrace on-;    //设置允许对执行的sql进行分析


SQL>set trimout on;　　　//去除标准输出每行的拖尾空格，缺省为off

SQL>set trimspool on;　　//去除重定向（spool）输出每行的拖尾空格，缺省为off

SQL> set echo on               //设置运行命令是是否显示语句

SQL>set echo off;　　　　 //显示start启动的脚本中的每个sql命令，缺省为on

SQL> set feedback on;       //设置显示“已选择XX行”

SQL>set feedback off;　     //回显本次sql命令处理的记录条数，缺省为on


SQL>set colsep' ';　　　　 //输出分隔符

SQL>set heading off;　　   //输出域标题，缺省为on

SQL>set pagesize 0;　　    //输出每页行数，缺省为24,为了避免分页，可设定为0。

SQL>set linesize 80;　　    //输出一行字符个数，缺省为80

SQL>set numwidth 12;　    //输出number类型域长度，缺省为10

SQL>set termout off;　　   //显示脚本中的命令的执行结果，缺省为on


SQL>set serveroutput on;  //设置允许显示输出类似dbms_output

SQL>set verify off                     //可以关闭和打开提示确认信息old 1和new 1的显示.

 

 

备注 一下是column命令

 

COL[UMN] [{column | expr} [option...] ]

 

where option is one of the following clauses:

    ALI[AS] alias

    CLE[AR]

    ENTMAP {ON|OFF}

    FOLD_A[FTER]

    FOLD_B[EFORE]

    FOR[MAT] format

    HEA[DING] text

    JUS[TIFY] {L[EFT] | C[ENTER] | C[ENTRE] | R[IGHT]}

    LIKE {expr | alias}

    NEWL[INE]

    NEW_V[ALUE] variable

    NOPRI[NT] | PRI[NT]

    NUL[L] text

    OLD_V[ALUE] variable

    ON|OFF

WRA[PPED] | WOR[D_WRAPPED] | TRU[NCATED]

 

下面就举例说明：

SQL> COLUMN SAL ALIAS Salary FORMAT $99,990.90

我们指定了SAL这个列的一个别名和数字的MONEY显示格式。

 

SQL>col title format a20;

 
 
 

 
  ORACLE COL SET 设置显示参数 (2012-03-06 18:13:53)
转载
▼
标签： oracle col set 杂谈 	分类： Oracle

conn letu/ouc@core

set line 200

set pagesize 10000

set heading off

col EMPLOYEE_ID FOR 9999

col FIRST_NAME FOR A15

col LAST_NAME FOR A15

col EMAIL FOR A8

col PHONE_NUMBER FOR A20

col HIRE_DATE FOR A15

col JOB_ID FOR A15

col SALARY FOR 9999999.99

col COMMISSION_PCT FOR 9999.99

col DEPARTMENT_ID FOR 9999

set feedback off

spool D:/app/data.txt

select * from employees;

spool off

exit

 

 

col file_name for a50;
col TABLESPACE_NAME for a20;
set linesize 200;
select d.file_name,d.tablespace_name from Dba_Data_Files d

不过觉得sqlplus提供的这个工具还是很麻烦的，你必须首先知道你有哪些字段需要格式化
例如
col file_name for a50;
就是指file_name这个字段会占据50列，如果实际的值超过50列，就只能换行了哦。
for 其实是format的缩写
a是什么意思？一直没有明白哦？

setlinesize 200是值整个sqlplus显示区域最多显示200列
如果不设置，默认是显示80列

不过对于这个范例而言，不是那么必要
因为
col file_name for a50;
col TABLESPACE_NAME for a20;
a50+a20总共才70列，还没有超过80列

但是知道set linesize有这个用法就OK啊






 3
down vote
accepted
	

Shouldn't you be looking in v$datafile to see if a datafile is offline rather than v$tablespace?

Offline Datafile:

08:09:38 coredev>select status, name from v$datafile where name like '%UNDO4%';
STATUS  NAME
------- ----------------------------------------------------------------------
ONLINE  F:\ORACLE\ORADATA\CD\UNDO4.DBF

08:09:47 coredev>alter database datafile 'F:\ORACLE\ORADATA\CD\UNDO4.DBF' offline;
Database altered.

08:09:58 coredev>select status, name from v$datafile where name like '%UNDO4%';
STATUS  NAME
------- ----------------------------------------------------------------------
RECOVER F:\ORACLE\ORADATA\CD\UNDO4.DBF

08:10:02 coredev>select * from v$tablespace where name='UNDO';
       TS# NAME                           INC BIG FLA ENC
---------- ------------------------------ --- --- --- ---
        33 UNDO                           YES NO  YES

Online Datafile:

08:10:53 coredev>alter database datafile 'F:\ORACLE\ORADATA\CD\UNDO4.DBF' online;
alter database datafile 'F:\ORACLE\ORADATA\CD\UNDO4.DBF' online
*
ERROR at line 1:
ORA-01113: file 21 needs media recovery
ORA-01110: data file 21: 'F:\ORACLE\ORADATA\CD\UNDO4.DBF'

08:11:04 coredev>recover datafile 'F:\ORACLE\ORADATA\CD\UNDO4.DBF';
Media recovery complete.

08:11:13 coredev>alter database datafile 'F:\ORACLE\ORADATA\CD\UNDO4.DBF' online;
Database altered.

08:11:49 coredev>select status, name from v$datafile where name like '%UNDO4%';
STATUS  NAME
------- ----------------------------------------------------------------------
ONLINE  F:\ORACLE\ORADATA\CD\UNDO4.DBF







archive log list
alter database datafile '/u01/app/oracle/oradata/disk_1/tbs01.dbf' offline;




ORA-01157: cannot identify/lock data file %s - see DBWR trace file的处理 2012-11-29 10:47:48 
http://blog.itpub.net/11590946/viewspace-750214/

Oracle数据库启动时出现ORA-01157和ORA-01110问题
http://www.linuxidc.com/Linux/2013-06/86530.htm



http://blog.itpub.net/23718752/viewspace-747968/
ORA-01145: offline immediate disallowed unless media recovery enabled   [复制链接] 
http://bbs.chinaunix.net/forum.php?mod=viewthread&tid=1007749








http://blog.163.com/ddoo_2006/blog/static/11755254520113274168674/


oracle数据文件迁移  

2011-04-27 16:16:08|  分类： 默认分类 |举报 |字号 订阅
       

下载LOFTER客户端
整理By 2011-04-27 海南
这篇文章是从网络上获取的，然后根据内容一步步操作，
1、目前的疑问：移动日志文件的时候，为何要先进行切换？
2、move操作后，再进行rename操作的原理
-----------------------------------------
环境： WinXP SP3\Oracle10gR2
数据文件，控制文件和日志文件原路径在:"C:\ora10gBase\oradata\oy",
现在要将它们迁移至“D:\D_Oracle_DBF”中。具体操作如下：
 
数据文件迁移：
SQL> select name from v$datafile;
NAME
-----------------------------------------
C:\ORA10GBASE\ORADATA\OY\SYSTEM01.DBF
C:\ORA10GBASE\ORADATA\OY\UNDOTBS01.DBF
C:\ORA10GBASE\ORADATA\OY\SYSAUX01.DBF
C:\ORA10GBASE\ORADATA\OY\USERS01.DBF
C:\ORA10GBASE\ORADATA\OY\EXAMPLE01.DBF
D:\D_ORACLE_DBF\EXAMPLE02.DBF
D:\D_ORACLE_DBF\SYSAUX02.DBF
D:\D_ORACLE_DBF\SYSTEM02.DBF
D:\D_ORACLE_DBF\UNDOTBS02.DBF
D:\D_ORACLE_DBF\USERS02.DBF
已选择10行。
SQL> shutdown
数据库已经关闭。
已经卸载数据库。
ORACLE 例程已经关闭。
 
（以下的$move命令 应该等同于操作系统的剪切粘贴命令）
SQL> $move C:\ORA10GBASE\ORADATA\OY\SYSTEM01.DBF D:\D_ORACLE_DBF\SYSTEM01.DBF
SQL> $move C:\ORA10GBASE\ORADATA\OY\SYSAUX01.DBF D:\D_ORACLE_DBF\SYSAUX01.DBF
SQL> $move C:\ORA10GBASE\ORADATA\OY\UNDOTBS01.DBF D:\D_ORACLE_DBF\UNDOTBS01.DBF
SQL> $move C:\ORA10GBASE\ORADATA\OY\USERS01.DBF D:\D_ORACLE_DBF\USERS01.DBF
SQL> $move C:\ORA10GBASE\ORADATA\OY\EXAMPLE01.DBF D:\D_ORACLE_DBF\EXAMPLE01.DBF
SQL> startup mount
ORACLE 例程已经启动。
Total System Global Area  209715200 bytes
Fixed Size                  1248140 bytes
Variable Size              92275828 bytes
Database Buffers          113246208 bytes
Redo Buffers                2945024 bytes
数据库装载完毕。
SQL>  alter database
  2   rename file
  3   'C:\ORA10GBASE\ORADATA\OY\SYSTEM01.DBF',
  4   'C:\ORA10GBASE\ORADATA\OY\SYSAUX01.DBF',
  5   'C:\ORA10GBASE\ORADATA\OY\UNDOTBS01.DBF',
  6   'C:\ORA10GBASE\ORADATA\OY\USERS01.DBF',
  7   'C:\ORA10GBASE\ORADATA\OY\EXAMPLE01.DBF'
  8   to
  9   'D:\D_ORACLE_DBF\SYSTEM01.DBF',
 10   'D:\D_ORACLE_DBF\SYSAUX01.DBF',
 11   'D:\D_ORACLE_DBF\UNDOTBS01.DBF',
 12   'D:\D_ORACLE_DBF\USERS01.DBF',
 13   'D:\D_ORACLE_DBF\EXAMPLE01.DBF';
数据库已更改。
SQL> alter database open;
数据库已更改。
SQL> select name,status from v$datafile;
NAME                                                         STATUS
------------------------------------------------------------ -------
D:\D_ORACLE_DBF\SYSTEM01.DBF                                 SYSTEM
D:\D_ORACLE_DBF\UNDOTBS01.DBF                                ONLINE
D:\D_ORACLE_DBF\SYSAUX01.DBF                                 ONLINE
D:\D_ORACLE_DBF\USERS01.DBF                                  ONLINE
D:\D_ORACLE_DBF\EXAMPLE01.DBF                                ONLINE
D:\D_ORACLE_DBF\EXAMPLE02.DBF                                ONLINE
D:\D_ORACLE_DBF\SYSAUX02.DBF                                 ONLINE
D:\D_ORACLE_DBF\SYSTEM02.DBF                                 SYSTEM
D:\D_ORACLE_DBF\UNDOTBS02.DBF                                ONLINE
D:\D_ORACLE_DBF\USERS02.DBF                                  ONLINE
已选择10行。
日志文件迁移
SQL> select * from v$log;
    GROUP#    THREAD#  SEQUENCE#      BYTES    MEMBERS ARC STATUS    FIRST_CHANGE# FIRST_TIME
-------- ------- ---------- ---------- ---------- --- --------- ------------- --------------
       1       1          5   52428800          1 NO  CURRENT          618740 27-4月 -11
       2       1          3   52428800          1 NO  INACTIVE         572830 26-4月 -11
       3       1          4   52428800          1 NO  INACTIVE         598395 27-4月 -11
SQL> col type format a10
SQL> col IS_RECOVERY_DEST_FILE format a10
SQL> col member format a50
SQL> select * from v$logfile;
    GROUP# STATUS   TYPE       MEMBER                                   IS_RECOVER
---------- -------- ---------- ---------------------------------------- ----------
########## STALE    ONLINE     C:\ORA10GBASE\ORADATA\OY\REDO03.LOG      NO
########## STALE    ONLINE     C:\ORA10GBASE\ORADATA\OY\REDO02.LOG      NO
##########          ONLINE     C:\ORA10GBASE\ORADATA\OY\REDO01.LOG      NO
SQL> alter system switch logfile;
系统已更改。
SQL> shutdown
数据库已经关闭。
已经卸载数据库。
ORACLE 例程已经关闭。
SQL> $ move C:\ora10gBase\oradata\oy\REDO01.LOG  D:\D_Oracle_DBF\REDO01.LOG
SQL> $ move C:\ora10gBase\oradata\oy\REDO02.LOG  D:\D_Oracle_DBF\REDO02.LOG
SQL> $ move C:\ora10gBase\oradata\oy\REDO03.LOG  D:\D_Oracle_DBF\REDO03.LOG
SQL> startup mount
ORACLE 例程已经启动。
Total System Global Area  209715200 bytes
Fixed Size                  1248140 bytes
Variable Size              92275828 bytes
Database Buffers          113246208 bytes
Redo Buffers                2945024 bytes
数据库装载完毕。
SQL> alter database
  2  rename file
  3  'C:\ora10gBase\oradata\oy\REDO01.LOG',
  4  'C:\ora10gBase\oradata\oy\REDO02.LOG',
  5  'C:\ora10gBase\oradata\oy\REDO03.LOG'
  6  to
  7  'D:\D_Oracle_DBF\REDO01.LOG',
  8  'D:\D_Oracle_DBF\REDO02.LOG',
  9  'D:\D_Oracle_DBF\REDO03.LOG';
数据库已更改。
SQL> alter database open;
数据库已更改。
SQL> alter system switch logfile;
系统已更改。
控制文件迁移
 
 
将数据库SHUTDOWN,然后修改pfile中的控制文件的路径，以pfile文件启动数据库，
然后create spfile from pfile.最后以spfile启动数据库即可。
SQL> create spfile from pfile='D:\xxxx\pfile\init.ora.2162010162124';
 
-----------------------------
 
此外，其他移动数据文件的方法（在数据库启动归档的情况下，可以开机迁移，还未测试是否正确）：
 
移动Oracle数据库表空间文件
目的：把oracle表空间文件从一个地方移动到另外一个地方。
详细操作步骤：
第一、启用介质恢复模式：
A、Shutdown immdiate;
B、Startup mount;
C、Alter database archivelog;
D、Alter database open;
第二、卸载表空间：
A、Alter tablespace 表空间名字 offline;(注：如果为非归档模式后面加Drop);
第三、在操作系统下移动文件到新位置。
第四、告诉表空间数据文件已经移动：
A、Alter database rename file '原文件路径' to '新文件路径';
第五、装载表空间：
A、Alter tablespace 表空间名字 online;
第六、关闭数据库：
A、Shutdown;
第七、启动数据库：
A、Startup force;
Oracle数据库表空间文件移动成功。












 Oracle管理表空间和数据文件详解
管理表空间和数据文件
介绍

表空间是数据库的逻辑组成部分

从物理上将：数据库数据存放在数据文件中

从逻辑上将：数据库则是存放在表空间中

表空间由一个或是多个数据文件组成

 
数据库的逻辑结构

介绍：

Oracle中逻辑结构包括表空间、段、区、块

说明：

数据库由表空间构成

而表空间又是由段构成

而段又是由区构成

而区又是由Oracle块构成

 

 

这样的一种结果，可以提高数据库的效率

 
表空间

介绍：

表空间用于从逻辑上组织数据库的数据

数据库逻辑上是由一个或是多个表空间组成的

 

表空间的作用:

1、控制数据库占用的磁盘空间

2、dba可以将不同数据类型部署到不同的位置。这样有利于提高i/o性能，同时利于备份和恢复等管理操作

 
建立表空间

建立表空间是使用create tablespace命令完成的，要注意时，一般情况下，建立表空间是特权用户或是dba来执行的，如果用其它用户来创建表空间，则用户必须要具有create tablespace的系统权限

 
建立数据表空间

在建立数据库后，为便于管理表，最好建立自己的表空间

create tablespace 表空间名 datafile '数据文件路径' size 数据文件的大小 uniform size 区的大小;

 

create tablespace tangtao001 datafile 'd:\t001.dbf' size 20m uniform size 128k;

 
使用数据表空间

向新建的表空间添加表：

create table myDept(deptno number(4),dname varchar2(15),loc varchar2(13)) tablespace tangtao001;

 

说明：执行完上述命令后，会建立名称为tangtao001 的表空间，并为该表空间建立名称为t001.dbf的数据文件，区的大小为128k

 

1、显示表空间信息

a) 查询数据字典视图dba_tablespaces。显示表空间信息

select tablespace_name from dba_tablespaces;

2、显示表空间所包含的数据文件

a) 查询数据字典视图dba_data_files，可以显示表空间所包含的数据文件

select file_name,bytes from dba_data_files where tablespace_name='表空间名';

 
改变表空间的状态

当建立表空间时，表空间处于联机的(online)状态，此时该表空间是可以访问的，并且该表空间是可以读写的，即可以查询该表空间的数据，而且还可以在表空间执行各种语句。但是在进行系统维护或是数据维护时，可能需要改变表空间的状态，一般情况下，由特权用户或是dba来操作

1、使表空间脱机

alter tablespace 表空间名 offline;

 

2、使表空间联机

alter tablespace 表空间名 online;

 

3、只读表空间

a) 当建立表空间时，表空间可以读写，如果不希望在该表空间上执行update、delete、insert操作，那么可以将该表空间修改为只读

alter tablespace 表空间名 read only;

 

案例：

1、知道表空间名。显示该表空间的所有表

select * from tall_tables where tablespace_name='表空间名';

2、知道表明，查看该表属于哪个表空间

select tablespace_name,table_name from user_tables where table_name='emp';

 

 

注意:

通过2，可以知道scott.emp是在system这个表空间上，现在可以将system改为只读，但是不会成功。因为system是系统表空间，如果是普通表空间，可以将其设为只读

 
删除表空间

一般情况下，有特权用户或是dba来操作，如果是其它用户操作，那么要求用户具有drop tablespace系统权限

drop tablespace 表空间名 including contents and datafiles;

 

说明：

Including contents 表示删除表空间，删除该表空间的所有数据库对象，而datafiles表示将数据库文件也删除

 
扩展表空间

表空间是由数据文件组成的，表空间的大小实际上就是数据文件相加后的大小。那么我们可以想象。假定表employee存放到tangtao001表空间上，初始大小就是2m。当数据满2m空间后，如果在向employee表插入数据，这样就会显示空间不足的错误

 

案例说明：

1、建立一个表空间tangtao001

2、在该表空间上建立一个普通标mydment 其结构和dept一样

3、向该表中加入数据insert into mydment select * from dept;

4、当一定时候就会出现无法扩展的问题，怎么办？

5、就扩展该表空间，为其增加更多的存储空间。有三种方法：

 

 

1、增加数据文件

alter tablespace 表空间名 add datafile '数据文件存放路径' size 数据文件大小;

 

2、增加数据文件的大小

alter tablespace 表空间名 add datafile '数据文件存放的路径' resize 数据文件新的大小;

这里需注意，数据文件的大小不要超过500m

 

3、设置文件的自动增长

alter tablespace 表空间名 add datafile '数据文件存放路径' autoextend on next 每次增加的大小 maxsize 数据文件大小的最大值;

 
移动数据文件

有时，如果数据文件所在的磁盘损坏时，该数据文件不能再使用，为了能够重新使用，需要将这些文件的副本移动到其它的磁盘，然后恢复

 

案例说明：

1、确定数据文件所在的表空间

select tablespace_name from dba_data_files where file_name='d:\t01.dbf';

2、使表空间脱机

a) 确保数据文件的一致性，将表空间转变为offline的状态

alter tablespace tangtao001 offline;

3、使用命令移动数据文件到指定的目标位置

host move d:t01.dbf c:t01.dbf;

4、执行alter tablespace命令

a) 在物理上移动了数据后，还必须执行alter tablespace命令对数据库文件进行逻辑修改

alter tablespace tangtao001 rename datafile 'd:t01.dbf' to 'c:t01.dbf';

5、使得表空间联机

a) 在移动了数据文件后，为了使用户可以访问该表空间，必须将其转变为online的状态

alter tablespace tangtao001 online;

 
表空间小结

1、了解表空间和数据文件的作用

2、掌握常用表空间，undo表空间和临时表空间的建立方法

3、了解表空间的各个状态

a) Online

b) Offline

c) Read write

d) Read only

4、了解移动数据文件的原因，即使用alter tablespace和alter datatable命令移动数据文件的方法

