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
        server 127.0.0.1:9051  weight=5 down;
    }
    server {
        resolver  192.168.2.1;
        listen       11001;
        server_name  localhost;
        location / {
                        root   html;
                        index  index.html index.htm;
                        proxy_pass  http://myClusterServer1;
                        proxy_set_header  X-Real-IP  $remote_addr;
                        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
                        proxy_set_header  Host $host:11001;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}