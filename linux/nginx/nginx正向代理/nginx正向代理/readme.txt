--------182
vi /usr/local/nginx/conf/nginx.conf
squid -f /etc/squid/squid.conf
--------






/usr/sbin/nginx -c /etc/nginx/nginx.conf
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf



----------------------------------------------
[root@web2bxtelcn conf.d]# vi /etc/nginx/nginx.conf
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}

--------------------------------------------------

vi /etc/nginx/conf.d/default.conf
server {
        resolver     192.168.1.1;
        listen       8777;
        server_name  localhost;

        location / {
                proxy_pass http://$http_host$request_uri;
        }
}




系统环境：CentOS-6.3
软件：nginx-1.2.6.tar.gz
安装方式：源码编译安装
安装位置：/usr/local/nginx
下载地址：http://nginx.org/en/download.html
安装前提

在安装nginx前，需要确保系统安装了g++、gcc、openssl-devel、pcre-devel和zlib-devel软件。安装必须软件：
[root@admin /]#yum install gcc-c++
yum -y install zlib zlib-devel openssl openssl--devel pcre pcre-devel

检查系统安装的Nginx：
[root@admin local]# find -name nginx
./nginx
./nginx/sbin/nginx
./nginx-1.2.6/objs/nginx

卸载原有的Nginx
[root@admin /]# yum remove nginx
安装

将安装包文件上传到/usr/local中执行以下操作：
[root@admin local]# cd /usr/local
[root@admin local]# tar -zxv -f nginx-1.2.6.tar.gz
[root@admin local]# rm -rf nginx-1.2.6.tar.gz
[root@admin local]# mv nginx-1.2.6 nginx
[root@admin local]# cd /usr/local/nginx
[root@admin nginx]# ./configure --prefix=/usr/local/nginx
[root@admin nginx]# make
[root@admin nginx]# make install

配置
#修改防火墙配置：
[root@admin nginx-1.2.6]# vi + /etc/sysconfig/iptables
#添加配置项
-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
#重启防火墙
[root@admin nginx-1.2.6]# service iptables restart
启动

#方法1
[root@admin nginx-1.2.6]# /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
#方法2
[root@admin nginx-1.2.6]# cd /usr/local/nginx/sbin
[root@admin sbin]# ./nginx
停止

#查询nginx主进程号
ps -ef | grep nginx
#停止进程
kill -QUIT 主进程号
#快速停止
kill -TERM 主进程号
#强制停止
pkill -9 nginx
重启

[root@admin local]# /usr/local/nginx/sbin/nginx -s reload
测试

#测试端口
netstat –na|grep 80
#浏览器中测试
http://ip:80







--------------------------------/usr/local/nginx/conf/nginx.conf
server {
        resolver 192.168.1.1;
        listen       8777;
        server_name  localhost;

        location / {
                proxy_pass http://$http_host$request_uri;
        }
}






------------------------------------------------------------------第二种方式


但是今天装了CentOS6.5，直接yum install nginx不行，要先处理下源，下面是安装完整流程，也十分简单：

CentOS 6，先执行(过程慢点，其实可以手动下载，然后在本地运行)：

[plain] view plaincopyprint?在CODE上查看代码片派生到我的代码片

    rpm -ivh http://nginx.org/packages/centos/6/noarch/RPMS/nginx-release-centos-6-0.el6.ngx.noarch.rpm  
    yum -y install nginx  
    yum -y php-fpm  
    service php-fpm restart  
    service nginx restart  
    chkconfig php-fpm on  
    chkconfig nginx on  



下面是配置：

vi /etc/nginx/conf.d/default.conf

    server {  
        listen       80;  
        server_name  localhost;  
        autoindex    on;  
        #charset koi8-r;  
        #access_log  /var/log/nginx/log/host.access.log  main;  
      
        location / {  
            root   /var/www/html;  
            index  index.html index.htm index.php;  
        }  
      
        location ~ \.php$ {  
            root           /var/www/html;  
            fastcgi_pass   127.0.0.1:9000;  
            fastcgi_index  index.php;  
            fastcgi_param  SCRIPT_FILENAME  /var/www/html$fastcgi_script_name;  
            include        fastcgi_params;  
        }....  

以下全是#号。




		