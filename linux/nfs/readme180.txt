nfs����Ŀ¼
http://www.jb51.net/os/RedHat/77993.html

Linux NFS�������İ�װ������ 
http://www.cnblogs.com/mchina/archive/2013/01/03/2840040.html

------------------------������
yum -y install nfs-utils rpcbind
vi /etc/exports 
/u01/tomcat-ehui/apache-tomcat-6.0.37/webapps/ehui/upload/ 192.168.1.104(rw,no_root_squash,no_all_squash,sync)

/u01/tomcat-ehui/apache-tomcat-6.0.37/webapps/ehui/upload/ 192.168.1.104(ro,no_root_squash,no_all_squash,sync)

service rpcbind restart
service nfs restart


------------------------�ͻ���
service nfs restart
showmount -e 192.168.1.101
mkdir -p /ftp/upload182
mount -t nfs 192.168.1.101:/u01/tomcat-ehui/apache-tomcat-6.0.37/webapps/ehui/upload /ftp/upload182

umount  /u01/tomcat-portal/apache-tomcat-6.0.37/webapps/portal/upload182








#������ip��ַ��Χ��192.168.0.*�ļ�����Զ�д��Ȩ��������/home/work Ŀ¼��
/home/work 192.168.0.*��rw,sync,root_squash��
/home  192.168.1.105 (rw,sync)
/public  * (rw,sync)

�����ļ�ÿ�з�Ϊ���Σ���һ��Ϊ�����Ŀ¼��ʹ�þ���·�����ڶ���Ϊ�ͻ��˵�ַ��Ȩ�ޡ�
��ַ����ʹ������IP�����Σ�����10.0.0.8��10.0.0.0/24��10.0.0.0/255.255.255.0��ȻҲ���Ե�ַ����ʹ����������DNS�����ĺͱ���/etc/hosts�����Ķ��У�֧��ͨ��������磺*.chengyongxu.com

Ȩ���У�
rw��read-write���ɶ�д��    ע�⣬�����������óɶ�д�ͻ��˻��ǲ�������д�룬��Ҫ��ȷ�����ù���Ŀ¼��Ȩ�ޣ��ο�����7
ro��read-only��ֻ����
sync���ļ�ͬʱд��Ӳ�̺��ڴ棻
async���ļ��ݴ����ڴ棬������ֱ��д���ڴ棻
no_root_squash��NFS�ͻ������ӷ����ʱ���ʹ�õ���root�Ļ�����ô�Է���˷����Ŀ¼��˵��Ҳӵ��rootȨ�ޡ���Ȼ���������ǲ���ȫ�ġ�
root_squash��NFS�ͻ������ӷ����ʱ���ʹ�õ���root�Ļ�����ô�Է���˷����Ŀ¼��˵��ӵ�������û�Ȩ�ޣ�ͨ������ʹ��nobody��nfsnobody��ݣ�
all_squash������NFS�ͻ������ӷ����ʱʹ��ʲô�û����Է���˷����Ŀ¼��˵����ӵ�������û�Ȩ�ޣ�
anonuid�������û���UIDֵ��ͨ����nobody��nfsnobody�������ڴ˴������趨��
anongid�������û���GIDֵ��
