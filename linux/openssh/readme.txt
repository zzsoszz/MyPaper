http://my.oschina.net/qinmei/blog/323074
http://blog.csdn.net/lk_db/article/details/50964912
http://www.111cn.net/sys/CentOS/61326.htm
http://www.heminjie.com/system/linux/1766.html

ldconfig��ldd�÷� 
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
�޸Ķ�Ӧָ��İ�װĿ¼
=============================
25��    SSHD=/usr/sbin/sshd Ϊ SSHD=/usr/local/openssh/sbin/sshd
41��    /usr/bin/ssh-keygen -A Ϊ /usr/local/openssh/bin/ssh-keygen -A
=============================
�����˳�





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
�޸Ķ�Ӧָ��İ�װĿ¼
=============================
25��    SSHD=/usr/sbin/sshd Ϊ SSHD=/usr/local/openssh/sbin/sshd
41��    /usr/bin/ssh-keygen -A Ϊ /usr/local/openssh/bin/ssh-keygen -A
=============================
�����˳�

ɾ��
/sbin/restorecon /etc/ssh/ssh_host_key.pub



vi /etc/ssh/sshd_config
PermitRootLogin yes



cp /usr/local/openssh/bin/ssh /usr/bin/
service sshd start






------------------------------������Ϣ

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
config��ɺ�ִ�� make ����
make
make ����ִ�������ִ�� make install �����װopenssl
make install
������ԭ����openssl����
mv /usr/bin/openssl  /usr/bin/openssl.old
������ԭ����opensslĿ¼
mv /usr/include/openssl  /usr/include/openssl.old
����װ�õ�openssl ��openssl����������/usr/bin/openssl
ln -s /usr/local/ssl/bin/openssl  /usr/bin/openssl
����װ�õ�openssl ��opensslĿ¼������/usr/include/openssl
ln -s /usr/local/ssl/include/openssl  /usr/include/openssl
�޸�ϵͳ�Դ���openssl���ļ�����/usr/local/lib64/libssl.so(���ݻ�����������) �������������libssl.so
ln -s /usr/local/ssl/lib/libssl.so /usr/local/lib64/libssl.so
ִ������鿴openssl������汾�Ƿ�Ϊ1.0.1g��
strings /usr/local/lib64/libssl.so |grep OpenSSL
��/etc/ld.so.conf�ļ���д��openssl���ļ�������·��
echo "/usr/local/ssl/lib" >> /etc/ld.so.conf
ʹ�޸ĺ��/etc/ld.so.conf��Ч
