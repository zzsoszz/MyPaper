http://my.oschina.net/qinmei/blog/323074
http://blog.csdn.net/lk_db/article/details/50964912
http://www.111cn.net/sys/CentOS/61326.htm
http://www.heminjie.com/system/linux/1766.html

ldconfig和ldd用法 
http://blog.csdn.net/byrsongqq/article/details/6122546

yum install zlib-devel



tar -jxf dropbear-2014.66.tar.bz2
cd dropbear-2014.66
 ./configure
make && make install
mkdir /etc/dropbear
/usr/local/bin/dropbearkey -t dss -f /etc/dropbear/dropbear_dss_host_key
/usr/local/bin/dropbearkey -t rsa -s 4096 -f /etc/dropbear/dropbear_rsa_host_key
/usr/local/sbin/dropbear -p 2222


openssl version
tar -xvf openssl-1.0.2h.tar.gz
cd openssl-1.0.2h
./config --prefix=/usr/local/openssl  shared   && make && make install




tar -zxvf  openssh-7.2p2.tar.gz 
cd openssh-7.2p2
./configure --prefix=/usr/local/openssh --sysconfdir=/etc/ssh --with-ssl-dir=/usr/local/openssl --with-zlib=/usr/local/zlib --with-md5-passwords --without-hardening && make && make install
cp contrib/redhat/sshd.init /etc/init.d/sshd
chmod +x /etc/init.d/sshd 
chkconfig --add sshd
service sshd start
vi /etc/init.d/sshd
修改对应指令的安装目录
=============================
25行    SSHD=/usr/sbin/sshd 为 SSHD=/usr/local/openssh/sbin/sshd
41行    /usr/bin/ssh-keygen -A 为 /usr/local/openssh/bin/ssh-keygen -A
=============================
保存退出





cp /usr/local/openssh/bin/ssh /usr/bin/
/etc/ssh/sshd_config
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile      .ssh/authorized_keys 
PermitRootLogin yes


/usr/local/openssh/bin/ssh-keygen










---------------------------------------180
mv /etc/ssh /etc/ssh.bak
rpm -e --nodeps `rpm -qa |grep openssh`


tar -jxf dropbear-2014.66.tar.bz2
tar -xvf openssl-1.0.1i.tar.gz 
cd openssl-1.0.1i
./config --prefix=/usr/local/openssl && make && make install


tar -zxvf  openssh-7.2p2.tar.gz 
cd openssh-7.2p2
./configure --prefix=/usr/local/openssh --sysconfdir=/etc/ssh --with-ssl-dir=/ftp/setup/tools/openssl-1.0.1p  --with-zlib=/usr/local/zlib-1.2.8 --with-md5-passwords --without-hardening && make && make install
cp contrib/redhat/sshd.init /etc/init.d/sshd
chmod +x /etc/init.d/sshd 
chkconfig --add sshd

vi /etc/init.d/sshd
修改对应指令的安装目录
=============================
25行    SSHD=/usr/sbin/sshd 为 SSHD=/usr/local/openssh/sbin/sshd
41行    /usr/bin/ssh-keygen -A 为 /usr/local/openssh/bin/ssh-keygen -A
=============================
保存退出

删除
/sbin/restorecon /etc/ssh/ssh_host_key.pub



vi /etc/ssh/sshd_config
PermitRootLogin yes



cp /usr/local/openssh/bin/ssh /usr/bin/
service sshd start






------------------------------辅助信息

yum upgrade openssl 


export LD_LIBRARY_PATH=/usr/local/openssl/lib

ll /usr/lib64/libssl.so*

ln -sf libssl.so.1.0.0  /usr/local/openssl/lib/libssl.so.10
ln -sf libcrypto.so.1.0.0  /usr/local/openssl/lib/libcrypto.so.10

ln -sf /usr/local/openssl/lib/libssl.so.1.0.0  /usr/lib/libssl.so.10
ln -sf /usr/local/openssl/lib/libcrypto.so.1.0.0  /usr/lib/libcrypto.so.10


ln -sf /usr/local/openssl/lib/libssl.so.1.0.0  /usr/local/openssl/lib/libssl.so.10
ln -sf /usr/local/openssl/lib/libcrypto.so.1.0.0  /usr/local/openssl/lib/libcrypto.so.10

ln -sf /usr/local/openssl/lib/libssl.so.1.0.0 /usr/local/lib64/libssl.so.10
ln -sf /usr/local/openssl/lib/libcrypto.so.1.0.0 /usr/local/lib64/libcrypto.so.10
ln -sf /usr/local/openssl/lib/libcrypto.so.1.0.0 /usr/local/lib64/libcrypto.so


which openssl


./config shared zlib-dynamic
config完成后执行 make 命令
make
make 命令执行完后再执行 make install 命令，安装openssl
make install
重命名原来的openssl命令
mv /usr/bin/openssl  /usr/bin/openssl.old
重命名原来的openssl目录
mv /usr/include/openssl  /usr/include/openssl.old
将安装好的openssl 的openssl命令软连到/usr/bin/openssl
ln -s /usr/local/ssl/bin/openssl  /usr/bin/openssl
将安装好的openssl 的openssl目录软连到/usr/include/openssl
ln -s /usr/local/ssl/include/openssl  /usr/include/openssl
修改系统自带的openssl库文件，如/usr/local/lib64/libssl.so(根据机器环境而定) 软链到升级后的libssl.so
ln -s /usr/local/ssl/lib/libssl.so /usr/local/lib64/libssl.so
执行命令查看openssl依赖库版本是否为1.0.1g：
strings /usr/local/lib64/libssl.so |grep OpenSSL
在/etc/ld.so.conf文件中写入openssl库文件的搜索路径
echo "/usr/local/ssl/lib" >> /etc/ld.so.conf
使修改后的/etc/ld.so.conf生效
