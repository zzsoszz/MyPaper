
http://www.hellodba.com/reader.php?ID=180&lang=cn


----------------------------------------------------------------�����洢���̺�ִ�лָ�
1.window��������ִ��
FY_Recover_Data.txt
FY_Recover_Databody.txt




2.���Դ���ִ�лָ�
declare 
  i integer;
begin
   Fy_Recover_data.recover_truncated_table('HOTEL','TEST3',1,'/tmp');   --hotel�û��� TEST3��
end;


3.�鿴�ָ�������

select * from hotel.TEST3$$





------------------------------------------------------------------�ָ���ҪsysȨ��,�п����õ���������
�л���oracle�û�
su - oracle

��ʹ�������½
sqlplus "/ as sysdba"
alter user sys identified by bx123456jsb503;




------------------------------------------------------------------������һ��Fy_Recover_data.recover_truncated_tableû�е�����ɣ������˵ڶ��ε��ÿ��ܳ���"��Ҫ���ʻָ� "����   �����ǽ���취

1.
�ر����ݿ�
shutdown immediate

2.
startup mount

3.�������ļ�����
alter database datafile /tmp/FY_REC_DATA.DAT offline drop;
alter database datafile /tmp/FY_REC_DATA.DAT offline drop;

4.ɾ����ռ�
drop tablespace FY_REC_DATA including contents;//ɾ����ռ�
drop tablespace FY_RST_DATA including contents;//ɾ����ռ�

5.������������ļ�����
mkdir -p /tmp/backup/
mv  /tmp/FY_REC_DATA_COPY.DAT  /tmp/backup/


�鿴��ռ�
select * from v$tablespace;
�鿴�����ļ�
select * from v$datafile;










------------------------------------------------------------------��ʵ��¼
Last login: Thu Nov  6 13:22:22 2014 from 222.211.137.67
[root@db2 ~]# su - oracle
-bash-4.1$ sqlplus "/ as sysdba"

SQL*Plus: Release 11.2.0.1.0 Production on ������ 11�� 6 13:28:16 2014

Copyright (c) 1982, 2009, Oracle.  All rights reserved.

�����ӵ��������̡�

SQL> shutdown immediate
ORA-01034: ORACLE not available
ORA-27101: shared memory realm does not exist
Linux-x86_64 Error: 2: No such file or directory
SQL> startup
ORA-32004: obsolete or deprecated parameter(s) specified for RDBMS instance
ORACLE �����Ѿ�������

Total System Global Area 3.4206E+10 bytes
Fixed Size                  2215064 bytes
Variable Size            1.4764E+10 bytes
Database Buffers         1.9327E+10 bytes
Redo Buffers              112816128 bytes
���ݿ�װ����ϡ�
ORA-01113: �ļ� 24 ��Ҫ���ʻָ�
ORA-01110: �����ļ� 24: '/tmp/FY_REC_DATA.DAT'


SQL> alter database open
  2  /
alter database open
*
�� 1 �г��ִ���:
ORA-01113: �ļ� 24 ��Ҫ���ʻָ�
ORA-01110: �����ļ� 24: '/tmp/FY_REC_DATA.DAT'


SQL> ll
SP2-0042: δ֪���� "ll" - �����к��ԡ�
SQL> quit      
�� Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options �Ͽ�
You have new mail in /var/spool/mail/oracle
-bash-4.1$ 
?????????????�W????


Last login: Thu Nov  6 13:59:46 2014 from 222.211.137.67
[root@db2 ~]# 
[root@db2 ~]# 
[root@db2 ~]# 
[root@db2 ~]# su - oracle
-bash-4.1$ sqlplus "/ as sysdba"

SQL*Plus: Release 11.2.0.1.0 Production on ������ 11�� 6 14:06:16 2014

Copyright (c) 1982, 2009, Oracle.  All rights reserved.


���ӵ�: 
Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options

SQL                                                                                                          
SQL> 
SQL> 
SQL> startup
ORA-32004: Ϊ RDBMS ʵ��ָ���˷������ʱ�Ĳ���
ORA-01081: �޷������������е� ORACLE - �����ȹر���
SQL> shutdown immediate
ORA-01109: ���ݿ�δ��


�Ѿ�ж�����ݿ⡣
ORACLE �����Ѿ��رա�
SQL> startup
ORA-32004: obsolete or deprecated parameter(s) specified for RDBMS instance
ORACLE �����Ѿ�������

Total System Global Area 3.4206E+10 bytes
Fixed Size                  2215064 bytes
Variable Size            1.4764E+10 bytes
Database Buffers         1.9327E+10 bytes
Redo Buffers              112816128 bytes
���ݿ�װ����ϡ�
ORA-01113: �ļ� 24 ��Ҫ���ʻָ�
ORA-01110: �����ļ� 24: '/tmp/FY_REC_DATA.DAT'


SQL> shutdown immediate                      
ORA-01109: ���ݿ�δ��


�Ѿ�ж�����ݿ⡣
ORACLE �����Ѿ��رա�
SQL> recover datafile ��/tmp/FY_REC_DATA.DAT��
ORA-01034: ORACLE not available
���� ID: 13903
�Ự ID: 1217 ���к�: 3


SQL> startup
ORA-32004: obsolete or deprecated parameter(s) specified for RDBMS instance
ORACLE �����Ѿ�������

Total System Global Area 3.4206E+10 bytes
Fixed Size                  2215064 bytes
Variable Size            1.4764E+10 bytes
Database Buffers         1.9327E+10 bytes
Redo Buffers              112816128 bytes
���ݿ�װ����ϡ�
ORA-01113: �ļ� 24 ��Ҫ���ʻָ�
ORA-01110: �����ļ� 24: '/tmp/FY_REC_DATA.DAT'


SQL> recover datafile ��/tmp/FY_REC_DATA.DAT��
ORA-00911: ��Ч�ַ�


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
�� 1 �г��ִ���:
ORA-01109: ���ݿ�δ��


SQL> startup mount
ORA-32004: Ϊ RDBMS ʵ��ָ���˷������ʱ�Ĳ���
ORA-01081: �޷������������е� ORACLE - �����ȹر���
SQL> shutdown immediate
ORA-01109: ���ݿ�δ��


�Ѿ�ж�����ݿ⡣
ORACLE �����Ѿ��رա�
SQL> startup mount
ORA-32004: obsolete or deprecated parameter(s) specified for RDBMS instance
ORACLE �����Ѿ�������

Total System Global Area 3.4206E+10 bytes
Fixed Size                  2215064 bytes
Variable Size            1.4764E+10 bytes
Database Buffers         1.9327E+10 bytes
Redo Buffers              112816128 bytes
���ݿ�װ����ϡ�
SQL> alter database datafile /tmp/FY_REC_DATA.DAT offline drop;
alter database datafile /tmp/FY_REC_DATA.DAT offline drop
                        *
�� 1 �г��ִ���:
ORA-02236: �ļ�����Ч


SQL> alter database datafile '/tmp/FY_REC_DATA.DAT' offline drop;

���ݿ��Ѹ��ġ�

SQL> alter database open;

���ݿ��Ѹ��ġ�

SQL> 