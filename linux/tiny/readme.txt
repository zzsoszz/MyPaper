yum install tinyproxy
vi /etc/tinyproxy.conf
	LogFile "/tmp/tinyproxy.log"
	PidFile "/tmp/tinyproxy.pid"
tinyproxy -d ~/etc/tinyproxy.conf  






作为 web server nginx 当然是可以处理 ssl 的，但作为 proxy 则是不行的。
因为 nginx 不支持 CONNECT，收到 “CONNECT /:443 HTTP/1.1” 后会报一个包含“client sent invalid request while reading client request line,” 的错误。
因为 CONNECT 是正向代理的特性，据说也没有计划支持。
如果觉得 squid 比较难上手，也不够轻量，可以试试类似的。

以下都支持 http/https，
trafficserver http://trafficserver.apache.org/docs/v2/admin/intro.htm
tinyproxy https://banu.com/tinyproxy/

基于 Python 的：
exaproxy http://code.google.com/p/exaproxy/
mitmproxy http://mitmproxy.org/
tinyhttpproxy http://www.oki-osk.jp/esc/python/proxy/ 就一个文件，06年以后就没有更新了

还有跨平台且有GUI的 Charles http://www.charlesproxy.com/
Charles 实在是太棒了！但还是不如fiddler方便，前者还是更侧重 抓包而不是代理，还是 fiddler 更强大些。如果有条件还是在 windows 上开 fiddler 的代理吧。 



https://banu.com/tinyproxy/


http://www.linuxidc.com/Linux/2013-05/83999.htm
基于TinyProxy搭建HTTP代理服务器
[日期：2013-05-08] 	来源：Linux社区  作者：abee23 	[字体：大 中 小]
一、前言
关于为什么要玩玩HTTP代理就不用我多说了。 
二、搭建环境

* Linux laptop 2.6.32-45-generic #100-Ubuntu SMP Wed Nov 14 10:41:11 UTC 2012 i686 GNU/Linux
* tinyproxy 1.8.1 
三、安装方法

$sudo apt-get install tinyproxy
安装后自动以root权限开启了tinyproxy服务，且默认监听端口是8888
四、启动帮助

$tinyproxy --help
Usage: tinyproxy [options]
Options are:
-d Do not daemonize (run in foreground).
-c FILE Use an alternate configuration file.
-h Display this usage information.
-l Display the license.
-v Display version information.
五、根用户的启动方法

* 默认启动
$sudo service tinyproxy start

* 重启
$sudo service tinyproxy restart

* 停止
$sudo service tinyproxy stop
六、DIY配置
4.1 默认配置文件位置

/etc/tinyproxy.conf

(可以从/etc/init.d/tinyproxy包装器脚本中查到) 
4.2 默认配置说明

* 以根用户启动时，在初始化完成后切换uid/gid为nobody/nogroup
* Port 默认监听端口为8888(该端口无需用root权限绑定)
* 默认在所在网卡上监听
* Logfile (必须)日志文件, 默认/usr/var/log/tinyproxy/tinyproxy.log，在LogFile文件不存在时会警告，不会运行失败。
* Pidfile (必须)pid文件, 默认/usr/var/run/tinyproxy/tinyproxy.pid，在PidFile文件不存在时会运行失败。
* StartServers 初始启动的代理服务器子进程(默认是10个)
*** Allow 允许使用tinyproxy进行HTTP代理的IP地址。默认是127.0.0.1，如果想要公开tinyproxy代理服务器，则把Allow一行注释掉。
4.3 Diy配置说明

tinyproxy可以以普通用户权限运行，只要监听端口是公开的就可以了。具体Diy配置方法如下:
-- 打包可执行程序与默认配置文件 --
1. $which tinyproxy
/usr/sbin/tinyproxy
2. $cp /usr/sbin/tinyproxy ~/bin
3. $cp /etc/tinyproxy.conf ~/etc

-- 修改配置 --
1. 将Port默认的8888改成你想要的端口(如ljysrv上面的8990 TCP端口)
2. 将Allow 127.0.0.1注释掉
3. 将Logfile改为/tmp/tinyproxy.log
4. 将PidFile改为/tmp/tinyproxy.pid

-- 启动 --
1. $cd ~/bin
2. $./tinyproxy -c ~/etc/tinyproxy.conf

-- 关闭 --
1. $killall tinyproxy
linux