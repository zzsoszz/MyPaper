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




ϵͳ������CentOS-6.3
�����nginx-1.2.6.tar.gz
��װ��ʽ��Դ����밲װ
��װλ�ã�/usr/local/nginx
���ص�ַ��http://nginx.org/en/download.html
��װǰ��

�ڰ�װnginxǰ����Ҫȷ��ϵͳ��װ��g++��gcc��openssl-devel��pcre-devel��zlib-devel�������װ���������
[root@admin /]#yum install gcc-c++
yum -y install zlib zlib-devel openssl openssl--devel pcre pcre-devel

���ϵͳ��װ��Nginx��
[root@admin local]# find -name nginx
./nginx
./nginx/sbin/nginx
./nginx-1.2.6/objs/nginx

ж��ԭ�е�Nginx
[root@admin /]# yum remove nginx
��װ

����װ���ļ��ϴ���/usr/local��ִ�����²�����
[root@admin local]# cd /usr/local
[root@admin local]# tar -zxv -f nginx-1.2.6.tar.gz
[root@admin local]# rm -rf nginx-1.2.6.tar.gz
[root@admin local]# mv nginx-1.2.6 nginx
[root@admin local]# cd /usr/local/nginx
[root@admin nginx]# ./configure --prefix=/usr/local/nginx
[root@admin nginx]# make
[root@admin nginx]# make install

����
#�޸ķ���ǽ���ã�
[root@admin nginx-1.2.6]# vi + /etc/sysconfig/iptables
#���������
-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
#��������ǽ
[root@admin nginx-1.2.6]# service iptables restart
����

#����1
[root@admin nginx-1.2.6]# /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
#����2
[root@admin nginx-1.2.6]# cd /usr/local/nginx/sbin
[root@admin sbin]# ./nginx
ֹͣ

#��ѯnginx�����̺�
ps -ef | grep nginx
#ֹͣ����
kill -QUIT �����̺�
#����ֹͣ
kill -TERM �����̺�
#ǿ��ֹͣ
pkill -9 nginx
����

[root@admin local]# /usr/local/nginx/sbin/nginx -s reload
����

#���Զ˿�
netstat �Cna|grep 80
#������в���
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






------------------------------------------------------------------�ڶ��ַ�ʽ


���ǽ���װ��CentOS6.5��ֱ��yum install nginx���У�Ҫ�ȴ�����Դ�������ǰ�װ�������̣�Ҳʮ�ּ򵥣�

CentOS 6����ִ��(�������㣬��ʵ�����ֶ����أ�Ȼ���ڱ�������)��

[plain] view plaincopyprint?��CODE�ϲ鿴����Ƭ�������ҵĴ���Ƭ

    rpm -ivh http://nginx.org/packages/centos/6/noarch/RPMS/nginx-release-centos-6-0.el6.ngx.noarch.rpm  
    yum -y install nginx  
    yum -y php-fpm  
    service php-fpm restart  
    service nginx restart  
    chkconfig php-fpm on  
    chkconfig nginx on  



���������ã�

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

����ȫ��#�š�




		