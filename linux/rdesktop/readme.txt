yum install -y rdesktop
rdesktop -a 32  192.168.2.2:3389 -u Administrator -p bx123456





 

CentOS和Window互相远程桌面方法    .

分类： CentOS  2012-03-25 18:17 7080人阅读 评论(0) 收藏 举报 

centos防火墙servicewindows服务器tcp


Windows远程CentOS桌面

1.VNC




服务器配置

1) 安装vncserver




[plain] view plaincopy
01.yum install -y vnc-server  


2) 修改配置




[plain] view plaincopy
01.vi /etc/sysconfig/vncservers  

最后两行去#，并分别设置如下
Line1: "1:username"

Line2: "... 1024*768 ..."

3) 设置密码




[plain] view plaincopy
01.vncserver  

4) 修改防火墙



[plain] view plaincopy
01.vi /etc/sysconfig/iptables  

添加-A INPUT -m state --state NEW -m tcp -p tcp -dport 5901 -j ACCEPT
5) 重启防火墙服务




[plain] view plaincopy
01.service iptables restart  

6) 重启vnc服务



[plain] view plaincopy
01.service vncserver restart   

7) ping [客户端ip]
验证连通性




客户端配置

1) 打开vnc客户端，输入ip:5901

2) 输入密码




Linux远程Windows桌面

1.rdesktop




客户端配置


1) 安装rdesktop




[plain] view plaincopy
01.yum install -y rdesktop  

2) 使用rdesktop命令连接到win桌面



[plain] view plaincopy
01.rdesktop -a 16 x.x.x.x:3389 -u username -p password -f  



服务器配置


1) 开启远程访问

2) 取消防火墙拦截





版权声明：本文为博主原创文章，未经博主允许不得转载。









 linux下使用rdesktop连接远程windows    .

2011-12-07 11:06 4355人阅读 评论(1) 收藏 举报 

linuxwindows文本编辑远程连接ubuntu服务器


1。 通过rdesktop工具连接Windows远程桌面

没有安装用命令：

sudo apt-get install rdesktop

安装后，可以用如下命令：

rdesktop -f -a 16 -u administrator -p passwrod feelamcheung 192.168.0.2:8080

    -u 和 -p: 指定用户名和密码

      -f : 默认全屏， 需要用Ctrl-Alt-Enter组合键进行全屏模式切换。

      -a 16表示使用16 bit色，192.168.0.2是Windows服务器地址， 8080是端口号（默认是3389，可以不用写）

-r clipboard:PRIMARYCLIPBOARD : 这个一定要加上，要不然不能在主机Linux和服务器Windows直接复制粘贴文字了。贴中文也没有问题。

      -r sound:启动本地音频设备

      -r disk:sunray=/home/jimmy : 指定主机Linux上的一个目录映射到远程Windows上的硬盘，传送文件就不用再靠Samba或者FTP了。

关于 rdesktop 更为详细的用法，可以查询 man rdesktop。

可以用图形界面的tsclient工具，底层也是使用rdesktop。

其他商业软件：Windows的Remote Connection, 或者Citrix这种商业软件

      安装远程运行程序

配置XP：打开远程桌面：在“控制面版”的“系统”，“远程”，勾上“允许用户远程连接到此计算机”；

下载：http://www.cendio.com/files/thinlinc/seamlessrdp/seamlessrdp.zip 并解压到C盘根目录下，C:\seamlessrdp

然后Ubuntu中就可以运行

      rdesktop -A -s 'c:"seamlessrdp"seamlessrdpshell.exe C:"Program Files"Internet Explorer"iexplore.exe' 192.168.1.100:3389 -u administrator -p password

2. RealPlayer 安装

   下载下来的是RealPlayer11GOLD.bin

   如何安装命令：

   chmod +x ~/桌面/RealPlayer11GOLD.bin

   sudo ~/桌面/RealPlayer11GOLD.bin

当终端显示

Welcome to the RealPlayer (10.0.8.805) Setup for UNIX
 Setup will help you get RealPlayer running on your computer.
 Press [Enter] to continue...
时按下回车键，进入下一步：

Enter the complete path to the directory where you want
 RealPlayer to be installed. You must specify the full
 pathname of the directory and have write privileges to
 the chosen directory.
 Directory: [/home/shixinyu/RealPlayer]: 
这里默认安装到用户的主文件夹下的RealPlayer目录下，如果你想要安装到别处，就在此处输入路径，否则直接回车即可。

You have selected the following RealPlayer configuration:

Destination: /home/shixinyu/RealPlayer

Enter [F]inish to begin copying files, or [P]revious to go
 back to the previous prompts: [F]: F
安装程序会提示最后确定信息，如果都确定了，按下F键后回车。
 当提示

Copying RealPlayer files...configure system-wide symbolic links? [Y/n]: 
时按下Y键回车即可，后面基本上就没有需要用户操作的地方了，通常到这里基本上就安装好了，你可以到“应用程序，影音”下找到RealPlayer11来运行了，首次运行会有一段安装协议需要同意。

注：如果在跟着上述步骤完成安装操作之后到应用程序菜单下的“影音”中单击RealPlayer无反应，并且你的Ubuntu安装的是SCIM输入法，那么很可能是SCIM与RealPlayer的冲突，你还需要进行下面操作：
$sudo gedit /home/[yourid]/RealPlayer/realplay ""[yourid]指你的主文件夹名
 在打开的文本编辑器的首行添加下面一行
export GTK_IM_MODULE=xim

之后保存文本编辑器，然后再次执行RealPlayer应该就正常了。 

 
