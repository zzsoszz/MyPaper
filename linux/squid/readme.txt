�鿨dns 
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

 CentOS 6.4��Squid����������İ�װ������

һ�����

���������Ӣ��ȫ����Proxy Server���书�ܾ��Ǵ��������û�ȥȡ��������Ϣ��

Squid��һ������Internet ���ݵ������������û����������룬���Զ����������ص����ݡ���һ���û���Ҫ����һ����ҳʱ��������Squid ����һ�����룬ҪSquid ������������أ�Ȼ��Squid ������������վ���������ҳ�����ŰѸ���ҳ�����û�ͬʱ����һ�����ݣ�������û�����ͬ����ҳ��ʱ��Squid �ѱ���ı������������û���ʹ�û������ٶ��൱�졣Squid ���Դ���HTTP��FTP��GOPHER��SSL��WAIS��Э�鲢��Squid �����Զ��ؽ��д������Ը����Լ�����Ҫ����Squid��ʹ֮���˵�����Ҫ�Ķ�����

1.1 ��������

��������������пͻ�����Ҫ������ʱ��

a. �ͻ�������������������������

b. �������������Լ������ݻ��棻

c. ����������ڻ������ҵ����û���Ҫ�����ݣ�ȡ�����ݣ�

d. ������������ӻ�����ȡ�õ����ݷ��ظ��ͻ��ˡ�

�������������û�пͻ�����Ҫ������ʱ��

1. �ͻ�������������������������

2. �������������Լ������ݻ��棻

3. ����������ڻ�����û���ҵ��û���Ҫ�����ݣ�

4. �����������Internet �ϵ�Զ�˷�����������������

5. Զ�˷�������Ӧ��������Ӧ�����ݣ�

6. ���������ȡ��Զ�˷����������ݣ����ظ��ͻ��ˣ�������һ�ݵ��Լ������ݻ����С�

Squid���������������TCP/IP��Ӧ�ò㡣

Squid

1.2 Squid ����

���մ������͵Ĳ�ͬ�����Խ�Squid �����Ϊ�������ͷ��������������У�����ʵ�ַ�ʽ�Ĳ�ͬ���ֿ��Է�Ϊ��ͨ�����͸������

    ��ͨ������Ҫ�ͻ������������ָ������������ĵ�ַ���˿ڣ�
    ͸��������������ҵ�������������������Internet���У��ͻ�������Ҫָ�������������ַ���˿ڵ���Ϣ�������������Ҫ���÷���ǽ���Խ��ͻ�����Web��������ת����������������
    ���������ָ�Դ��������������internet�ϵ���������Ȼ������ת�����ڲ������ϵķ������������ӷ������ϵõ��Ľ�����ظ�internet���������ӵĿͻ��ˣ���ʱ�������������ͱ���Ϊһ����������

�ٷ���ַ��http://www.squid-cache.org/

�ο��ĵ���http://www.squid-cache.org/Doc/config/

����ϵͳ����

����ϵͳ��CentOS release 6.4 (Final)

Squid�汾��squid-3.1.10-20.el6_5.3.x86_64

SELINUX=disabled

HTTP Service: stoped

������װSquid����

3.1 ���squid����Ƿ�װ

# rpm -qa|grep squid

3.2 ���δ��װ����ʹ��yum ��ʽ��װ

# yum -y install squid

2

3.3 ���ÿ���������

# chkconfig --level 35 squid on             //��3��5�������Զ�����squid����

�ġ�squid�������������ļ�˵��

squid ���������ļ��� /etc/squid/squid.conf������squid���趨����������ļ������ã���������������һ�¸��ļ�������ѡ�
���ƴ���

http_port��3128������������//���ü�����IP��˿ں�

cache_mem 64 MB������������//�����ṩ��squidʹ�õ��ڴ棬squid���ڴ���ռ��Ϊ X * 10+15+��cache_mem��������XΪsquid��cacheռ�õ���������GBΪ��λ����
�������������������� ��������//���������cache��С��100M����0.1GB�����ڴ���ռ��Ϊ0.1*10+15+64=80M���Ƽ���СΪ�����ڴ��1/3-1/2����ࡣ
maximum_object_size 4 MB ����//����squid���̻�������ļ�������4M���ļ������浽Ӳ��

minimum_object_size 0 KB ����//����squid���̻�����С�ļ�

maximum_object_size_in_memory 4096 KB ����//����squid�ڴ滺������ļ�������4M���ļ������浽�ڴ�

cache_dir ufs /var/spool/squid 100 16 256 ����//����squid��cache���·�� ��cacheĿ¼��������λM����һ������Ŀ¼��������������Ŀ¼����

logformat combined %&gt;a %ui %un [%tl] "%rm %ru HTTP/%rv" %Hs %<st "%{Referer}>h" "%{User-Agent}&gt;h" %Ss:%Sh        //log�ļ���־��ʽ

access_log /var/log/squid/access.log combined����//log�ļ����·������־��ʽ

cache_log /var/log/squid/cache.log ����//���û�����־

logfile_rotate 60���� //log��ѭ 60��

cache_swap_high 95����//cacheĿ¼ʹ��������95%ʱ����ʼ����ɵ�cache

cache_swap_low 90���� //cacheĿ¼����90%ʱֹͣ��

acl localnet src 192.168.1.0/24����//���屾������

http_access allow localnet����//����������ʹ��

http_access deny all����//�ܾ�����

visible_hostname squid.david.dev����//������

cache_mgr mchina_tang@qq.com����//����Ա����

���ƴ���

����ACL��֪ʶ����ҿ������аٶȲ��ģ���������߼�ѡ���ο��ٷ��ĵ���http://www.squid-cache.org/Doc/config/��

ע�⣺squid2.0 ��squid3.0�Ĳ���Ǻܴ�ģ���������꣬����squid����ȷ�����Ҷ��ο��ٷ��ĵ�����Ӧ�汾˵����

�塢��ͨ�������

����׼�ġ���ͳ�Ĵ��������Ҫ�ͻ������������ָ������������ĵ�ַ���˿ڡ�

ʵ������ͼ���£�

squid-normal

5.1 ����Squid ���������IP��ַ

��eth1��IP��ַ�޸�Ϊ200.168.10.1

# ifconfig eth1 200.168.10.1

3

5.2 �༭squid �������ļ�/etc/squid/squid.conf
���ƴ���

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

���ƴ���

5.3 ��ʼ��

# squid �Cz

4

5.4 ����Squid

# /etc/init.d/squid start

5

5.5 ����Web ������

A. ��װApache

# rpm -qa|grep httpd

# yum -y install httpd

B. ����Apache�����뿪������

# /etc/init.d/httpd start

# chkconfig httpd on

C. ����index.html

# echo "<h1>Squid-Web1/200.168.10.2</h1>" > /var/www/html/index.html

D. �޸�Web������IP��ַ

��web��������IP��ַ�޸�Ϊ200.168.10.2

# ifconfig eth0 200.168.10.2

6

5.6 ���ÿͻ���IP��ַ

7

5.7 �������������

�����������IEΪ�����������ƣ����˵��� -> ���� -> Internet ѡ�� -> ���� -> ���������� -> ������������������¸�ʽ���á�

8

5.8 ����

9

���Գɹ���

5.9 ���Դ���ҳ��

��Oracle VM VirtualBox���Ϊ�����ֶ�������ip��ַ�������������ܷ��ʣ��պÿ��Բ��Է��ʳ����ҳ�档

10

���Կ�����squid �����ļ������õĲ����ڴ���ҳ�������ʾ��

����͸���������

��������ҵ�������������ͻ�������Ҫָ�������������ַ���˿ڵ���Ϣ��ͨ��iptables���ͻ�����Web��������ת����������������

ʵ������ͼ���£�

squid-transparent

6.1 �޸�squid �������ļ�/etc/squid/squid.conf
���ƴ���

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

