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








�����׼��ȥ������,��ʱƫƫ�ӵ���ͬ�µĵ绰,˵���Ǵ������˱���,���Ұ�æ����,��,���Ǻ����ư�,û�а취�͵�½������������,�����Ŵ�����һ����,��ʾ��ռ䲻��,������ð������ռ��OK����,���ڵ��������ʱ��,���������µ�2������:

ORA-01157: cannot identify/lock data file 10 - see DBWR trace file 

ORA-01110: data file 10: '/home/oracle/oradata/ora10/xxt_mt_msg09.ora'

����,��Ȼ�����˴���,���˵�ǰĿ¼��Ȼ����ļ���֪����˭ɾ����,��ֱ�ӿ�,ͨ��ǧ��������˽���ķ���:

SQL>  startup mount;
SQL>  alter database create datafile '/home/oracle/oradata/ora10/xxt_mt_msg09.ora';
SQL>  set autorecovery on;
SQL>  recover datafile '/home/oracle/oradata/ora10/xxt_mt_msg09.ora';
SQL>  alter database datafile '/home/oracle/oradata/ora10/xxt_mt_msg09.ora' online;

SQL>  alter   tablespace   XXT_mt_as_msg   online;

SQL>  alter database open;


alter database create datafile '/tmp/FY_REC_DATA.DAT';
alter database create datafile '/tmp/FY_RST_DATA.DAT';

�����ٵ���ǰ�����ݿ��ļ�Ŀ¼�������xxt_mt_msg09.ora�Ѿ���ԭ������,Ȼ�������������±�ռ�,�����ֿ��Դ�������.





Oracle���set��������ģ������������һ��

 

SQL> set timing on;          //������ʾ������ʱ�䣺XXXX��

SQL> set autotrace on-;    //���������ִ�е�sql���з���


SQL>set trimout on;������//ȥ����׼���ÿ�е���β�ո�ȱʡΪoff

SQL>set trimspool on;����//ȥ���ض���spool�����ÿ�е���β�ո�ȱʡΪoff

SQL> set echo on               //���������������Ƿ���ʾ���

SQL>set echo off;�������� //��ʾstart�����Ľű��е�ÿ��sql���ȱʡΪon

SQL> set feedback on;       //������ʾ����ѡ��XX�С�

SQL>set feedback off;��     //���Ա���sql�����ļ�¼������ȱʡΪon


SQL>set colsep' ';�������� //����ָ���

SQL>set heading off;����   //�������⣬ȱʡΪon

SQL>set pagesize 0;����    //���ÿҳ������ȱʡΪ24,Ϊ�˱����ҳ�����趨Ϊ0��

SQL>set linesize 80;����    //���һ���ַ�������ȱʡΪ80

SQL>set numwidth 12;��    //���number�����򳤶ȣ�ȱʡΪ10

SQL>set termout off;����   //��ʾ�ű��е������ִ�н����ȱʡΪon


SQL>set serveroutput on;  //����������ʾ�������dbms_output

SQL>set verify off                     //���Թرպʹ���ʾȷ����Ϣold 1��new 1����ʾ.

 

 

��ע һ����column����

 

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

 

����;���˵����

SQL> COLUMN SAL ALIAS Salary FORMAT $99,990.90

����ָ����SAL����е�һ�����������ֵ�MONEY��ʾ��ʽ��

 

SQL>col title format a20;

 
 
 

 
  ORACLE COL SET ������ʾ���� (2012-03-06 18:13:53)
ת��
��
��ǩ�� oracle col set ��̸ 	���ࣺ Oracle

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

��������sqlplus�ṩ��������߻��Ǻ��鷳�ģ����������֪��������Щ�ֶ���Ҫ��ʽ��
����
col file_name for a50;
����ָfile_name����ֶλ�ռ��50�У����ʵ�ʵ�ֵ����50�У���ֻ�ܻ�����Ŷ��
for ��ʵ��format����д
a��ʲô��˼��һֱû������Ŷ��

setlinesize 200��ֵ����sqlplus��ʾ���������ʾ200��
��������ã�Ĭ������ʾ80��

������������������ԣ�������ô��Ҫ
��Ϊ
col file_name for a50;
col TABLESPACE_NAME for a20;
a50+a20�ܹ���70�У���û�г���80��

����֪��set linesize������÷���OK��






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




ORA-01157: cannot identify/lock data file %s - see DBWR trace file�Ĵ��� 2012-11-29 10:47:48 
http://blog.itpub.net/11590946/viewspace-750214/

Oracle���ݿ�����ʱ����ORA-01157��ORA-01110����
http://www.linuxidc.com/Linux/2013-06/86530.htm



