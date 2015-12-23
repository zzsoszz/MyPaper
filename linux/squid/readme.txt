查卡dns 
vi  /etc/resolv.conf



squid -f /etc/squid/squid.conf
vi /etc/squid/squid.conf
tail -f   /var/log/squid/cache.log
tail -f   /var/log/squid/access.log
squid -k reconfigure
squid -kdebug






[root@db1 squid]# vi squid.conf

dns_nameservers 61.139.2.69

http_access allow all

http_port 8666

forwarded_for transparent

# Uncomment and adjust the following to add a disk cache directory.
#cache_dir ufs /var/spool/squid 100 16 256

# Leave coredumps in the first cache dir
coredump_dir /var/spool/squid

cache_effective_user squid
cache_effective_group squid
#dns_nameservers 61.139.2.69
dns_nameservers 192.168.1.1

debug_options ALL,1 33,2
~













http://www.cnblogs.com/mchina/p/centos-squid-proxy-server.html

 CentOS 6.4下Squid代理服务器的安装与配置

一、简介

代理服务器英文全称是Proxy Server，其功能就是代理网络用户去取得网络信息。

Squid是一个缓存Internet 数据的软件，其接收用户的下载申请，并自动处理所下载的数据。当一个用户想要下载一个主页时，可以向Squid 发出一个申请，要Squid 代替其进行下载，然后Squid 连接所申请网站并请求该主页，接着把该主页传给用户同时保留一个备份，当别的用户申请同样的页面时，Squid 把保存的备份立即传给用户，使用户觉得速度相当快。Squid 可以代理HTTP、FTP、GOPHER、SSL和WAIS等协议并且Squid 可以自动地进行处理，可以根据自己的需要设置Squid，使之过滤掉不想要的东西。

1.1 工作流程

当代理服务器中有客户端需要的数据时：

a. 客户端向代理服务器发送数据请求；

b. 代理服务器检查自己的数据缓存；

c. 代理服务器在缓存中找到了用户想要的数据，取出数据；

d. 代理服务器将从缓存中取得的数据返回给客户端。

当代理服务器中没有客户端需要的数据时：

1. 客户端向代理服务器发送数据请求；

2. 代理服务器检查自己的数据缓存；

3. 代理服务器在缓存中没有找到用户想要的数据；

4. 代理服务器向Internet 上的远端服务器发送数据请求；

5. 远端服务器响应，返回相应的数据；

6. 代理服务器取得远端服务器的数据，返回给客户端，并保留一份到自己的数据缓存中。

Squid代理服务器工作在TCP/IP的应用层。

Squid

1.2 Squid 分类

按照代理类型的不同，可以将Squid 代理分为正向代理和反向代理，正向代理中，根据实现方式的不同，又可以分为普通代理和透明代理。

    普通代理：需要客户机在浏览器中指定代理服务器的地址、端口；
    透明代理：适用于企业的网关主机（共享接入Internet）中，客户机不需要指定代理服务器地址、端口等信息，代理服务器需要设置防火墙策略将客户机的Web访问数据转交给代理服务程序处理；
    反向代理：是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个服务器。

官方地址：http://www.squid-cache.org/

参考文档：http://www.squid-cache.org/Doc/config/

二、系统环境

操作系统：CentOS release 6.4 (Final)

Squid版本：squid-3.1.10-20.el6_5.3.x86_64

SELINUX=disabled

HTTP Service: stoped

三、安装Squid服务

3.1 检查squid软件是否安装

# rpm -qa|grep squid

3.2 如果未安装，则使用yum 方式安装

# yum -y install squid

2

3.3 设置开机自启动

# chkconfig --level 35 squid on             //在3、5级别上自动运行squid服务

四、squid服务器的配置文件说明

squid 的主配置文件是 /etc/squid/squid.conf，所有squid的设定都是在这个文件里配置，下面我们来讲解一下该文件的配置选项。
复制代码

http_port　3128　　　　　　//设置监听的IP与端口号

