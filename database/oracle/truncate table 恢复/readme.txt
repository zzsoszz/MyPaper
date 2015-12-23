
http://www.hellodba.com/reader.php?ID=180&lang=cn


----------------------------------------------------------------创建存储过程和执行恢复
1.window窗口依次执行
FY_Recover_Data.txt
FY_Recover_Databody.txt




2.测试窗口执行恢复
declare 
  i integer;
begin
   Fy_Recover_data.recover_truncated_table('HOTEL','TEST3',1,'/tmp');   --hotel用户名 TEST3表
end;


3.查看恢复的数据

select * from hotel.TEST3$$





------------------------------------------------------------------恢复需要sys权限,有可能用到以下命令
切换到oracle用户
su - oracle

不使用密码登陆
sqlplus "/ as sysdba"
alter user sys identified by bx123456jsb503;




------------------------------------------------------------------由于上一次Fy_Recover_data.recover_truncated_table没有调用完成，进行了第二次调用可能出现"需要介质恢复 "错误   下面是解决办法

1.
关闭数据库
shutdown immediate

2.
startup mount

3.将数据文件下线
alter database datafile /tmp/FY_REC_DATA.DAT offline drop;
alter database datafile /tmp/FY_REC_DATA.DAT offline drop;

4.删除表空间
drop tablespace FY_REC_DATA including contents;//删除表空间
drop tablespace FY_RST_DATA including contents;//删除表空间

5.将下面的数据文件移走
mkdir -p /tmp/backup/
mv  /tmp/FY_REC_DATA_COPY.DAT  /tmp/backup/


查看表空间
select * from v$tablespace;
查看数据文件
select * from v$datafile;










------------------------------------------------------------------真实记录
Last login: Thu Nov  6 13:22:22 2014 from 222.211.137.67
[root@db2 ~]# su - oracle
-bash-4.1$ sqlplus "/ as sysdba"

SQL*Plus: Release 11.2.0.1.0 Production on 星期四 11月 6 13:28:16 2014

Copyright (c) 1982, 2009, Oracle.  All rights reserved.

已连接到空闲例程。

SQL> shutdown immediate
ORA-01034: ORACLE not available
ORA-27101: shared memory realm does not exist
Linux-x86_64 Error: 2: No such file or directory
SQL> startup
ORA-32004: obsolete or deprecated parameter(s) specified for RDBMS instance
ORACLE 例程已经启动。

Total System Global Area 3.4206E+10 bytes
Fixed Size                  2215064 bytes
Variable Size            1.4764E+10 bytes
Database Buffers         1.9327E+10 bytes
Redo Buffers              112816128 bytes
数据库装载完毕。
ORA-01113: 文件 24 需要介质恢复
ORA-01110: 数据文件 24: '/tmp/FY_REC_DATA.DAT'


SQL> alter database open
  2  /
alter database open
*
第 1 行出现错误:
ORA-01113: 文件 24 需要介质恢复
ORA-01110: 数据文件 24: '/tmp/FY_REC_DATA.DAT'


SQL> ll
SP2-0042: 未知命令 "ll" - 其余行忽略。
SQL> quit      
从 Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options 断开
You have new mail in /var/spool/mail/oracle
-bash-4.1$ 
?????????????￤????


Last login: Thu Nov  6 13:59:46 2014 from 222.211.137.67
[root@db2 ~]# 
[root@db2 ~]# 
[root@db2 ~]# 
[root@db2 ~]# su - oracle
-bash-4.1$ sqlplus "/ as sysdba"

SQL*Plus: Release 11.2.0.1.0 Production on 星期四 11月 6 14:06:16 2014

Copyright (c) 1982, 2009, Oracle.  All rights reserved.


连接到: 
Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options

SQL                                                                                                          
SQL> 
SQL> 
SQL> startup
ORA-32004: 为 RDBMS 实例指定了废弃或过时的参数
ORA-01081: 无法启动已在运行的 ORACLE - 请首先关闭它
SQL> shutdown immediate
ORA-01109: 数据库未打开


已经卸载数据库。
ORACLE 例程已经关闭。
SQL> startup
ORA-32004: obsolete or deprecated parameter(s) specified for RDBMS instance
ORACLE 例程已经启动。

Total System Global Area 3.4206E+10 bytes
Fixed Size                  2215064 bytes
Variable Size            1.4764E+10 bytes
Database Buffers         1.9327E+10 bytes
Redo Buffers              112816128 bytes
数据库装载完毕。
ORA-01113: 文件 24 需要介质恢复
ORA-01110: 数据文件 24: '/tmp/FY_REC_DATA.DAT'


SQL> shutdown immediate                      
ORA-01109: 数据库未打开


已经卸载数据库。
ORACLE 例程已经关闭。
SQL> recover datafile ’/tmp/FY_REC_DATA.DAT’
ORA-01034: ORACLE not available
进程 ID: 13903
会话 ID: 1217 序列号: 3


SQL> startup
ORA-32004: obsolete or deprecated parameter(s) specified for RDBMS instance
ORACLE 例程已经启动。

Total System Global Area 3.4206E+10 bytes
Fixed Size                  2215064 bytes
Variable Size            1.4764E+10 bytes
Database Buffers         1.9327E+10 bytes
Redo Buffers              112816128 bytes
数据库装载完毕。
ORA-01113: 文件 24 需要介质恢复
ORA-01110: 数据文件 24: '/tmp/FY_REC_DATA.DAT'


SQL> recover datafile ’/tmp/FY_REC_DATA.DAT’
ORA-00911: 无效字符


SQL                                                      
SQL> 
SQL> 
SQL> 
SQL> 
SQL>         
SQL> 
SQL> drop tablespace FY_REC_DATA including contents;
drop tablespace FY_REC_DATA including contents
*
第 1 行出现错误:
ORA-01109: 数据库未打开


SQL> startup mount
ORA-32004: 为 RDBMS 实例指定了废弃或过时的参数
ORA-01081: 无法启动已在运行的 ORACLE - 请首先关闭它
SQL> shutdown immediate
ORA-01109: 数据库未打开


已经卸载数据库。
ORACLE 例程已经关闭。
SQL> startup mount
ORA-32004: obsolete or deprecated parameter(s) specified for RDBMS instance
ORACLE 例程已经启动。

Total System Global Area 3.4206E+10 bytes
Fixed Size                  2215064 bytes
Variable Size            1.4764E+10 bytes
Database Buffers         1.9327E+10 bytes
Redo Buffers              112816128 bytes
数据库装载完毕。
SQL> alter database datafile /tmp/FY_REC_DATA.DAT offline drop;
alter database datafile /tmp/FY_REC_DATA.DAT offline drop
                        *
第 1 行出现错误:
ORA-02236: 文件名无效


SQL> alter database datafile '/tmp/FY_REC_DATA.DAT' offline drop;

数据库已更改。

SQL> alter database open;

数据库已更改。

SQL> 