���ƴ���

��http_port 3128 �����transparent �ؼ��֡�

6.2 reload

reload �������������Ч��

# /etc/init.d/squid reload

6.3 ���iptables���򣬰��ڲ���http�����ض���3128�˿�

A. ����iptables ����

# /etc/init.d/iptables start

11

B. �������iptables filter �����

# iptables -F

17

C. ����iptables ����

# /etc/init.d/iptables save

21

D. �鿴nat ������

# iptables -t nat -L -n

12

E. ��nat��������һ������

# iptables -t nat -I PREROUTING -i eth0 -s 192.168.1.0/24 -p tcp --dport 80 -j REDIRECT --to-port 3128

13

F. ����

22

G. ����iptables ��������

# chkconfig iptables on

6.4 �޸Ŀͻ���IP��ַ

��Ĭ����������Ϊsquid ������������ip��ַ��

19

6.5 ��������У�ȡ����������

16

6.6 ����

20

͸��������Գɹ���

�ߡ�����������

ΪInternet�û�������ҵWebվ���ṩ������١�

ʵ������ͼ���£�

squid-reverse

7.1 �رշ���ǽ

# /etc/init.d/iptables stop

7.2 �޸�Web Server ��ҳ

Web1:

# echo "<h1>Squid-Web1/192.168.1.18</h1>" > /var/www/html/index.html

Web2:

# echo "<h1>Squid-Web1/192.168.1.19</h1>" > /var/www/html/index.html

7.3 ����squid 

http_port 80 accel vhost 
http_access allow all 
cache_peer 192.168.1.18 parent 80 0 originserver round-robin weight=1 
cache_peer 192.168.1.19 parent 80 0 originserver round-robin weight=1 
visible_hostname squid.david.dev 
cache_mgr mchina_tang@qq.com

7.4 ����Squid����

24

squid����ʧ�ܣ���Ϊ�����趨��squid�ļ����˿���80����ϵͳ��http�����ͻ������Ҫ��http����ͣ����

7.5 squid ����ʧ�ܣ���ϵͳ������������apache����رա�

25

7.6 ����

squid ������round-robin�����Կͻ��˵ķ��ʽ���ѯ��̨web������������ "Ctrl + F5" �����ˢ�²��ԡ�

Web1:

28

Web2:

27

�鿴squid �ķ�����־��

26

�ˡ�ʵ��Ӧ��

����ʵ�齫ģ��ͨ����ͬ���������ʲ�ͬ�Ļ�������ʵ����ҵӦ���еĸ��ؾ��⡣�ͻ������������ַ��������www.squid.dev��������192.168.1.18��̨����������bbs.squid.dev��������192.168.1.19��̨������

ʵ������ͼ���£�

squid-reverse - domain

8.1 �޸�Web Server ��ҳ

Web1:

# echo "<h1>www.squid.dev/192.168.1.18</h1>" > /var/www/html/index.html

Web2:

# echo "<h1>bbs.squid.dev/192.168.1.19</h1>" > /var/www/html/index.html

8.2 ����Squid
���ƴ���

http_port 80 accel vhost 
http_access allow all 
cache_peer 192.168.1.18 parent 80 0 originserver name=www 
cache_peer 192.168.1.19 parent 80 0 originserver name=bbs 
cache_peer_domain www www.squid.dev 
cache_peer_domain bbs bbs.squid.dev 
visible_hostname squid.david.dev 
cache_mgr mchina_tang@qq.com

���ƴ���

8.3 ���ÿͻ���

�������ʹ��DNS��������������������Ϊ�˷��㣬����hosts �ļ���ֱ��ָ����

�޸�C:\Windows\System32\drivers\etc\hosts �ļ�

32

8.4 ����������� 

33

8.5 ����www.squid.dev

34

8.6 ����bbs.squid.dev

35

8.7 �鿴squid ������־

36

8.8 �鿴��̨��������apache ������־

# tailf /var/log/httpd/access.log

40

���Գɹ���