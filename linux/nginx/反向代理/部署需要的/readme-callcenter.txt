参考
http://blog.csdn.net/zht666/article/details/38515147

使用nginx sticky实现基于cookie的负载均衡
http://www.ttlsa.com/nginx/nginx-modules-nginx-sticky-module/

Nginx 模块推荐 Session 粘连和扩展失败测试
http://www.linuxde.net/2012/03/9173.html


Nginx 四种分配方式——session处理
http://my.oschina.net/MrMichael/blog/293832?p=1

如何安装nginx第三方模块
http://www.ttlsa.com/nginx/how-to-install-nginx-third-modules/

Nginx添加模块(非覆盖安装)
http://www.linuxidc.com/Linux/2011-05/35348.htm

http://code.google.com/p/nginx-sticky-module/downloads/list

官方会话粘连模块代替上面的
http://nginx.org/en/docs/http/ngx_http_upstream_module.html#sticky

Nginx/LVS/HAProxy负载均衡软件的优缺点详解
http://os.51cto.com/art/201407/446441.htm

Nginx Sticky Module
https://bitbucket.org/nginx-goodies/nginx-sticky-module-ng/overview


用NginX+keepalived实现高可用的负载均衡
http://www.cnblogs.com/holbrook/archive/2012/10/25/2738475.html

使用keepalived实现双机热备
http://blog.csdn.net/kkdelta/article/details/39433137


Haproxy+keepalived实现高可用负载均衡
http://blog.chinaunix.net/uid-26575352-id-3529109.html


KeepAlived + mysqlMM高可用 安装配置 
http://blog.chinaunix.net/uid-27003384-id-3870735.html

使用keepalived实现双机热备
http://blog.csdn.net/kkdelta/article/details/39433137




1.1安装gcc、gcc-c++

安装命令：
sudo yum install gcc -y
sudo yum install gcc-c++ -y
sudo yum install lrzsz    #上传工具

1.2安装openssl
openssl官网：http://www.openssl.org/
安装版本：openssl-1.0.1p.tar.gz 
安装命令：
cd /ftp/setup/tools
tar -zxvf openssl-1.0.1p.tar.gz 
cd openssl-1.0.1p
sudo ./config --prefix=/usr/local/openssl-1.0.1p 
sudo make
sudo make install
【注意】：此处使用的是config命令，而不是平常的configure命令
安装完成后，到/usr/local/下查看是否安装成功。如果安装出错，需要重新加压缩，重新安装。



1.3安装pcre

pcre官网：http://www.pcre.org/
安装版本：pcre-8.37.tar.gz
安装命令：
cd /ftp/setup/tools
tar -zxvf pcre-8.37.tar.gz 
cd pcre-8.37
sudo ./configure --prefix=/usr/local/pcre-8.37
sudo make
sudo make install
安装完成后，到/usr/local/下查看是否安装成功。如果安装出错，需要重新加压缩，重新安装。
【注意】：如果没有安装c++编译器，这个软件的安装会报错！


1.4安装zlib

zlib官网：http://www.zlib.net/

安装版本：zlib-1.2.8.tar.gz
安装命令：
cd /ftp/setup/tools
tar -zxvf zlib-1.2.8.tar.gz
cd zlib-1.2.8
sudo ./configure --prefix=/usr/local/zlib-1.2.8    #prefix指定安装目录
sudo make
sudo make install
安装完成后，到/usr/local/下查看是否安装成功。如果安装出错，需要重新加压缩，重新安装。



1.5安装Nginx

安装版本：nginx-1.8.0.tar.gz

安装命令：
cd /ftp/setup/tools
tar -zxvf nginx-1.8.0.tar.gz

附加模块
unzip nginx-goodies-nginx-sticky-module-ng
cd nginx-1.8.0
./configure --prefix=/usr/local/nginx-1.8.0  --with-openssl=/ftp/setup/tools/openssl-1.0.1p --with-pcre=/ftp/setup/tools/pcre-8.37 --with-zlib=/ftp/setup/tools/zlib-1.2.8 --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --add-module=/ftp/setup/tools/nginx-goodies-nginx-sticky-module-ng
sudo make
make install

																																																																																																																																																		 
配置nginx 
cp -rf /usr/local/nginx-1.8.0/conf/nginx.conf   /usr/local/nginx-1.8.0/conf/nginx.conf_bak
vi /usr/local/nginx-1.8.0/conf/nginx.conf


启动
sudo  /usr/local/nginx-1.8.0/sbin/nginx
tail -f /usr/local/nginx-1.8.0/logs/access.log 
sudo  /usr/local/nginx-1.8.0/sbin/nginx  -s  reload
netstat -ano | grep 80 
ps -ef | grep nginx 


---------------------------------------------------------------------------
#user  nobody;
worker_processes  2;