cache_mem 64 MB　　　　　　//额外提供给squid使用的内存，squid的内存总占用为 X * 10+15+“cache_mem”，其中X为squid的cache占用的容量（以GB为单位），
　　　　　　　　　　 　　　　//比如下面的cache大小是100M，即0.1GB，则内存总占用为0.1*10+15+64=80M，推荐大小为物理内存的1/3-1/2或更多。
maximum_object_size 4 MB 　　//设置squid磁盘缓存最大文件，超过4M的文件不保存到硬盘

minimum_object_size 0 KB 　　//设置squid磁盘缓存最小文件

maximum_object_size_in_memory 4096 KB 　　//设置squid内存缓存最大文件，超过4M的文件不保存到内存

cache_dir ufs /var/spool/squid 100 16 256 　　//定义squid的cache存放路径 、cache目录容量（单位M）、一级缓存目录数量、二级缓存目录数量

logformat combined %&gt;a %ui %un [%tl] "%rm %ru HTTP/%rv" %Hs %<st "%{Referer}>h" "%{User-Agent}&gt;h" %Ss:%Sh        //log文件日志格式

access_log /var/log/squid/access.log combined　　//log文件存放路径和日志格式

cache_log /var/log/squid/cache.log 　　//设置缓存日志

logfile_rotate 60　　 //log轮循 60天

cache_swap_high 95　　//cache目录使用量大于95%时，开始清理旧的cache

cache_swap_low 90　　 //cache目录清理到90%时停止。

acl localnet src 192.168.1.0/24　　//定义本地网段

http_access allow localnet　　//允许本地网段使用

http_access deny all　　//拒绝所有

visible_hostname squid.david.dev　　//主机名

cache_mgr mchina_tang@qq.com　　//管理员邮箱

复制代码

关于ACL的知识，大家可以自行百度查阅，其他更多高级选项，请参考官方文档：http://www.squid-cache.org/Doc/config/。

注意：squid2.0 和squid3.0的差别还是很大的，如果配置完，启动squid不正确，请大家多多参考官方文档的相应版本说明。

五、普通代理服务

即标准的、传统的代理服务，需要客户机在浏览器中指定代理服务器的地址、端口。

实验拓扑图如下：

squid-normal

5.1 配置Squid 代理服务器IP地址

将eth1的IP地址修改为200.168.10.1

# ifconfig eth1 200.168.10.1

3

5.2 编辑squid 主配置文件/etc/squid/squid.conf
复制代码

http_port 3128 
cache_mem 64 MB 
maximum_object_size 4 MB 
cache_dir ufs /var/spool/squid 100 16 256 
access_log /var/log/squid/access.log 
acl localnet src 192.168.1.0/24 
http_access allow localnet 
http_access deny all 
visible_hostname squid.david.dev 
cache_mgr mchina_tang@qq.com

复制代码

5.3 初始化

# squid –z

4

5.4 启动Squid

# /etc/init.d/squid start

5

5.5 配置Web 服务器

A. 安装Apache

# rpm -qa|grep httpd

# yum -y install httpd

B. 启动Apache并加入开机启动

# /etc/init.d/httpd start

# chkconfig httpd on

C. 创建index.html

# echo "<h1>Squid-Web1/200.168.10.2</h1>" > /var/www/html/index.html

D. 修改Web服务器IP地址

将web服务器的IP地址修改为200.168.10.2

# ifconfig eth0 200.168.10.2

6

5.6 配置客户端IP地址

7

5.7 配置浏览器代理

打开浏览器（以IE为例，其他类似），菜单栏 -> 工具 -> Internet 选项 -> 连接 -> 局域网设置 -> 代理服务器，按照以下格式设置。

8

5.8 测试

9

测试成功。

5.9 测试错误页面

在Oracle VM VirtualBox里，因为上面手动设置了ip地址，导致外网不能访问，刚好可以测试访问出错的页面。

10

可以看到在squid 配置文件里设置的参数在错误页面里的显示。

六、透明代理服务

适用于企业的网关主机，客户机不需要指定代理服务器地址、端口等信息，通过iptables将客户机的Web访问数据转交给代理服务程序处理。

实验拓扑图如下：

squid-transparent

6.1 修改squid 主配置文件/etc/squid/squid.conf
复制代码

http_port 3128 transparent 
cache_mem 64 MB 
maximum_object_size 4 MB 
cache_dir ufs /var/spool/squid 100 16 256 
access_log /var/log/squid/access.log 
acl localnet src 192.168.1.0/24 
http_access allow localnet 
http_access deny all 
visible_hostname squid.david.dev 
cache_mgr mchina_tang@qq.com

复制代码

在http_port 3128 后添加transparent 关键字。

6.2 reload

reload 让上面的配置生效。

# /etc/init.d/squid reload

6.3 添加iptables规则，把内部的http请求重定向到3128端口

A. 启动iptables 服务

# /etc/init.d/iptables start

11

B. 清除现有iptables filter 表规则

# iptables -F

17

C. 保存iptables 设置

# /etc/init.d/iptables save

21

D. 查看nat 表设置

# iptables -t nat -L -n

12

E. 在nat表中新增一条规则

# iptables -t nat -I PREROUTING -i eth0 -s 192.168.1.0/24 -p tcp --dport 80 -j REDIRECT --to-port 3128

13

F. 保存

22

G. 设置iptables 开机启动

# chkconfig iptables on

6.4 修改客户端IP地址

将默认网关设置为squid 服务器的内网ip地址。

19

6.5 在浏览器中，取消代理设置

16

6.6 测试

20

透明代理测试成功。

七、反向代理服务

为Internet用户访问企业Web站点提供缓存加速。

实验拓扑图如下：

squid-reverse

7.1 关闭防火墙

# /etc/init.d/iptables stop

7.2 修改Web Server 主页

Web1:

# echo "<h1>Squid-Web1/192.168.1.18</h1>" > /var/www/html/index.html

Web2:

# echo "<h1>Squid-Web1/192.168.1.19</h1>" > /var/www/html/index.html

7.3 配置squid 

http_port 80 accel vhost 
http_access allow all 
cache_peer 192.168.1.18 parent 80 0 originserver round-robin weight=1 
cache_peer 192.168.1.19 parent 80 0 originserver round-robin weight=1 
visible_hostname squid.david.dev 
cache_mgr mchina_tang@qq.com

7.4 启动Squid服务

24

squid启动失败，因为上面设定了squid的监听端口是80，和系统的http服务冲突，所以要将http服务停掉。

7.5 squid 启动失败，将系统开机自启动的apache服务关闭。

25

7.6 测试

squid 采用了round-robin，所以客户端的访问将轮询两台web服务器，采用 "Ctrl + F5" 来深度刷新测试。

Web1:

28

Web2:

27

查看squid 的访问日志。

26

八、实际应用

下面实验将模拟通过不同的域名访问不同的机器，简单实现企业应用中的负载均衡。客户端在浏览器地址栏中输入www.squid.dev，将访问192.168.1.18这台机器，访问bbs.squid.dev，将访问192.168.1.19这台机器。

实验拓扑图如下：

squid-reverse - domain

8.1 修改Web Server 主页

Web1:

# echo "<h1>www.squid.dev/192.168.1.18</h1>" > /var/www/html/index.html

Web2:

# echo "<h1>bbs.squid.dev/192.168.1.19</h1>" > /var/www/html/index.html

8.2 配置Squid
复制代码

http_port 80 accel vhost 
http_access allow all 
cache_peer 192.168.1.18 parent 80 0 originserver name=www 
cache_peer 192.168.1.19 parent 80 0 originserver name=bbs 
cache_peer_domain www www.squid.dev 
cache_peer_domain bbs bbs.squid.dev 
visible_hostname squid.david.dev 
cache_mgr mchina_tang@qq.com

复制代码

8.3 配置客户端

这里可以使用DNS服务来解析，这里我们为了方便，就在hosts 文件里直接指定。

修改C:\Windows\System32\drivers\etc\hosts 文件

32

8.4 测试网络情况 

33

8.5 测试www.squid.dev

34

8.6 测试bbs.squid.dev

35

8.7 查看squid 访问日志

36

8.8 查看两台服务器的apache 访问日志

# tailf /var/log/httpd/access.log

40

测试成功。