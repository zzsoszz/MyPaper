yum install -y rdesktop
rdesktop -a 32  192.168.2.2:3389 -u Administrator -p bx123456





 

CentOS��Window����Զ�����淽��    .

���ࣺ CentOS  2012-03-25 18:17 7080���Ķ� ����(0) �ղ� �ٱ� 

centos����ǽservicewindows������tcp


WindowsԶ��CentOS����

1.VNC




����������

1) ��װvncserver




[plain] view plaincopy
01.yum install -y vnc-server  


2) �޸�����




[plain] view plaincopy
01.vi /etc/sysconfig/vncservers  

�������ȥ#�����ֱ���������
Line1: "1:username"

Line2: "... 1024*768 ..."

3) ��������




[plain] view plaincopy
01.vncserver  

4) �޸ķ���ǽ



[plain] view plaincopy
01.vi /etc/sysconfig/iptables  

���-A INPUT -m state --state NEW -m tcp -p tcp -dport 5901 -j ACCEPT
5) ��������ǽ����




[plain] view plaincopy
01.service iptables restart  

6) ����vnc����



[plain] view plaincopy
01.service vncserver restart   

7) ping [�ͻ���ip]
��֤��ͨ��




�ͻ�������

1) ��vnc�ͻ��ˣ�����ip:5901

2) ��������




LinuxԶ��Windows����

1.rdesktop




�ͻ�������


1) ��װrdesktop




[plain] view plaincopy
01.yum install -y rdesktop  

2) ʹ��rdesktop�������ӵ�win����



[plain] view plaincopy
01.rdesktop -a 16 x.x.x.x:3389 -u username -p password -f  



����������


1) ����Զ�̷���

2) ȡ������ǽ����





��Ȩ����������Ϊ����ԭ�����£�δ������������ת�ء�









 linux��ʹ��rdesktop����Զ��windows    .

2011-12-07 11:06 4355���Ķ� ����(1) �ղ� �ٱ� 

linuxwindows�ı��༭Զ������ubuntu������


1�� ͨ��rdesktop��������WindowsԶ������

û�а�װ�����

sudo apt-get install rdesktop

��װ�󣬿������������

rdesktop -f -a 16 -u administrator -p passwrod feelamcheung 192.168.0.2:8080

    -u �� -p: ָ���û���������

      -f : Ĭ��ȫ���� ��Ҫ��Ctrl-Alt-Enter��ϼ�����ȫ��ģʽ�л���

      -a 16��ʾʹ��16 bitɫ��192.168.0.2��Windows��������ַ�� 8080�Ƕ˿ںţ�Ĭ����3389�����Բ���д��

-r clipboard:PRIMARYCLIPBOARD : ���һ��Ҫ���ϣ�Ҫ��Ȼ����������Linux�ͷ�����Windowsֱ�Ӹ���ճ�������ˡ�������Ҳû�����⡣

      -r sound:����������Ƶ�豸

      -r disk:sunray=/home/jimmy : ָ������Linux�ϵ�һ��Ŀ¼ӳ�䵽Զ��Windows�ϵ�Ӳ�̣������ļ��Ͳ����ٿ�Samba����FTP�ˡ�

���� rdesktop ��Ϊ��ϸ���÷������Բ�ѯ man rdesktop��

������ͼ�ν����tsclient���ߣ��ײ�Ҳ��ʹ��rdesktop��

������ҵ�����Windows��Remote Connection, ����Citrix������ҵ���

      ��װԶ�����г���

����XP����Զ�����棺�ڡ�������桱�ġ�ϵͳ������Զ�̡������ϡ������û�Զ�����ӵ��˼��������

���أ�http://www.cendio.com/files/thinlinc/seamlessrdp/seamlessrdp.zip ����ѹ��C�̸�Ŀ¼�£�C:\seamlessrdp

Ȼ��Ubuntu�оͿ�������

      rdesktop -A -s 'c:"seamlessrdp"seamlessrdpshell.exe C:"Program Files"Internet Explorer"iexplore.exe' 192.168.1.100:3389 -u administrator -p password

2. RealPlayer ��װ

   ������������RealPlayer11GOLD.bin

   ��ΰ�װ���

   chmod +x ~/����/RealPlayer11GOLD.bin

   sudo ~/����/RealPlayer11GOLD.bin

���ն���ʾ

Welcome to the RealPlayer (10.0.8.805) Setup for UNIX
 Setup will help you get RealPlayer running on your computer.
 Press [Enter] to continue...
ʱ���»س�����������һ����

Enter the complete path to the directory where you want
 RealPlayer to be installed. You must specify the full
 pathname of the directory and have write privileges to
 the chosen directory.
 Directory: [/home/shixinyu/RealPlayer]: 
����Ĭ�ϰ�װ���û������ļ����µ�RealPlayerĿ¼�£��������Ҫ��װ���𴦣����ڴ˴�����·��������ֱ�ӻس����ɡ�

You have selected the following RealPlayer configuration:

Destination: /home/shixinyu/RealPlayer

Enter [F]inish to begin copying files, or [P]revious to go
 back to the previous prompts: [F]: F
��װ�������ʾ���ȷ����Ϣ�������ȷ���ˣ�����F����س���
 ����ʾ

Copying RealPlayer files...configure system-wide symbolic links? [Y/n]: 
ʱ����Y���س����ɣ���������Ͼ�û����Ҫ�û������ĵط��ˣ�ͨ������������ϾͰ�װ���ˣ�����Ե���Ӧ�ó���Ӱ�������ҵ�RealPlayer11�������ˣ��״����л���һ�ΰ�װЭ����Ҫͬ�⡣

ע������ڸ�������������ɰ�װ����֮��Ӧ�ó���˵��µġ�Ӱ�����е���RealPlayer�޷�Ӧ���������Ubuntu��װ����SCIM���뷨����ô�ܿ�����SCIM��RealPlayer�ĳ�ͻ���㻹��Ҫ�������������
$sudo gedit /home/[yourid]/RealPlayer/realplay ""[yourid]ָ������ļ�����
 �ڴ򿪵��ı��༭���������������һ��
export GTK_IM_MODULE=xim

֮�󱣴��ı��༭����Ȼ���ٴ�ִ��RealPlayerӦ�þ������ˡ� 

 
