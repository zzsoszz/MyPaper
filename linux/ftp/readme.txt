-------------------------------------179
useradd -d /home/ftpbx ftpbx
passwd ftpbx
ftpbx@119.254.84.179
usermod -s /sbin/nologin 
setsebool  ftp_home_dir  on
setsebool  allow_ftpd_full_access on



useradd -d /home/historyrecord historyrecord
passwd historyrecord
usermod -s /sbin/nologin historyrecord




local_root=/var/ftp


http://www.cnblogs.com/bienfantaisie/archive/2011/12/04/2275203.html
http://www.open-open.com/lib/view/1416212189039
-------------------------------------------------------------
在linux中添加ftp用户，并设置相应的权限

在linux中添加ftp用户，并设置相应的权限，操作步骤如下：

1、环境：ftp为vsftp。被限制用户名为test。被限制路径为/home/test

2、建用户：在root用户下：

useradd -d /home/test test //增加用户test，并制定test用户的主目录为/home/test
passwd test //为test设置密码

3、更改用户相应的权限设置：

usermod -s /sbin/nologin test //限定用户test不能telnet，只能ftp
usermod -s /sbin/bash test //用户test恢复正常
usermod -d /test test //更改用户test的主目录为/test

4、限制用户只能访问/home/test，不能访问其他路径

修改/etc/vsftpd/vsftpd.conf如下：

chroot_list_enable=YES //限制访问自身目录
# (default follows)
chroot_list_file=/etc/vsftpd/vsftpd.chroot_list

编辑 vsftpd.chroot_list文件，将受限制的用户添加进去，每个用户名一行

改完配置文件，不要忘记重启vsFTPd服务器
[root@linuxsir001 root]# /etc/init.d/vsftpd restart

5、如果需要允许用户修改密码，但是又没有telnet登录系统的权限：

usermod -s /usr/bin/passwd test //用户telnet后将直接进入改密界面





-------------------------------------------------------------

Linux环境下使用vsftpd搭建ftpd服务器

    来自：http://www.webarch.org/category/linux

 我的生产环境是Centos5.6，由于需要提供ftp服务，就找了一款比较小巧的ftp服务器端软件，vsftpd(vsftpd 的名字代表”very secure FTP daemon”, 安全是它的开发者 Chris Evans 考虑的首要问题之一。在这个 FTP 服务器设计开发的最开始的时候，高安全性就是一个目标。)
 
 1.查看是否安装vsftp
 rpm -qa | grep vsftpd
 如果出现vsftpd-2.0.5-21.el5，说明已经安装 vsftp
 
 安装vsftp
 yum -y install vsftpd
 
 2.测试 是否安装成功 （ip 改成自己啊，不要用俺的此次登录为匿名登录 user: anonymous 密码为空 如果成功登录会有下面内容 这说明vsftpd安装成功）
 [root@localhost ~]#service vsftpd start
 为 vsftpd 启动 vsftpd：[确定]
 
 3,配置vsftpd
 # whereis vsftpd
 vsftpd: /usr/sbin/vsftpd /etc/vsftpd /usr/share/man/man8/vsftpd.8.gz
 yum安装的主要目录为上述的3个目录，其中配置文件vsftpd.conf在/etc/vsftpd中，下面看下怎么配置vsftpd.conf
 
 # 默认配置文件: /etc/vsftpd.conf
 #     下面是配置的选项及说明
 ######### 核心设置 ###########
  
 # 允许本地用户登录
 local_enable=YES
  
 # 本地用户的写权限
 write_enable=YES
  
 # 使用FTP的本地文件权限,默认为077
 # 一般设置为022
 local_umask=022
  
 # 切换目录时
 # 是否显示目录下.message的内容
 dirmessage_enable=YES
 dirlist_enable = NO
 #验证方式
 #pam_service_name=vsftpd
  
 # 启用FTP数据端口的数据连接
 connect_from_port_20=YES
  
 # 以独立的FTP服务运行
 listen=yes
  
 # 修改连接端口
 #listen_port=2121
  
 ######### 匿名登录设置 ###########
  
 # 允许匿名登录
 anonymous_enable=NO
  
 # 如果允许匿名登录
 # 是否开启匿名上传权限
 #anon_upload_enable=YES
  
 # 如果允许匿名登录
 # 是否允许匿名建立文件夹并在文件夹内上传文件
 #anon_mkdir_write_enable=YES
  
 # 如果允许匿名登录
 # 匿名帐号可以有删除的权限
 #anon_other_write_enable=yes
  
 # 如果允许匿名登录
 # 匿名的下载权限
 # 匿名为Other,可设置目录/文件属性控制
 #anon_world_readable_only=no
  
 # 如果允许匿名登录
 # 限制匿名用户传输速率,单位bite
 #anon_max_rate=30000
  
 ######### 用户限制设置 ###########
  
 #### 限制登录
  
 # 用userlist来限制用户访问
 #userlist_enable=yes
  
 # 名单中的人不允许访问
 #userlist_deny=no
  
 # 限制名单文件放置的路径
 #userlist_file=/etc/vsftpd/userlist_deny.chroot
  
 #### 限制目录
  
 # 限制所有用户都在家目录
 #chroot_local_user=yes
  
 # 调用限制在家目录的用户名单
 chroot_list_enable=YES
  
 # 限制在家目录的用户名单所在路径
 chroot_list_file=/etc/vsftpd/chroot_list
  
 ######### 日志设置 ###########
  
 # 日志文件路径设置
 xferlog_file=/var/log/vsftpd.log
  
 # 激活上传/下载的日志
 xferlog_enable=YES
  
 # 使用标准的日志格式
 #xferlog_std_format=YES
  
 ######### 安全设置 ###########
  
 # 用户空闲超时,单位秒
 #idle_session_timeout=600
  
 # 数据连接空闲超时,单位秒
 #data_connection_timeout=120
  
 # 将客户端空闲1分钟后断开
 #accept_timeout=60
  
 # 中断1分钟后重新连接
 #connect_timeout=60
  
 # 本地用户传输速率,单位bite
 #local_max_rate=50000
  
 # FTP的最大连接数
 #max_clients=200
  
 # 每IP的最大连接数
 #max_per_ip=5
  
 ######### 被动模式设置 ###########
  
 # 是否开户被动模式
 pasv_enable=yes
  
 # 被动模式最小端口
 pasv_min_port=5000
  
 # 被动模式最大端口
 pasv_max_port=6000
  
 ######### 其他设置 ###########
 # 欢迎信息
 ftpd_banner=Welcome to Ftp Server!
 
 
 4 添加ftp防火墙规则：
 /sbin/iptables -I INPUT -p tcp --dport 21 -j ACCEPT
 /etc/rc.d/init.d/iptables save
 /etc/init.d/iptables restart
 
 5 添加用户（注意，该处添加nologin类型用户ftpuser）：
 useradd -d /home/ftp -s /sbin/nologin ftpuser
 如果已启动vsftpd，重新启动
 pkill vsftpd /usr/sbin/vsftpd &
 
 6 到此，整个小巧的ftp服务器搭建成功。可以使用FileZilla FTP或FlashFXP等客户端软件登陆ftp server了。






