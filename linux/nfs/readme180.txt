nfs共享目录
http://www.jb51.net/os/RedHat/77993.html

Linux NFS服务器的安装与配置 
http://www.cnblogs.com/mchina/archive/2013/01/03/2840040.html

------------------------服务器
yum -y install nfs-utils rpcbind
vi /etc/exports 
/u01/tomcat-ehui/apache-tomcat-6.0.37/webapps/ehui/upload/ 192.168.1.104(rw,no_root_squash,no_all_squash,sync)

/u01/tomcat-ehui/apache-tomcat-6.0.37/webapps/ehui/upload/ 192.168.1.104(ro,no_root_squash,no_all_squash,sync)

service rpcbind restart
service nfs restart


------------------------客户机
service nfs restart
showmount -e 192.168.1.101
mkdir -p /ftp/upload182
mount -t nfs 192.168.1.101:/u01/tomcat-ehui/apache-tomcat-6.0.37/webapps/ehui/upload /ftp/upload182

umount  /u01/tomcat-portal/apache-tomcat-6.0.37/webapps/portal/upload182








#：允许ip地址范围在192.168.0.*的计算机以读写的权限来访问/home/work 目录。
/home/work 192.168.0.*（rw,sync,root_squash）
/home  192.168.1.105 (rw,sync)
/public  * (rw,sync)

配置文件每行分为两段：第一段为共享的目录，使用绝对路径，第二段为客户端地址及权限。
地址可以使用完整IP或网段，例如10.0.0.8或10.0.0.0/24，10.0.0.0/255.255.255.0当然也可以地址可以使用主机名，DNS解析的和本地/etc/hosts解析的都行，支持通配符，例如：*.chengyongxu.com

权限有：
rw：read-write，可读写；    注意，仅仅这里设置成读写客户端还是不能正常写入，还要正确地设置共享目录的权限，参考问题7
ro：read-only，只读；
sync：文件同时写入硬盘和内存；
async：文件暂存于内存，而不是直接写入内存；
no_root_squash：NFS客户端连接服务端时如果使用的是root的话，那么对服务端分享的目录来说，也拥有root权限。显然开启这项是不安全的。
root_squash：NFS客户端连接服务端时如果使用的是root的话，那么对服务端分享的目录来说，拥有匿名用户权限，通常他将使用nobody或nfsnobody身份；
all_squash：不论NFS客户端连接服务端时使用什么用户，对服务端分享的目录来说都是拥有匿名用户权限；
anonuid：匿名用户的UID值，通常是nobody或nfsnobody，可以在此处自行设定；
anongid：匿名用户的GID值。
