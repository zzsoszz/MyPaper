service mysqld stop
/etc/init.d/mysql stop   (service mysqld stop )
/usr/bin/mysqld_safe --skip-grant-tables
���⿪��SSH����
[root@localhost ~]# mysql
mysql>use mysql
mysql>update user set password=password("bx123456") where user="root";
mysql>GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'  IDENTIFIED BY 'bx123456'  WITH GRANT OPTION;
mysql>flush privileges;
mysql>exit
mysql -u root -p




���/etc/Ŀ¼��û��my.cnf�����ļ����뵽/usr/share/mysql/���ҵ�*.cnf�ļ�����������һ����/etc/������Ϊmy.cnf)�С�

�������£����� 







[root@localhost tools]# service mysql start
mysql: δ��ʶ��ķ���
[root@localhost tools]# service mysqld start
��ʼ�� MySQL ���ݿ⣺ Installing MySQL system tables...
OK
Filling help tables...
OK

To start mysqld at boot time you have to copy
support-files/mysql.server to the right place for your system

PLEASE REMEMBER TO SET A PASSWORD FOR THE MySQL root USER !
To do so, start the server, then issue the following commands:

/usr/bin/mysqladmin -u root password 'new-password'
/usr/bin/mysqladmin -u root -h localhost password 'new-password'

Alternatively you can run:
/usr/bin/mysql_secure_installation

which will also give you the option of removing the test
databases and anonymous user created by default.  This is
strongly recommended for production servers.

See the manual for more instructions.

You can start the MySQL daemon with:
cd /usr ; /usr/bin/mysqld_safe &

You can test the MySQL daemon with mysql-test-run.pl
cd /usr/mysql-test ; perl mysql-test-run.pl

Please report any problems with the /usr/bin/mysqlbug script!

[ȷ��]
�������� mysqld�� [ȷ��]






����mysql������������

mysql��root�˻�,��������ʱͨ���õ���localhost��127.0.0.1,��˾�Ĳ��Է������ϵ�mysqlҲ��localhost������������޷�����,������ͣ.

�����������:

1,�޸ı�,��¼mysql���ݿ�,�л���mysql���ݿ�,ʹ��sql���鿴"select host,user from user ;"

mysql -u root -pvmwaremysql>use mysql;
mysql>update user set host = '%' where user ='root';
mysql>select host, user from user;
mysql>flush privileges;

ע��:���һ�����Ҫ,Ŀ����ʹ�޸���Ч.���û��д,���ǲ��ܽ���Զ������.

2,��Ȩ�û�,����rootʹ��������κ��������ӵ�mysql������

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'  IDENTIFIED BY 'admin123'  WITH GRANT OPTION;
flush privileges;

������������û�root��ipΪ192.168.1.104���������ӵ�mysql������

GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'192.168.1.104'   IDENTIFIED BY 'admin123'  WITH GRANT OPTION; 
flush privileges;






http://dev.mysql.com/get/Downloads/MySQL-5.6/MySQL-server-5.6.27-1.rhel5.x86_64.rpm















 ���Mysql ERROR 1045 (28000): Access denied for user 'root'@'localhost'����
 
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)
 
Red Hat Enterprise Linux 5��������mysql��������ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)
ԭ��1�������������
�ҿ�ʼ��ʱ��ֱ���������mysql start
��ȷ�����������ǣ�
/etc/rc.d/init.d/mysql start


ԭ��2�������ļ�����
���etc�����my.cnf�������ݣ�
[client]
#password   = your_password
port     = 3306
socket     = /usr/mysql-data/mysql.sock
# Here follows entries for some specific programs
# The MySQL server
[mysqld]
port     = 3306
socket     = /usr/mysql-data/mysql.sock


ԭ��3�������ļ�����
��Ҫ�޸�MySQL�����ű�/etc/rc.d/init.d/mysql��
����datadir=   ��     һ�м���£�

ԭ��4��ǰ��������ʹ��php����ʱ�򱨴�
��/etc/php.ini�޸�mysql.default_socket��ֵ����Ϊ��
mysql.default_socket=/var/lib/mysql/mysql.sock
�ص��յ����ø����ӣ�ln -s /var/lib/mysql/mysql.sock /tmp/mysql.sock
����/etc/php.ini��mysql.default_socket����ļ��У�����mysql.default_socket��ֵ��˵���������ģ�
;Default socket name for local MySQL connects. If empty, uses the built-in MySQL defaults.
���ֵһ��ʼ�ǿյģ�Ҳ����˵��������ǲ�����ȥ�޸ĵĻ���php����ʹ���ڽ���mysql�е�Ĭ��ֵ��
 
��һƪ���£�
Mysql ERROR 1045 (28000): Access denied for user 'root'@'localhost'����Ľ��

����������Ҫǿ�������޸����룬�������£�

/etc/init.d/mysql stop   (service mysqld stop )
/usr/bin/mysqld_safe --skip-grant-tables
���⿪��SSH����
[root@localhost ~]# mysql
mysql>use mysql
mysql>update user set password=password("123456") where user="root";
mysql>flush privileges;
mysql>exit

pkill -KILL -t pts/0 �ɽ�ptsΪ0��**�û�(֮ǰ����mysqld_safe���û�����)ǿ���߳�
�������� MySQL��/etc/init.d/mysql start   (service mysqld start)

ע�⣺���⻹������Ҫservice mysql star��������service mysql stop����ֹͣ��
����ֱ��ʹ��mysql�����ҵ��������Ϊ��bash: mysql: command not found������ֱ��**mysql�İ�װĿ¼�е�bin�ļ��и�����·������������е���Ҫ��./mysql ����ִ�С�
 
�������ԣ�http://sundful.javaeye.com/blog/704337
 
��һƪ����������롢�����û������£�
 
Quote:
First things first. Log in as root and stop the mysql daemon.

sudo /etc/init.d/mysql stop

Now lets start up the mysql daemon and skip the grant tables which store the passwords.

sudo mysqld_safe --skip-grant-tables&

(press Ctrl+C now to disown the process and start typing commands again)

You should see mysqld start up successfully. If not, well you have bigger issues. Now you should be able to connect to mysql without a password.

sudo mysql --user=root mysql

update user set Password=PASSWORD('new-password');
flush privileges;
exit;

Now kill your running mysqld then restart it normally.

sudo killall mysqld_safe&
(press Ctrl+C now to disown the process and start typing commands again)
/etc/init.d/mysql start

You should be good to go. Try not to forget your password again.
http://www.howtoforge.com/reset-forgotten-mysql-root-password
 
 
�������denied���ܽ᣺
MySQL Authentication Denial
3/29/2005, 12:05 am

It seems to me that a lot of people have auth denial when trying to make connections to MySQL. They seem to ignore the text of the error message. ��Access Denied�� means access denied, nothing else.

Remember three things have to match. The host as MySQL sees it, the username, and the password. When MySQL returns access denied it��s not broken. One or more of those three things does not match. I don��t really need to reiterate what��s in the manual. Chang the lock or change the key to make it fit.
�������ӵ�mysql���ĵ�����Ϊ��
http://dev.mysql.com/doc/refman/5.5/en/access-denied.html
 
 