yum install tinyproxy
vi /etc/tinyproxy.conf
	LogFile "/tmp/tinyproxy.log"
	PidFile "/tmp/tinyproxy.pid"
tinyproxy -d ~/etc/tinyproxy.conf  






��Ϊ web server nginx ��Ȼ�ǿ��Դ��� ssl �ģ�����Ϊ proxy ���ǲ��еġ�
��Ϊ nginx ��֧�� CONNECT���յ� ��CONNECT /:443 HTTP/1.1�� ��ᱨһ��������client sent invalid request while reading client request line,�� �Ĵ���
��Ϊ CONNECT �������������ԣ���˵Ҳû�мƻ�֧�֡�
������� squid �Ƚ������֣�Ҳ���������������������Ƶġ�

���¶�֧�� http/https��
trafficserver http://trafficserver.apache.org/docs/v2/admin/intro.htm
tinyproxy https://banu.com/tinyproxy/

���� Python �ģ�
exaproxy http://code.google.com/p/exaproxy/
mitmproxy http://mitmproxy.org/
tinyhttpproxy http://www.oki-osk.jp/esc/python/proxy/ ��һ���ļ���06���Ժ��û�и�����

���п�ƽ̨����GUI�� Charles http://www.charlesproxy.com/
Charles ʵ����̫���ˣ������ǲ���fiddler���㣬ǰ�߻��Ǹ����� ץ�������Ǵ������� fiddler ��ǿ��Щ����������������� windows �Ͽ� fiddler �Ĵ���ɡ� 



https://banu.com/tinyproxy/


http://www.linuxidc.com/Linux/2013-05/83999.htm
����TinyProxy�HTTP���������
[���ڣ�2013-05-08] 	��Դ��Linux����  ���ߣ�abee23 	[���壺�� �� С]
һ��ǰ��
����ΪʲôҪ����HTTP����Ͳ����Ҷ�˵�ˡ� 
���������

* Linux laptop 2.6.32-45-generic #100-Ubuntu SMP Wed Nov 14 10:41:11 UTC 2012 i686 GNU/Linux
* tinyproxy 1.8.1 
������װ����

$sudo apt-get install tinyproxy
��װ���Զ���rootȨ�޿�����tinyproxy������Ĭ�ϼ����˿���8888
�ġ���������

$tinyproxy --help
Usage: tinyproxy [options]
Options are:
-d Do not daemonize (run in foreground).
-c FILE Use an alternate configuration file.
-h Display this usage information.
-l Display the license.
-v Display version information.
�塢���û�����������

* Ĭ������
$sudo service tinyproxy start

* ����
$sudo service tinyproxy restart

* ֹͣ
$sudo service tinyproxy stop
����DIY����
4.1 Ĭ�������ļ�λ��

/etc/tinyproxy.conf

(���Դ�/etc/init.d/tinyproxy��װ���ű��в鵽) 
4.2 Ĭ������˵��

* �Ը��û�����ʱ���ڳ�ʼ����ɺ��л�uid/gidΪnobody/nogroup
* Port Ĭ�ϼ����˿�Ϊ8888(�ö˿�������rootȨ�ް�)
* Ĭ�������������ϼ���
* Logfile (����)��־�ļ�, Ĭ��/usr/var/log/tinyproxy/tinyproxy.log����LogFile�ļ�������ʱ�ᾯ�棬��������ʧ�ܡ�
* Pidfile (����)pid�ļ�, Ĭ��/usr/var/run/tinyproxy/tinyproxy.pid����PidFile�ļ�������ʱ������ʧ�ܡ�
* StartServers ��ʼ�����Ĵ���������ӽ���(Ĭ����10��)
*** Allow ����ʹ��tinyproxy����HTTP�����IP��ַ��Ĭ����127.0.0.1�������Ҫ����tinyproxy��������������Allowһ��ע�͵���
4.3 Diy����˵��

tinyproxy��������ͨ�û�Ȩ�����У�ֻҪ�����˿��ǹ����ľͿ����ˡ�����Diy���÷�������:
-- �����ִ�г�����Ĭ�������ļ� --
1. $which tinyproxy
/usr/sbin/tinyproxy
2. $cp /usr/sbin/tinyproxy ~/bin
3. $cp /etc/tinyproxy.conf ~/etc

-- �޸����� --
1. ��PortĬ�ϵ�8888�ĳ�����Ҫ�Ķ˿�(��ljysrv�����8990 TCP�˿�)
2. ��Allow 127.0.0.1ע�͵�
3. ��Logfile��Ϊ/tmp/tinyproxy.log
4. ��PidFile��Ϊ/tmp/tinyproxy.pid

-- ���� --
1. $cd ~/bin
2. $./tinyproxy -c ~/etc/tinyproxy.conf

-- �ر� --
1. $killall tinyproxy
linux