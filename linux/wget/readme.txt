wget -r -np -nd --accept=gz --no-check-certificate  -O cmder.zip https://github.com/cmderdev/cmder/releases/download/v1.2.9/cmder.zip 



 
wget下载https链接
标签： download文档actionrecursionfilessl
2011-09-29 11:21 9793人阅读 评论(0) 收藏 举报
分类：
SHELL（51）

Use the following command:


wget -r -np -nd --accept=gz --no-check-certificate https://www.xxx.com/dir/ --http-user=username --http-password=password

to download all .gz file under "dir" directory

-np means no parent directory
-nd means don't construct local directory structure
--accept=gz means only download .gz files in the directory

 

 

HTTPS (SSL/TLS) Options（HTTPS (SSL) 参数选项）

 

--certificate=file
	

可选的客户段端证书

--private-key=file
	

对此证书可选的“密钥文档”

--private-key-type=type
	

对此证书可选的“密钥类型“

--egd-file=file
	

EGD socket 文档名

--ca-directory=directory
	

CA 散列表所在的目录

--ca-certificate=file
	

包含 CA 的文档

--certificate-type=[ PEM（默认），DER ]
	

Client-Cert 类型：PEM，DER

--no-check-certificate
	

不用检查服务器的证书

--secure-protocol=[ auto，SSLv2，SSLv3，TLSv1 ]
	

选择 SSL 协议：auto，SSLv2，SSLv3，TLSv1

 

FTP Options（FTP参数选项）

 

--ftp-user
	

登录ftp的用户名（注意：最好方法是在.netrc或.wgetrc文件中定义）

--ftp-password
	

登录ftp的密码（注意：最好方法是在.netrc或.wgetrc文件中定义）

--no-remove-listing
	

不删除“.listing” 文档

--no-glob
	

关闭所有通配符的ftp文档名

--no-passive-ftp
	

禁用“被动”传输模式

--retr-symlinks
	

在递归模式中，下载链接所指示的文档（排除连接目录的）

 

 1、下载单个文件
wget url+filename

下载过程中同时可以看到四项信息
已经下载的比例
已经下载的大小
当前下载的速度
剩余的时间

2、使用一个大写O做参数表示另存为
wget -O save_name url

这种方法适用于对应链接中没有显式文件名的情况。

例如： wget -O xx.zip http://www.vim.org/scripts/download_script.php?src_id=7701

再用不带-O参数的下载一次。

ls -al
总计 132
drwxr-xr-x 2 root root  4096 07-12 10:43 .
drwxr-xr-x 4 root root  4096 07-11 16:26 ..
-rw-r--r-- 1 root root 50243 07-12 10:43 download_script.php?src_id=7701
-rw-r--r-- 1 root root 50243 07-12 10:43 xx.zip

我们发现，下载的大小都是一样。但是不带-O参数的，文件名还要转换一次。不如用-O参数方便。

mv "download_script.php?src_id=7701" yy.zip

3、指定下载速率
方法是使用wget --limit-rate

wget程序默认是使用所有的带宽，如果
是在生产服务器上下载很大的文件就不可接受了。
为了避免这种情况使用--limit-rate参数
wget --limit-rate=200k http://www.openss7.org/repos/tarballs/strx25-0.9.2.1.tar.bz2


4、断点下载

使用wget -c完成未完成的下载

下载到一半需要停下来干别的事情，用^c就可以停顿住。

回来后，继续下载可以加一个-c参数。

注意：如果不加入-c，那么下载的文件会多出一个.1的后缀。


5、在后台下载
方法：加一个-b的参数

wget -b url/filename
为后台下载。下载经过写入到wget-log文件中。

用tail -f wget-log查看下载日志

6、模拟在浏览器下下载

有的网站不允许客户在非浏览器环境下下载。使用--user-agent来设置

wget --user-agent="Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092416 Firefox/3.0.3" URL-TO-DOWNLOAD

7、测试下载链接
方法:使用--spider

试图做计划下载时候，需要先检查一下下载链接是否有效。

wget --spider DOWNLOAD-URL

如果返回OK，则表示下载链接是正确的！

例如
wget --spider "http://ip138.com/ips.asp?ip=58.251.193.137&action=2"
Spider mode enabled. Check if remote file exists.
--2010-07-12 11:36:32--  http://ip138.com/ips.asp?ip=58.251.193.137&action=2
正在解析主机 ip138.com... 221.5.47.136
Connecting to ip138.com|221.5.47.136|:80... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：7817 (7.6K) [text/html]
Remote file exists and could contain further links,
but recursion is disabled -- not retrieving.


8、增加尝试次数
方法：--tries=1000
如果网速有问题，下载大文件的时候可能会发生错误，
默认wget尝试20次链接。

如果尝试75次，可以
wget --tires=75 DOWNLOAD-URL


9、下载多个文件使用wget -i
将多个下载链接写入到一个download-file-list.txt文件中，而后用

wget -i download-file-list.txt

10、下载整站
方法：用--mirror参数

当你要下载一个完整站点并实现本地浏览的时候，
wget --mirror -p --convert-links -P ./LOCAL-DIR WEBSITE-URL

参数讲解：
--mirror：设置这个参数用来建立本地镜像
-p：下载所有html文件适合显示的元素
--convert-links：下载完成后，将文档链接都转换成本地的
-P ./LOCAL-DIR：保存所有的文件和目录到指定文件夹下

11、下载时候禁止下载指定类型的文件

例如下载站点时候，不打算下载gif动画图片。

wget --reject=gif WEBSITE-TO-BE-DOWNLOADED


12、记录下载日志
方法：使用小写字母o

wget -o xx.html.log -O xx.html "http://ip138.com/ips.asp?ip=58.251.193.137&action=2"

检查一下日志：
[root@localhost opt]# cat xx.html.log
--2010-07-12 11:57:22--  http://ip138.com/ips.asp?ip=58.251.193.137&action=2
正在解析主机 ip138.com... 221.5.47.136
Connecting to ip138.com|221.5.47.136|:80... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：7817 (7.6K) [text/html]
Saving to: `xx.html'

     0K .......                                               100% 65.5K=0.1s

2010-07-12 11:57:22 (65.5 KB/s) - `xx.html' saved [7817/7817]




13、是第9条的增强版。可以限制下载容量

wget -Q5m -i FILE-WHICH-HAS-URLS

当下载的文件达到5兆的时候，停止下载。
注意：如果不是对一个文件下载链接清单，对单个文件，
这个限制不会生效的。




14、和第11条正好相反，
这条技巧是讲述如何仅仅下载指定类型的文件

从一个网站中下载所有的pdf文件

wget -r -A.pdf http://url-to-webpage-with-pdfs/




15、使用wget完成ftp下载

匿名ftp下载类似于http下载
wget ftp-url即可。

如果是需要输入用户名和密码，则是

wget --ftp-user=USERNAME --ftp-password=PASSWORD DOWNLOAD-URL 