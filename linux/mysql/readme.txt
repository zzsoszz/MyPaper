service mysqld stop
/etc/init.d/mysql stop   (service mysqld stop )
/usr/bin/mysqld_safe --skip-grant-tables
另外开个SSH连接
[root@localhost ~]# mysql
mysql>use mysql
mysql>update user set password=password("bx123456") where user="root";
mysql>GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'  IDENTIFIED BY 'bx123456'  WITH GRANT OPTION;
mysql>flush privileges;
mysql>exit
mysql -u root -p




如果/etc/目录下没有my.cnf配置文件，请到/usr/share/mysql/下找到*.cnf文件，拷贝其中一个到/etc/并改名为my.cnf)中。

命令如下：　　 







[root@localhost tools]# service mysql start
mysql: 未被识别的服务
[root@localhost tools]# service mysqld start
初始化 MySQL 数据库： Installing MySQL system tables...
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

[确定]
正在启动 mysqld： [确定]






设置mysql允许外网访问

mysql的root账户,我在连接时通常用的是localhost或127.0.0.1,公司的测试服务器上的mysql也是localhost所以我想访问无法访问,测试暂停.

解决方法如下:

1,修改表,登录mysql数据库,切换到mysql数据库,使用sql语句查看"select host,user from user ;"

mysql -u root -pvmwaremysql>use mysql;
mysql>update user set host = '%' where user ='root';
mysql>select host, user from user;
mysql>flush privileges;

注意:最后一句很重要,目的是使修改生效.如果没有写,则还是不能进行远程连接.

2,授权用户,你想root使用密码从任何主机连接到mysql服务器

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'  IDENTIFIED BY 'admin123'  WITH GRANT OPTION;
flush privileges;

如果你想允许用户root从ip为192.168.1.104的主机连接到mysql服务器

GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'192.168.1.104'   IDENTIFIED BY 'admin123'  WITH GRANT OPTION; 
flush privileges;






http://dev.mysql.com/get/Downloads/MySQL-5.6/MySQL-server-5.6.27-1.rhel5.x86_64.rpm















 解决Mysql ERROR 1045 (28000): Access denied for user 'root'@'localhost'问题
 
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)
 
Red Hat Enterprise Linux 5服务器上mysql启动报错：ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)
原因1－启动命令错误：
我开始的时候直接输入命令：mysql start
正确的启动命令是：
/etc/rc.d/init.d/mysql start


原因2－配置文件错误：
检查etc下面的my.cnf如下内容：
[client]
#password   = your_password
port     = 3306
socket     = /usr/mysql-data/mysql.sock
# Here follows entries for some specific programs
# The MySQL server
[mysqld]
port     = 3306
socket     = /usr/mysql-data/mysql.sock


原因3－启动文件错误：
需要修改MySQL启动脚本/etc/rc.d/init.d/mysql，
其中datadir=   ？     一行检查下！

原因4－前提是你在使用php连接时候报错！
在/etc/php.ini修改mysql.default_socket的值设置为：
mysql.default_socket=/var/lib/mysql/mysql.sock
回到终点设置个连接：ln -s /var/lib/mysql/mysql.sock /tmp/mysql.sock
（在/etc/php.ini中mysql.default_socket这个文件中，关于mysql.default_socket的值的说明是这样的，
;Default socket name for local MySQL connects. If empty, uses the built-in MySQL defaults.
这个值一开始是空的，也就是说，如果我们不主动去修改的话，php将会使用内建在mysql中的默认值）
 
另一篇文章：
Mysql ERROR 1045 (28000): Access denied for user 'root'@'localhost'问题的解决

这种问题需要强行重新修改密码，方法如下：

/etc/init.d/mysql stop   (service mysqld stop )
/usr/bin/mysqld_safe --skip-grant-tables
另外开个SSH连接
[root@localhost ~]# mysql
mysql>use mysql
mysql>update user set password=password("123456") where user="root";
mysql>flush privileges;
mysql>exit

pkill -KILL -t pts/0 可将pts为0的**用户(之前运行mysqld_safe的用户窗口)强制踢出
正常启动 MySQL：/etc/init.d/mysql start   (service mysqld start)

注意：另外还遇到需要service mysql star才能启动service mysql stop才能停止。
还有直接使用mysql不能找到命令，错误为“bash: mysql: command not found”可以直接**mysql的安装目录中的bin文件夹跟绝对路径运行命令，还有的需要加./mysql 才能执行。
 
本文来自：http://sundful.javaeye.com/blog/704337
 
另一篇关于清除密码、重置用户的文章：
 
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
 
 
另外关于denied的总结：
MySQL Authentication Denial
3/29/2005, 12:05 am

It seems to me that a lot of people have auth denial when trying to make connections to MySQL. They seem to ignore the text of the error message. ‘Access Denied’ means access denied, nothing else.

Remember three things have to match. The host as MySQL sees it, the username, and the password. When MySQL returns access denied it’s not broken. One or more of those three things does not match. I don’t really need to reiterate what’s in the manual. Chang the lock or change the key to make it fit.
其中连接到mysql的文档内容为：
http://dev.mysql.com/doc/refman/5.5/en/access-denied.html
 
 