http://blog.itpub.net/23718752/viewspace-747968/
ORA-01145: offline immediate disallowed unless media recovery enabled   [��������] 
http://bbs.chinaunix.net/forum.php?mod=viewthread&tid=1007749








http://blog.163.com/ddoo_2006/blog/static/11755254520113274168674/


oracle�����ļ�Ǩ��  

2011-04-27 16:16:08|  ���ࣺ Ĭ�Ϸ��� |�ٱ� |�ֺ� ����
       

����LOFTER�ͻ���
����By 2011-04-27 ����
��ƪ�����Ǵ������ϻ�ȡ�ģ�Ȼ���������һ����������
1��Ŀǰ�����ʣ��ƶ���־�ļ���ʱ��Ϊ��Ҫ�Ƚ����л���
2��move�������ٽ���rename������ԭ��
-----------------------------------------
������ WinXP SP3\Oracle10gR2
�����ļ��������ļ�����־�ļ�ԭ·����:"C:\ora10gBase\oradata\oy",
����Ҫ������Ǩ������D:\D_Oracle_DBF���С�����������£�
 
�����ļ�Ǩ�ƣ�
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
��ѡ��10�С�
SQL> shutdown
���ݿ��Ѿ��رա�
�Ѿ�ж�����ݿ⡣
ORACLE �����Ѿ��رա�
 
�����µ�$move���� Ӧ�õ�ͬ�ڲ���ϵͳ�ļ���ճ�����
SQL> $move C:\ORA10GBASE\ORADATA\OY\SYSTEM01.DBF D:\D_ORACLE_DBF\SYSTEM01.DBF
SQL> $move C:\ORA10GBASE\ORADATA\OY\SYSAUX01.DBF D:\D_ORACLE_DBF\SYSAUX01.DBF
SQL> $move C:\ORA10GBASE\ORADATA\OY\UNDOTBS01.DBF D:\D_ORACLE_DBF\UNDOTBS01.DBF
SQL> $move C:\ORA10GBASE\ORADATA\OY\USERS01.DBF D:\D_ORACLE_DBF\USERS01.DBF
SQL> $move C:\ORA10GBASE\ORADATA\OY\EXAMPLE01.DBF D:\D_ORACLE_DBF\EXAMPLE01.DBF
SQL> startup mount
ORACLE �����Ѿ�������
Total System Global Area  209715200 bytes
Fixed Size                  1248140 bytes
Variable Size              92275828 bytes
Database Buffers          113246208 bytes
Redo Buffers                2945024 bytes
���ݿ�װ����ϡ�
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
���ݿ��Ѹ��ġ�
SQL> alter database open;
���ݿ��Ѹ��ġ�
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
��ѡ��10�С�
��־�ļ�Ǩ��
SQL> select * from v$log;
    GROUP#    THREAD#  SEQUENCE#      BYTES    MEMBERS ARC STATUS    FIRST_CHANGE# FIRST_TIME
-------- ------- ---------- ---------- ---------- --- --------- ------------- --------------
       1       1          5   52428800          1 NO  CURRENT          618740 27-4�� -11
       2       1          3   52428800          1 NO  INACTIVE         572830 26-4�� -11
       3       1          4   52428800          1 NO  INACTIVE         598395 27-4�� -11
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
ϵͳ�Ѹ��ġ�
SQL> shutdown
���ݿ��Ѿ��رա�
�Ѿ�ж�����ݿ⡣
ORACLE �����Ѿ��رա�
SQL> $ move C:\ora10gBase\oradata\oy\REDO01.LOG  D:\D_Oracle_DBF\REDO01.LOG
SQL> $ move C:\ora10gBase\oradata\oy\REDO02.LOG  D:\D_Oracle_DBF\REDO02.LOG
SQL> $ move C:\ora10gBase\oradata\oy\REDO03.LOG  D:\D_Oracle_DBF\REDO03.LOG
SQL> startup mount
ORACLE �����Ѿ�������
Total System Global Area  209715200 bytes
Fixed Size                  1248140 bytes
Variable Size              92275828 bytes
Database Buffers          113246208 bytes
Redo Buffers                2945024 bytes
���ݿ�װ����ϡ�
SQL> alter database
  2  rename file
  3  'C:\ora10gBase\oradata\oy\REDO01.LOG',
  4  'C:\ora10gBase\oradata\oy\REDO02.LOG',
  5  'C:\ora10gBase\oradata\oy\REDO03.LOG'
  6  to
  7  'D:\D_Oracle_DBF\REDO01.LOG',
  8  'D:\D_Oracle_DBF\REDO02.LOG',
  9  'D:\D_Oracle_DBF\REDO03.LOG';