error_log  logs/error.log;

events {
    use epoll;
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    upstream myClusterServer1{
		#ip_hash;
		sticky expires=1h;
        server 127.0.0.1:9041  weight=5;
        server 127.0.0.1:9051  weight=5;
    }
    server {
        listen       11001;
        server_name  localhost;
        location / {
            root   html;
            index  index.html index.htm;
			proxy_pass  http://myClusterServer1;
			proxy_redirect default;
			proxy_connect_timeout 10;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
--------------------------------------------------------------------------已安装后添加模块

1.nginx虚拟目录(alias与 root的区别)
 要使 /api 指向 /home/html/api/目录下的文件, 以下两种写法等效.

location /api/ {
    alias /home/html/api/;
}
location /api/ {
    root /home/html/;
}


 显而易见,使用alias配置更加直观.

https://bitbucket.org/nginx-goodies/nginx-sticky-module-ng/overview

unzip nginx-goodies-nginx-sticky-module-ng
cd /ftp/setup/tools/nginx-1.8.0
./configure --prefix=/usr/local/nginx-1.8.0  --with-openssl=/ftp/setup/tools/openssl-1.0.1p --with-pcre=/ftp/setup/tools/pcre-8.37 --with-zlib=/ftp/setup/tools/zlib-1.2.8 --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --add-module=/ftp/setup/tools/nginx-goodies-nginx-sticky-module-ng
make
make install


安装成功
[root@web2bxtelcn nginx-1.8.0]#  make install
make -f objs/Makefile install
make[1]: Entering directory `/ftp/setup/tools/nginx-1.8.0'
test -d '/usr/local/nginx-1.8.0' || mkdir -p '/usr/local/nginx-1.8.0'
test -d '/usr/local/nginx-1.8.0/sbin'           || mkdir -p '/usr/local/nginx-1.8.0/sbin'
test ! -f '/usr/local/nginx-1.8.0/sbin/nginx'           || mv '/usr/local/nginx-1.8.0/sbin/nginx'                       '/usr/local/nginx-1.8.0/sbin/nginx.old'
cp objs/nginx '/usr/local/nginx-1.8.0/sbin/nginx'
test -d '/usr/local/nginx-1.8.0/conf'           || mkdir -p '/usr/local/nginx-1.8.0/conf'
cp conf/koi-win '/usr/local/nginx-1.8.0/conf'
cp conf/koi-utf '/usr/local/nginx-1.8.0/conf'
cp conf/win-utf '/usr/local/nginx-1.8.0/conf'
test -f '/usr/local/nginx-1.8.0/conf/mime.types'                || cp conf/mime.types '/usr/local/nginx-1.8.0/conf'
cp conf/mime.types '/usr/local/nginx-1.8.0/conf/mime.types.default'
test -f '/usr/local/nginx-1.8.0/conf/fastcgi_params'            || cp conf/fastcgi_params '/usr/local/nginx-1.8.0/conf'
cp conf/fastcgi_params          '/usr/local/nginx-1.8.0/conf/fastcgi_params.default'
test -f '/usr/local/nginx-1.8.0/conf/fastcgi.conf'              || cp conf/fastcgi.conf '/usr/local/nginx-1.8.0/conf'
cp conf/fastcgi.conf '/usr/local/nginx-1.8.0/conf/fastcgi.conf.default'
test -f '/usr/local/nginx-1.8.0/conf/uwsgi_params'              || cp conf/uwsgi_params '/usr/local/nginx-1.8.0/conf'
cp conf/uwsgi_params            '/usr/local/nginx-1.8.0/conf/uwsgi_params.default'
test -f '/usr/local/nginx-1.8.0/conf/scgi_params'               || cp conf/scgi_params '/usr/local/nginx-1.8.0/conf'
cp conf/scgi_params             '/usr/local/nginx-1.8.0/conf/scgi_params.default'
test -f '/usr/local/nginx-1.8.0/conf/nginx.conf'                || cp conf/nginx.conf '/usr/local/nginx-1.8.0/conf/nginx.conf'
cp conf/nginx.conf '/usr/local/nginx-1.8.0/conf/nginx.conf.default'
test -d '/usr/local/nginx-1.8.0/logs'           || mkdir -p '/usr/local/nginx-1.8.0/logs'
test -d '/usr/local/nginx-1.8.0/logs' ||                mkdir -p '/usr/local/nginx-1.8.0/logs'
test -d '/usr/local/nginx-1.8.0/html'           || cp -R html '/usr/local/nginx-1.8.0'
test -d '/usr/local/nginx-1.8.0/logs' ||                mkdir -p '/usr/local/nginx-1.8.0/logs'
make[1]: Leaving directory `/ftp/setup/tools/nginx-1.8.0'