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
./config --prefix=/usr/local/openssl222  shared   && make && make install




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




    #!/bin/bash  
    ############################################################  
    ####      update openssl openssh script             ########  
    ####              Author:hx10                        #######  
    ####warining:start telnet service before use this script####  
    ############################################################  
    sleep 5  
    export PATH=$PATH:/sbin/  
    ####add yum source #####  
    rm -rf /etc/yum.repos.d/*.repo  
    wget http://192.168.0.141:8000/linux5_5_x86_64.repo -O /etc/yum.repos.d/linux5_5_x86_64.repo  
    sed -i 's/yes/no/g' /etc/xinetd.d/telnet  
    yum -y install telnet-server  
     
    service xinetd restart  
    service sshd stop  
    echo "exclude=*.i?86" >>/etc/yum.conf  
    yum -y remove openssl-devel openssh  
    yum -y install pam-devel  
    cd /usr/local/src  
    #wget http://www.openssl.org/source/openssl-1.0.0.tar.gz  
    #wget http://openbsd.org.ar/pub/OpenBSD/OpenSSH/portable/openssh-5.5p1.tar.gz  
    #wget http://www.sfr-fresh.com/unix/misc/zlib-1.2.5.tar.bz2  
    wget http://192.168.0.21:8000/openssl-1.0.0.tar.gz  
    wget http://192.168.0.21:8000/openssh-5.5p1.tar.gz  
    wget http://192.168.0.21:8000/zlib-1.2.5.tar.bz2  
    ####install zlib1.2.5########  
    tar -jxvf zlib-1.2.5.tar.bz2  
    cd zlib-1.2.5  
    ./configure --prefix=/usr/local/zlib -share  
    make && make install  
    echo "/usr/local/zlib/lib" >>/etc/ld.so.conf  
    ldconfig -v  
    cd ..  
    ####install openssl-1.0.0########  
    tar -zxvf openssl-1.0.0.tar.gz  
    cd openssl-1.0.0  
    ./config shared zlib-dynamic --prefix=/usr/local/openssl --with-zlib-lib=/usr/local/zlib/lib --with-zlib-include=/usr/local/zlib/include  
    make && make install  
    echo "/usr/local/openssl/lib64" >>/etc/ld.so.conf  
    ldconfig -v  
    cd ..  
    ####install openssh5.5p1########  
    tar -zxvf openssh-5.5p1.tar.gz  
    cd openssh-5.5p1  
    mv /usr/bin/openssl /usr/bin/openssl.OFF  
    mv /usr/include/openssl /usr/include/openssl.OFF  
    ln -s /usr/local/openssl/bin/openssl /usr/bin/openssl  
    ln -s /usr/local/openssl/include/openssl /usr/include/openssl  
    mv /lib64/libcrypto.so.4  /lib64/libcrypto.so.4.OFF  
    mv /lib64/libssl.so.4   /lib64/libssl.so.4.OFF  
    ln -s /usr/local/openssl/lib64/libcrypto.so.1.0.0 /lib64/libcrypto.so.4  
    ln -s /usr/local/openssl/lib64/libssl.so.1.0.0 /lib64/libssl.so.4  
    mv /usr/lib64/libcrypto.so  /usr/lib64/libcrypto.so.OFF  
    mv /usr/lib64/libssl.so   /usr/lib64/libssl.so.OFF  
    ln -s /usr/local/openssl/lib64/libcrypto.so  /usr/lib64/libcrypto.so  
    ln -s /usr/local/openssl/lib64/libssl.so  /usr/lib64/libssl.so  
    ./configure --prefix=/usr --sysconfdir=/etc/ssh --with-pam --with-ssl-dir=/usr/local/openssl --with-md5-passwords --mandir=/usr/share/man --with-zlib=/usr/local/zlib --without-openssl-header-check  
    make && make install  
    cp ./contrib/redhat/sshd.init /etc/init.d/sshd  
    chmod +x /etc/init.d/sshd  
    chkconfig sshd on  
    service sshd start  
    openssl version -a  
    ssh -v  
    exit 

