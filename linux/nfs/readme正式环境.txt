nfs����Ŀ¼
http://www.jb51.net/os/RedHat/77993.html

Linux NFS�������İ�װ������ 
http://www.cnblogs.com/mchina/archive/2013/01/03/2840040.html


------------------------������
yum -y install nfs-utils rpcbind
vi /etc/exports 
/u01/tomcat-ehui/apache-tomcat-6.0.37/webapps/ehui/upload/ 192.168.1.*(ro,no_root_squash,no_all_squash,sync)
service rpcbind restart
service nfs restart


------------------------�ͻ���
service nfs restart
showmount -e 192.168.1.101
umount  /ftp/upload182
mkdir -p /ftp/upload182
mount -t nfs 192.168.1.101:/u01/tomcat-ehui/apache-tomcat-6.0.37/webapps/ehui/upload /ftp/upload182