vsftpd的配置说明，以及553 Could not create file.错误的解决
更新时间:2011-11-10 11:15:46来源:未知 作者:goldpony 点击:181次
VSFTP文件与目录 /usr/sbin/vsftp vsftp的主程序 /etc/rc.d/init.d/vsftp vsftp的启动脚本 /etc/vsftpd/vsftpd.conf vsftp的配置文件 /etc/pamd/vsftpd PAM认证文件 /etc/vsftpd/vsftpd.ftpuser 禁止使用FTP的用户 /etc/vsftpd/vsftpd.user_lis
      VSFTP文件与目录
      /usr/sbin/vsftp      vsftp的主程序
      /etc/rc.d/init.d/vsftp          vsftp的启动脚本
      /etc/vsftpd/vsftpd.conf        vsftp的配置文件
      /etc/pamd/vsftpd PAM认证文件
      /etc/vsftpd/vsftpd.ftpuser 禁止使用FTP的用户
      /etc/vsftpd/vsftpd.user_list 禁止或允许使用ftp的用户列表
      /var/ftp ftp匿名主目录
      /varftp/pub ftp匿名上传主目录

      VSFTP启动
      Standalone方式
      用于ftp访问频繁的环境 VSFTP进程始终运行监听端口
      Service vsftp start|stop|restart|status
      /etc/rc.d/init.d/vsftpd start|stop|restart
      或者在/etc/vsftpd/vsftpd.conf中 加入listen=yes 表示以standalone运行
      在inet.d守护进程中运行
      用于ftp访问量很小的情况 vsftp在inet.d守护进程中运行 
      运行/etc/inet.d/vsftp中的脚本
      VSFTP的配置文件 /etc/vsftpd/vsftpd.conf

      主动模式设置
      Port_enable=YES               开启主动模式
      Connect_from_port_20=YES      当主动模式开启的时候 是否启用默认的20端口监听
      Ftp_date_port=%portnumber%    上一选项使用NO参数是 指定数据传输端口

      被动模式
      PASV_enable=YES   开启被动模式
      PASV_min_port=%number% 被动模式最低端口
      PASV_max_port=%number% 被动模式最高端口

      匿名上传设置
      anonymous_enable=YES   启用匿名帐户
      anon_world_readable_only=NO 关闭匿名全局浏览
      anon_upload_enable=YES   匿名上传开启
      anon_mkdir_write_enable=YES 允许匿名用户创建目录
      write_enable=YES   全局写入权限开启
      
      限制本地用户访问文件系统
      chroot_local_user=YES    将本地用户浏览限制在其FTP根目录下

      限制部分用户访问文件系统
      chroot_list_enable=YES    启用列表（不可以与上条命令同时开启）
      chroot_list_file=%file path%   限制用户的列表文件

      连接限制
      Max_client=%number%   最大连接数
      max_per_ip=%number%   每ip最大连接数
      anon_max_rate=%number%    匿名用户最大速率 单位kbps
      local_max_rate=%number%   本地用户最大速率 单位kbps
      user_config_dir=%file path%/%username% 针对不同用户的连接速率设置
      %username%文件的内容为 local_max_rate=%number%
      
      用户主目录设置
      本地用户的主目录定义在/etc/passwd文件中
      其中FTP user：________为定义行
      全局重定向localuser的ftp主目录
      local_root=%path%

      安全设置
      hide_ids=YES   隐藏用户的UID和GID
      改变原有banner
      ftpd_banner=%message%
      或者
      banner_file=%file path%

      虚拟FTP站点设置
      首先创建2套conf文件
      #cp /etc/vsftpd/vsftpd.conf /etc/vsftp/vsftp2.conf
      创建ftp2的主目录
      #mkdir /var/ftp2 
      #useradd -d /var/ftp2 -M FTP2
      #service vsftpd restart
      
      单独启动某一站点
      /user/sbin/vsftpd /etc/vsftpd/vsftp2.conf&

      另附：553 Could not create file.错误的解决
      在RedHat 5上配置了Vsftpd,一切都是没有问题,用户也可以正常登陆,但是在上传文件的时候总是提示：
      553 Could not create file.的错误,百思不得其解,在网上搜了一下,原来是：
      Fedora Core 4缺省状态是打开selinux的,在这个状态下,vsftp会出现本地用户无法上传的问题（可能是本地用户的home目录,或者是整个目录）,错误信息为：
      553 Could not create file.
      要解决这个问题只要：
      1. setsebool -P ftpd_disable_trans 1
      2. service vsftpd restart
      就可以了。

      FTP用户一般是不能登录系统的，这也是为了安全。在系统中，没有权限登录系统的用户一般也被称之为虚拟用户；虚拟用户也是要写进/etc
      /passwd中；这只是一种虚拟用户的方法，但说实在的并不是真正的虚拟用户，只是把他登录SHELL的权限去掉了，所以他没有能力登录系统；
      如果我们想把beinan这个用户目录定位在/opt/beinan这个目录中，并且不能登录系统；我们应该如下操作
      [root@localhost ~]# adduser -d /opt/beinan -g ftp -s /sbin/nologin beinan
      [root@localhost ~]# passwd beinan
      Changing password for user beinan.
      New password:
      Retype new password:
      passwd: all authentication tokens updated successfully.
      [root@localhost ~]#
      其实这还是不够的，还要改一下配置文件vsFTPd.conf ，以确保本地虚拟用户能有读写权限；
      local_enable=YES
      write_enable=YES
      local_umask=022
(责任编辑：admin)