���ݿ��Ѹ��ġ�
SQL> alter database open;
���ݿ��Ѹ��ġ�
SQL> alter system switch logfile;
ϵͳ�Ѹ��ġ�
�����ļ�Ǩ��
 
 
�����ݿ�SHUTDOWN,Ȼ���޸�pfile�еĿ����ļ���·������pfile�ļ��������ݿ⣬
Ȼ��create spfile from pfile.�����spfile�������ݿ⼴�ɡ�
SQL> create spfile from pfile='D:\xxxx\pfile\init.ora.2162010162124';
 
-----------------------------
 
���⣬�����ƶ������ļ��ķ����������ݿ������鵵������£����Կ���Ǩ�ƣ���δ�����Ƿ���ȷ����
 
�ƶ�Oracle���ݿ��ռ��ļ�
Ŀ�ģ���oracle��ռ��ļ���һ���ط��ƶ�������һ���ط���
��ϸ�������裺
��һ�����ý��ʻָ�ģʽ��
A��Shutdown immdiate;
B��Startup mount;
C��Alter database archivelog;
D��Alter database open;
�ڶ���ж�ر�ռ䣺
A��Alter tablespace ��ռ����� offline;(ע�����Ϊ�ǹ鵵ģʽ�����Drop);
�������ڲ���ϵͳ���ƶ��ļ�����λ�á�
���ġ����߱�ռ������ļ��Ѿ��ƶ���
A��Alter database rename file 'ԭ�ļ�·��' to '���ļ�·��';
���塢װ�ر�ռ䣺
A��Alter tablespace ��ռ����� online;
�������ر����ݿ⣺
A��Shutdown;
���ߡ��������ݿ⣺
A��Startup force;
Oracle���ݿ��ռ��ļ��ƶ��ɹ���












 Oracle�����ռ�������ļ����
�����ռ�������ļ�
����

��ռ������ݿ���߼���ɲ���

�������Ͻ������ݿ����ݴ���������ļ���

���߼��Ͻ������ݿ����Ǵ���ڱ�ռ���

��ռ���һ�����Ƕ�������ļ����

 
���ݿ���߼��ṹ

���ܣ�

Oracle���߼��ṹ������ռ䡢�Ρ�������

˵����

���ݿ��ɱ�ռ乹��

����ռ������ɶι���

����������������

����������Oracle�鹹��

 

 

������һ�ֽ��������������ݿ��Ч��

 
��ռ�

���ܣ�

��ռ����ڴ��߼�����֯���ݿ������

���ݿ��߼�������һ�����Ƕ����ռ���ɵ�

 

��ռ������:

1���������ݿ�ռ�õĴ��̿ռ�

2��dba���Խ���ͬ�������Ͳ��𵽲�ͬ��λ�á��������������i/o���ܣ�ͬʱ���ڱ��ݺͻָ��ȹ������

 
������ռ�

������ռ���ʹ��create tablespace������ɵģ�Ҫע��ʱ��һ������£�������ռ�����Ȩ�û�����dba��ִ�еģ�����������û���������ռ䣬���û�����Ҫ����create tablespace��ϵͳȨ��

 
�������ݱ�ռ�

�ڽ������ݿ��Ϊ���ڹ������ý����Լ��ı�ռ�

create tablespace ��ռ��� datafile '�����ļ�·��' size �����ļ��Ĵ�С uniform size ���Ĵ�С;

 

create tablespace tangtao001 datafile 'd:\t001.dbf' size 20m uniform size 128k;

 
ʹ�����ݱ�ռ�

���½��ı�ռ���ӱ�

create table myDept(deptno number(4),dname varchar2(15),loc varchar2(13)) tablespace tangtao001;

 

˵����ִ������������󣬻Ὠ������Ϊtangtao001 �ı�ռ䣬��Ϊ�ñ�ռ佨������Ϊt001.dbf�������ļ������Ĵ�СΪ128k

 

1����ʾ��ռ���Ϣ

a) ��ѯ�����ֵ���ͼdba_tablespaces����ʾ��ռ���Ϣ

select tablespace_name from dba_tablespaces;

2����ʾ��ռ��������������ļ�

a) ��ѯ�����ֵ���ͼdba_data_files��������ʾ��ռ��������������ļ�

select file_name,bytes from dba_data_files where tablespace_name='��ռ���';

 
�ı��ռ��״̬

��������ռ�ʱ����ռ䴦��������(online)״̬����ʱ�ñ�ռ��ǿ��Է��ʵģ����Ҹñ�ռ��ǿ��Զ�д�ģ������Բ�ѯ�ñ�ռ�����ݣ����һ������ڱ�ռ�ִ�и�����䡣�����ڽ���ϵͳά����������ά��ʱ��������Ҫ�ı��ռ��״̬��һ������£�����Ȩ�û�����dba������

1��ʹ��ռ��ѻ�

alter tablespace ��ռ��� offline;

 

2��ʹ��ռ�����

alter tablespace ��ռ��� online;

 

3��ֻ����ռ�

a) ��������ռ�ʱ����ռ���Զ�д�������ϣ���ڸñ�ռ���ִ��update��delete��insert��������ô���Խ��ñ�ռ��޸�Ϊֻ��

alter tablespace ��ռ��� read only;

 

������

1��֪����ռ�������ʾ�ñ�ռ�����б�

select * from tall_tables where tablespace_name='��ռ���';

2��֪���������鿴�ñ������ĸ���ռ�

select tablespace_name,table_name from user_tables where table_name='emp';

 

 

ע��:

ͨ��2������֪��scott.emp����system�����ռ��ϣ����ڿ��Խ�system��Ϊֻ�������ǲ���ɹ�����Ϊsystem��ϵͳ��ռ䣬�������ͨ��ռ䣬���Խ�����Ϊֻ��

 
ɾ����ռ�

һ������£�����Ȩ�û�����dba������������������û���������ôҪ���û�����drop tablespaceϵͳȨ��

drop tablespace ��ռ��� including contents and datafiles;

 

˵����

Including contents ��ʾɾ����ռ䣬ɾ���ñ�ռ���������ݿ���󣬶�datafiles��ʾ�����ݿ��ļ�Ҳɾ��

 
��չ��ռ�

��ռ����������ļ���ɵģ���ռ�Ĵ�Сʵ���Ͼ��������ļ���Ӻ�Ĵ�С����ô���ǿ������󡣼ٶ���employee��ŵ�tangtao001��ռ��ϣ���ʼ��С����2m����������2m�ռ���������employee��������ݣ������ͻ���ʾ�ռ䲻��Ĵ���

 

����˵����

1������һ����ռ�tangtao001

2���ڸñ�ռ��Ͻ���һ����ͨ��mydment ��ṹ��deptһ��

3����ñ��м�������insert into mydment select * from dept;

4����һ��ʱ��ͻ�����޷���չ�����⣬��ô�죿

5������չ�ñ�ռ䣬Ϊ�����Ӹ���Ĵ洢�ռ䡣�����ַ�����

 

 

1�����������ļ�

alter tablespace ��ռ��� add datafile '�����ļ����·��' size �����ļ���С;

 

2�����������ļ��Ĵ�С

alter tablespace ��ռ��� add datafile '�����ļ���ŵ�·��' resize �����ļ��µĴ�С;

������ע�⣬�����ļ��Ĵ�С��Ҫ����500m

 

3�������ļ����Զ�����

alter tablespace ��ռ��� add datafile '�����ļ����·��' autoextend on next ÿ�����ӵĴ�С maxsize �����ļ���С�����ֵ;

 
�ƶ������ļ�

��ʱ����������ļ����ڵĴ�����ʱ���������ļ�������ʹ�ã�Ϊ���ܹ�����ʹ�ã���Ҫ����Щ�ļ��ĸ����ƶ��������Ĵ��̣�Ȼ��ָ�

 

����˵����

1��ȷ�������ļ����ڵı�ռ�

select tablespace_name from dba_data_files where file_name='d:\t01.dbf';

2��ʹ��ռ��ѻ�

a) ȷ�������ļ���һ���ԣ�����ռ�ת��Ϊoffline��״̬

alter tablespace tangtao001 offline;

3��ʹ�������ƶ������ļ���ָ����Ŀ��λ��

host move d:t01.dbf c:t01.dbf;

4��ִ��alter tablespace����

a) ���������ƶ������ݺ󣬻�����ִ��alter tablespace��������ݿ��ļ������߼��޸�

alter tablespace tangtao001 rename datafile 'd:t01.dbf' to 'c:t01.dbf';

5��ʹ�ñ�ռ�����

a) ���ƶ��������ļ���Ϊ��ʹ�û����Է��ʸñ�ռ䣬���뽫��ת��Ϊonline��״̬

alter tablespace tangtao001 online;

 
��ռ�С��

1���˽��ռ�������ļ�������

2�����ճ��ñ�ռ䣬undo��ռ����ʱ��ռ�Ľ�������

3���˽��ռ�ĸ���״̬

a) Online

b) Offline

c) Read write

d) Read only

4���˽��ƶ������ļ���ԭ�򣬼�ʹ��alter tablespace��alter datatable�����ƶ������ļ��ķ���

