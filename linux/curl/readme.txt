Linux curl命令参数详解
2013年7月3日 aiezu	发表评论 阅读评论

linux curl是通过url语法在命令行下上传或下载文件的工具软件，它支持http,https,ftp,ftps,telnet等多种协议，常被用来抓取网页和监控Web服务器状态。
一、Linux curl用法举例：
1. linux curl抓取网页：

抓取百度：

curl http://www.baidu.com 
1
	
curl http://www.baidu.com 

如发现乱码，可以使用iconv转码：

curl http://iframe.ip138.com/ic.asp|<span class='wp_keywordlink_affiliate'><a href="http://www.aiezu.com/tag/iconv" title="查看 iconv 中的全部文章" target="_blank">iconv</a></span> -fgb2312
1
	
curl http://iframe.ip138.com/ic.asp|iconv -fgb2312

iconv的用法请参阅：在Linux/Unix系统下用iconv命令处理文本文件中文乱码问题


2. Linux curl使用代理：

linux curl使用http代理抓取页面：
curl -x 111.95.243.36:80 http://iframe.ip138.com/ic.asp|iconv -fgb2312
curl -x 111.95.243.36:80 -U aiezu:password http://www.baidu.com
1
2
	
curl -x 111.95.243.36:80 http://iframe.ip138.com/ic.asp|iconv -fgb2312
curl -x 111.95.243.36:80 -U aiezu:password http://www.baidu.com

使用socks代理抓取页面：
curl --socks4 202.113.65.229:443 http://iframe.ip138.com/ic.asp|iconv -fgb2312
curl --socks5 202.113.65.229:443 http://iframe.ip138.com/ic.asp|iconv -fgb2312
1
2
	
curl --socks4 202.113.65.229:443 http://iframe.ip138.com/ic.asp|iconv -fgb2312
curl --socks5 202.113.65.229:443 http://iframe.ip138.com/ic.asp|iconv -fgb2312

代理服务器地址可以从爬虫代理上获取。


3. linux curl处理cookies

接收cookies:
curl -c /tmp/cookies http://www.baidu.com #cookies保存到/tmp/cookies文件
1
	
curl -c /tmp/cookies http://www.baidu.com #cookies保存到/tmp/cookies文件

发送cookies:
curl -b "key1=val1;key2=val2;" http://www.baidu.com #发送cookies文本
curl -b /tmp/cookies http://www.baidu.com #从文件中读取cookies
1
2
	
curl -b "key1=val1;key2=val2;" http://www.baidu.com #发送cookies文本
curl -b /tmp/cookies http://www.baidu.com #从文件中读取cookies


4. linux curl发送数据：

linux curl get方式提交数据：
curl -G -d "name=value&name2=value2" http://www.baidu.com 
1
	
curl -G -d "name=value&name2=value2" http://www.baidu.com 

linux curl post方式提交数据：
curl -d "name=value&name2=value2" http://www.baidu.com #<span class='wp_keywordlink_affiliate'><a href="http://www.aiezu.com/tag/post" title="查看 post 中的全部文章" target="_blank">post</a></span>数据
curl -d a=b&c=d&txt@/tmp/txt http://www.baidu.com  #post文件
1
2
	
curl -d "name=value&name2=value2" http://www.baidu.com #post数据
curl -d a=b&c=d&txt@/tmp/txt http://www.baidu.com  #post文件

以表单的方式上传文件：
curl -F file=@/tmp/me.txt http://www.aiezu.com
1
	
curl -F file=@/tmp/me.txt http://www.aiezu.com

相当于设置form表单的method="POST"和enctype='multipart/form-data'两个属性。


5. linux curl http header处理：

设置http请求头信息：
curl -A "Mozilla/5.0 Firefox/21.0" http://www.baidu.com #设置http请求头User-Agent
curl -e "http://pachong.org/" http://www.baidu.com #设置http请求头Referer
curl -H "Connection:keep-alive \n User-Agent: Mozilla/5.0" http://www.aiezu.com
1
2
3
	
curl -A "Mozilla/5.0 Firefox/21.0" http://www.baidu.com #设置http请求头User-Agent
curl -e "http://pachong.org/" http://www.baidu.com #设置http请求头Referer
curl -H "Connection:keep-alive \n User-Agent: Mozilla/5.0" http://www.aiezu.com

设置http响应头处理：
curl -I http://www.aiezu.com #仅仅返回header
curl -D /tmp/header http://www.aiezu.com #将http header保存到/tmp/header文件
1
2
	
curl -I http://www.aiezu.com #仅仅返回header
curl -D /tmp/header http://www.aiezu.com #将http header保存到/tmp/header文件


6. linux curl认证：

curl -u aiezu:password http://www.aiezu.com #用户名密码认证
curl -E mycert.pem https://www.baidu.com #采用证书认证
1
2
	
curl -u aiezu:password http://www.aiezu.com #用户名密码认证
curl -E mycert.pem https://www.baidu.com #采用证书认证


6. 其他：

curl -# http://www.baidu.com #以“#”号输出进度条
curl -o /tmp/aiezu http://www.baidu.com #保存http响应到/tmp/aiezu
1
2
	
curl -# http://www.baidu.com #以“#”号输出进度条
curl -o /tmp/aiezu http://www.baidu.com #保存http响应到/tmp/aiezu







Linux curl命令参数详解--转载

linux curl是通过url语法在命令行下上传或下载文件的工具软件，它支持http,https,ftp,ftps,telnet等多种协议，常被用来抓取网页和监控Web服务器状态。
一、Linux curl用法举例：
1. linux curl抓取网页：

抓取百度：

 
 
1
	
curl http://www.baidu.com

 

如发现乱码，可以使用iconv转码：

 
 
1
	
curl http://iframe.ip138.com/ic.asp|iconv -fgb2312

iconv的用法请参阅：在Linux/Unix系统下用iconv命令处理文本文件中文乱码问题

 
2. Linux curl使用代理：

linux curl使用http代理抓取页面：
 
1
2
	
curl -x 111.95.243.36:80 http://iframe.ip138.com/ic.asp|iconv -fgb2312
curl -x 111.95.243.36:80 -U aiezu:password http://www.baidu.com

 

使用socks代理抓取页面：
 
1
2
	
curl --socks4 202.113.65.229:443 http://iframe.ip138.com/ic.asp|iconv -fgb2312
curl --socks5 202.113.65.229:443 http://iframe.ip138.com/ic.asp|iconv -fgb2312

 

代理服务器地址可以从爬虫代理上获取。

 
3. linux curl处理cookies

接收cookies:
 
1
	
curl -c /tmp/cookies http://www.baidu.com #cookies保存到/tmp/cookies文件

 

发送cookies:
 
1
2
	
curl -b "key1=val1;key2=val2;" http://www.baidu.com #发送cookies文本
curl -b /tmp/cookies http://www.baidu.com #从文件中读取cookies

 

 
4. linux curl发送数据：

linux curl get方式提交数据：
 
1
	
curl -G -d "name=value&name2=value2" http://www.baidu.com

 

linux curl post方式提交数据：
 
1
2
	
curl -d "name=value&name2=value2" http://www.baidu.com #post数据
curl -d a=b&c=d&txt@/tmp/txt http://www.baidu.com  #post文件

 

以表单的方式上传文件：
 
1
	
curl -F file=@/tmp/me.txt http://www.aiezu.com

 

相当于设置form表单的method="POST"和enctype='multipart/form-data'两个属性。

 
5. linux curl http header处理：

设置http请求头信息：
 
1
2
3
	
curl -A "Mozilla/5.0 Firefox/21.0" http://www.baidu.com #设置http请求头User-Agent
curl -e "http://pachong.org/" http://www.baidu.com #设置http请求头Referer
curl -H "Connection:keep-alive \n User-Agent: Mozilla/5.0" http://www.aiezu.com

设置http响应头处理：
 
1
2
	
curl -I http://www.aiezu.com #仅仅返回header
curl -D /tmp/header http://www.aiezu.com #将http header保存到/tmp/header文件

 

 
6. linux curl认证：

 
 
1
2
	
curl -u aiezu:password http://www.aiezu.com #用户名密码认证
curl -E mycert.pem https://www.baidu.com #采用证书认证

 

 
6. 其他：

 
 
1
2
	
curl -# http://www.baidu.com #以“#”号输出进度条
curl -o /tmp/aiezu http://www.baidu.com #保存http响应到/tmp/aiezu

 
 
 原文地址：http://www.aiezu.com/system/linux/linux_curl_syntax.html
 
linux 使用curl小经验教训：
http请求地址的url要使用""括起来。当有存在多个参数使用&连接时可能会出错。
 



 linux curl 用法详解
分类： linux 杂项 2011-09-15 10:26 4654人阅读 评论(0) 收藏 举报
linuxhttp服务器服务器ftp服务器urldownload
 linux ??curl用法详解

??curl的应用方式，一是可以直接通过命令行工具，另一种是利用libcurl库做上层的开发。本篇主要总结一下命令行工具的http相关的应用， 尤其是http下载方面的；下一篇再讲基于libcurl库的开发。

 
 
   curl的命令行工具功能非常强大，这些数据交互的功能基本上都是通过URL方式进行的，我们先来看看curl对多个URL的灵活操作，这些规则使我们的 批处理需求应用起来非常方便。
 
   1、用{}表示多个URL
   如 http://site.{one,two,three}.com， 只要在{}中写上不同的部分，就可以表示3个URL了。
 
   2、用[]表示多个URL
   如 ftp://ftp.numericals.com/file[1-100].txt，ftp://ftp.numericals.com/file[001-100].txt，ftp://ftp.letters.com/file[a-z].txt， []中表示按数字或字母的顺序排列。
   还能表示不连续的排列，如 http://www.numericals.com/file[1-100:10].txt，http://www.letters.com/file[a-z:2].txt，":" 后面的数字表示等差排列的阶跃数。
 
   3、结合起来使用
   如 http://any.org/archive[1996-1999]/vol[1-4]/part{a,b,c}.html。
 
 
   curl命令行工具的基本语句为：curl [options] [URL...]，即 curl [选项] [下载地址]。因此，如果你想下载百度的首页，最简单的方法启动cmd，进入curl安装目录，输入命令：curl http://www.baidu.com，回车，你的输出窗口将立即出现百度首页 的html数据。
   对于所有的布尔型option，基本上--option表示支持这个选项，--no-option表示禁用这个选项。下面总结几个比较有用的 options。
 
   1、-o/--output <file>
   这个基本上要算最常用的选项了，用于将下载的数据保存到某个文件中。如 curl -o baidu.html http://www.baidu.com则将百度首页保存到baidu.html 文件中了。下载过程中标准输出还会显示下载的统计信息，比如进度、下载字节数、下载速度等。如果指定输出为"-"，则下载数据会输出到标准输出。
   如果输出的文件是一个多级目录的话，则要配合--create-dirs选项，--create-dirs将自动创建设置的输出目录。
   如果希望保存到本地的文件名和服务器上的相同，就可以直接用-O选项（大写O），而省去指定本地文件名。
   如果下载多个数据文件，可以使用上面提到的多URL规则。下载文件名也可以批量自定义，就是使用"#"。可以将"#"加到文件名当中，这样实际文件名中 的#将被多个URL中的当前字符串代替，如 curl http://{site,host}.host[1-5].com -o "#1_#2"，#1将被"site"或"host"代替，#2将被1-5之间的数字代替，也就是被当前被处理的URL中的字符串代替。
   另外下载数据的时候，可以加个"-#"选项，用一个进度条来代替文本表示进度。
 
   2、-c/--cookie-jar <file name> 和 -b/--cookie <name=data>
   这是两个操作cookie的选项，很多服务器是需要cookie信息的。用前一个选项可以指定一个文件，将其他文件中的cookie或者从服务器得到的 cookie写到文件中；后一个选项则用来向服务器发送cookie信息，可以用"name=data"的形式，也可以直接跟一个保存cookie的文件 名。
 
   3、-x/--proxy <proxyhost[:port]>
   该选项为http指定代理及端口，如果不指定端口，默认为1080。如 curl -x 201.36.208.19:3128 http://curl.haxx.se/。
 
   4、-u/--user <user:password> 和 -U/--proxy-user <user:password>
   登录某些页面或ftp需要先进行认证，输入用户名和密码。curl的这个选项可以直接处理这类操作，用指定的账号和密码进行登录认证。
   后面的选项指定代理的用户名和密码，这样便可以直接用这个代理访问网页了，如 curl -U user:password -x 201.36.208.19:3128 http://curl.haxx.se/。
 
   5、-A/--user-agent <agent string>
   该选项可以指定客户端类型，服务器通过该选项判断用户应用的平台及浏览器信息。如 curl -A "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)" http://www.clientinfo.com，
表示告诉服务器，客户端是运行在Windows 2000系统上的IE6.0。

  

    6、-d/--data <data>
   该选项用来以POST方式向http服务器发送特定数据，最常用的就是提交表单。如 curl -d "user=username&password=111" http://www.login.com， 表示用账号username和密码111向站点发送登录申请。其中多个数据段可以用"&"进行连接一起发送；如果数据前面加上符号"@"，则数据 来源为后面指定的文件，如 curl -d password=@D:\pw.txthttp://www.login.com。

  

    7、-C/--continue-at <offset>
   改选项提供断点续传功能，与-o选项配合使用。如 curl -c -O http://vfile.home.news.cn/music/public/vd05/200905/31/a8/MUfs052009053117155750a8be70.mp3。 如果指定offset，则从offset的位置开始续传。如果未指定offset，或者直接用"-C -"，则curl会自己分析该从什么位置开始续传。

  

    8、-r/--range <range>
   该选项指定下载字节的范围，常应用于分块下载文件。range的表示方式有多种，如100-500，则指定从100开始的400个字节数据；-500表示 最后的500个字节；5000-表示从第5000个字节开始的所有字节；另外还可以同时指定多个字节块，中间用","分开。如
   curl -r 0-1024000 -o new_divide_1.mp3 http://vfile.home.news.cn/music/public/vd05/200905/31/a8/MUfs052009053117155750a8be70.mp3 &
   curl -r 1024001-2048000 -o new_divide_2.mp3 http://vfile.home.news.cn/music/public/vd05/200905/31/a8/MUfs052009053117155750a8be70.mp3 &
   curl -r 2048001- -o new_divide_3.mp3 http://vfile.home.news.cn/music/public/vd05/200905/31/a8/MUfs052009053117155750a8be70.mp3
   这样就会将目标mp3文件分块下载为3个文件，然后可以用dos的copy命令：copy new_divide_1.mp3/b + new_divide_2.mp3/b + new_divide_3.mp3/b new_divide.mp3即可将3个分块文件合并为一个完整的mp3文件。
 
   9、-w/--write-out <format>
   该选项格式化输出一些用户操作的数据信息，用到的格式化输出符除了"\n"，"\r"，"\t"这些常见转义符外，还包括"@"和"%"。其 中"@filename"表示输出filename文件中的数据，"@-"表示输出用户写入标准输入的数据；"%"标识符后面跟上定义的关键字， 则可以输出对应的curl数据，常用的关键字有：
   http_code —— 上次操作返回的响应码；
   time_total —— 上次操作耗时，单位为秒；
   time_connect —— TCP连接远程主机的耗时，单位为秒；
   time_pretransfer —— 文件真正开始传输之前交互耗时，单位为秒，可能主要包括一些命令处理和协议分析的耗时；
   time_starttransfer —— 文件的第一个字节开始传输之前的耗时，单位为秒，包括time_pretransfer和服务器计算结果的时间；
   size_download —— 下载的总字节数；
   size_upload —— 上传的总字节数；
   size_request —— 发送http请求的总字节数；
   speed_download —— curl成功下载的平均下载速度；
   speed_upload —— curl成功上传的平均上传速度；
   举例：curl -o page.html -s -w %{time_connect}:%{time_starttransfer}:%{time_total} http://curl.haxx.se/，其中-s表示安静模式，即略去所有 状态信息。
 
   10、--connect-timeout <seconds> 和 -m/--max-time <seconds>
   前者表示允许的连接的最长耗时，单位为秒；后者表示允许的整个操作的最长耗时，单位为秒，这个选项对于控制一个批处理操作的时长非常有用。
 
   11、--limit-rate <speed> 、 -Y/--speed-limit <speed> 和 -y/--speed-time <time>
   --limit-rate <speed>指定最大的数据传输率，单位为bytes/s，也可以用'k'或'K'表示kb/s，'m'或'M'表示mb/s，'g'或 'G'表示gb/s，所给的speed为平均传输率，短时间峰值可能会超过此值；
-Y/--speed-limit <speed>指定最小传输率，单位为bytes/s，如果小于speed值，则传输中止，如此时-y选项没有被设置，默认time为 30；-y/--speed-time <time>指定-Y选项的有效时间段，如果-Y选项没有被设置，默认为1。

    12、--max-filesize <bytes>
   该选项指定所要下载的文件的最大长度，如果超过bytes值，则下载并不开始，curl返回退出码63。
 
   13、--retry <num> 、 --retry-delay <seconds> 和 --retry-max-time <seconds>
   当传输过程中出现错误，如超时、FTP 5xx返回码或者HTTP 5xx返回码，curl会进行按照设置进行重试，这几个选项都与重试有关。--retry <num>设置重试次数，--retry-delay <seconds>设置两次重试的间隔时间，--retry-max-time <seconds>设置两次重试间隔的最长时间。默认情况下，curl不进行重试；如果重试，第一次间隔1秒，之后每次都间隔上一次的2倍时 间，直到间隔时间达到10分钟，之后的重试都将采用10分钟间隔。如果这3个选项的值被重新设置，则执行设置值。
 
   14、-T/--upload-file <file>
   该选项是上传命令，如向http服务器上传一个文件：curl -T D:\new_divide.mp3 http://www.uploadserver.com/path/； 向一个ftp服务器上传文件：curl -T D:\new_divide.mp3 -u user:password ftp://upload_site:port/path/。


   curl定义了一组"EXIT CODES"，用来标识在出现错误时的相关信息，目前范围从1-83，具体信息可以查阅curl库自带的文档。这些退出码对于我们分析错误及原因有很大帮 助。
 
 
   以上简单介绍了一下利用curl命令行工具进行一些简单的http和ftp应用，大家可以试着多用一下，会慢慢发现curl的强大功能，有很多独特的功能 用起来非常简单方便 











 Linux下使用curl

Curl是Linux下一个很强大的http命令行工具，其功能十分强大。

1）读取网页

$ curl linuxidc.com">http://www.linuxidc.com

2）保存网页

$ curl http://www.linuxidc.com > page.html $ curl -o page.html http://www.linuxidc.com

3）使用的proxy服务器及其端口：-x

$ curl -x 123.45.67.89：1080 -o page.html http://www.linuxidc.com

4）使用cookie来记录session信息

$ curl -x 123.45.67.89：1080 -o page.html -D cookie0001.txt http://www.linuxidc.com这个option： -D 是把http的response里面的cookie信息存到一个特别的文件中去，这样，当页面被存到page.html的同时，cookie信息也被存到了cookie0001.txt里面了5）那么，下一次访问的时候，如何继续使用上次留下的cookie信息呢？

使用option来把上次的cookie信息追加到http request里面去：-b

$ curl -x 123.45.67.89：1080 -o page1.html -D cookie0002.txt -b cookie0001.txt http://www.linuxidc.com

6）浏览器信息

$ curl -A "Mozilla/4.0 （compatible； MSIE 6.0； Windows NT 5.0）" -x 123.45.67.89：1080 -o page.html -D cookie0001.txt http://www.linuxidc.com

7）referer

$ curl -A "Mozilla/4.0 （compatible； MSIE 6.0； Windows NT 5.0）" -x 123.45.67.89：1080 -e "mail.linuxidc.com" -o page.html -D cookie0001.txt http://www.linuxidc.com这样就可以骗对方的服务器，你是从mail.linuxidc.com点击某个链接过来的

8）下载文件

$ curl -o 1.jpg http://cgi2.tky.3web.ne.jp/~zzh/screen1.JPG $ curl -O http://cgi2.tky.3web.ne.jp/~zzh/screen1.JPG -O 可以按照服务器上的文件名，自动存在本地$ curl -O http://cgi2.tky.3web.ne.jp/~zzh/screen[1-10].JPG

9）批量下载

$ curl -O http://cgi2.tky.3web.ne.jp/~{zzh，nick}/[001-201].JPG这样产生的下载，就是~zzh/001.JPG ~zzh/002.JPG

……

~zzh/201.JPG ~nick/001.JPG ~nick/002.JPG

……

~nick/201.JPG

 

$自定义文件名的下载

curl -o #2_#1.jpg http://cgi2.tky.3web.ne.jp/~{zzh，nick}/[001-201].JPG这样，自定义出来下载下来的文件名，就变成了这样：原来： ~zzh/001.JPG —-> 下载后： 001-zzh.JPG 原来： ~nick/001.JPG —-> 下载后： 001-nick.JPG

这样一来就不怕文件重名啦

9）断点续传

$ curl -c -O http://cgi2.tky.3wb.ne.jp/~zzh/screen1.JPG分块下载，我们使用这个option就可以了： -r

举例说明

比如我们有一个http://cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 要下载（赵老师的电话朗诵 ：D ）我们就可以用这样的命令：$ curl -r 0-10240 -o "zhao.part1" http：/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 $ curl -r 10241-20480 -o "zhao.part1" http：/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 $ curl -r 20481-40960 -o "zhao.part1" http：/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 $ curl -r 40961- -o "zhao.part1" http：/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3这样就可以分块下载啦。不过你需要自己把这些破碎的文件合并起来如果你用UNIX或苹果，用 cat zhao.part* > zhao.MP3就可以如果用的是Windows，用copy /b 来解决吧，呵呵上面讲的都是http协议的下载，其实ftp也一样可以用。用法嘛，

$ curl -u name：passwd ftp://ip：port/path/file

或者大家熟悉的

$ curl ftp://name：passwd@ip：port/path/file

10）上传的option是-T

比如我们向ftp传一个文件：

$ curl -T localfile -u name：passwd ftp://upload_site：port/path/

当然，向http服务器上传文件也可以比如$ curl -T localfile http://cgi2.tky.3web.ne.jp/~zzh/abc.cgi注意，这时候，使用的协议是HTTP的PUT method刚才说到PUT，嘿嘿，自然让老服想起来了其他几种methos还没讲呢！ GET和POST都不能忘哦。

11）POST和GET模式

$ curl http://www.linuxidc.com/login.cgi？user=nickwolfe

而POST模式的option则是-d

比如，$ curl -d "user=nickwolfe http://www.linuxidc.com/login.cgi

一点需要注意的是，POST模式下的文件上的文件上传，比如

这样一个HTTP表单，我们要用curl进行模拟，就该是这样的语法：$ curl -F upload=@localfile -F nick=go http://cgi2.tky.3web.ne.jp/~zzh/up_file.cgi

https本地证书

$ curl -E localcert.pem https://remote_server再比如，你还可以用curl通过dict协议去查字典$ curl dict://dict.org/d：computer

---------------------------

 

 

 

Curl是Linux下一个很强大的http命令行工具，其功能十分强大。

1) 二话不说，先从这里开始吧！

$ curl http://www.linuxidc.com

回车之后，www.linuxidc.com 的html就稀里哗啦地显示在屏幕上了    ~

2) 嗯，要想把读过来页面存下来，是不是要这样呢？

$ curl http://www.linuxidc.com > page.html

当然可以，但不用这么麻烦的！

用curl的内置option就好，存下http的结果，用这个option: -o

$ curl -o page.html http://www.linuxidc.com

这样，你就可以看到屏幕上出现一个下载页面进度指示。等进展到100%，自然就 OK咯

3) 什么什么？！访问不到？肯定是你的proxy没有设定了。

使用curl的时候，用这个option可以指定http访问所使用的proxy服务器及其端口： -x

$ curl -x 123.45.67.89:1080 -o page.html http://www.linuxidc.com

4) 访问有些网站的时候比较讨厌，他使用cookie来记录session信息。

像IE/NN这样的浏览器，当然可以轻易处理cookie信息，但我们的curl呢？.....

我们来学习这个option: -D <— 这个是把http的response里面的cookie信息存到一个特别的文件中去

$ curl -x 123.45.67.89:1080 -o page.html -D cookie0001.txt http://www.linuxidc.com

这样，当页面被存到page.html的同时，cookie信息也被存到了cookie0001.txt里面了

5）那么，下一次访问的时候，如何继续使用上次留下的cookie信息呢？要知道，很多网站都是靠监视你的cookie信息，来判断你是不是不按规矩访问他们的网站的。

这次我们使用这个option来把上次的cookie信息追加到http request里面去： -b

$ curl -x 123.45.67.89:1080 -o page1.html -D cookie0002.txt -b cookie0001.txt http://www.linuxidc.com

这样，我们就可以几乎模拟所有的IE操作，去访问网页了！

6）稍微等等    ~我好像忘记什么了    ~

对了！是浏览器信息

有些讨厌的网站总要我们使用某些特定的浏览器去访问他们，有时候更过分的是，还要使用某些特定的版本     NND，哪里有时间为了它去找这些怪异的浏览器呢！？

好在curl给我们提供了一个有用的option，可以让我们随意指定自己这次访问所宣称的自己的浏览器信息： -A

$ curl -A "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)" -x 123.45.67.89:1080 -o page.html -D cookie0001.txt http://www.linuxidc.com

这样，服务器端接到访问的要求，会认为你是一个运行在Windows 2000上的 IE6.0，嘿嘿嘿，其实也许你用的是苹果机呢！

而"Mozilla/4.73 [en] (X11; U; Linux 2.2; 15 i686"则可以告诉对方你是一台 PC上跑着的Linux，用的是Netscape 4.73，呵呵呵

7）另外一个服务器端常用的限制方法，就是检查http访问的referer。比如你先访问首页，再访问里面所指定的下载页，这第二次访问的 referer地址就是第一次访问成功后的页面地址。这样，服务器端只要发现对下载页面某次访问的referer地址不是首页的地址，就可以断定那是个盗连了    ~

讨厌讨厌 ~我就是要盗连    ~！！

幸好curl给我们提供了设定referer的option： -e

$ curl -A "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)" -x 123.45.67.89:1080 -e "mail.linuxidc.com" -o page.html -D cookie0001.txt http://www.linuxidc.com

这样，就可以骗对方的服务器，你是从mail.linuxidc.com点击某个链接过来的了，呵呵呵

8）写着写着发现漏掉什么重要的东西了！——- 利用curl 下载文件

刚才讲过了，下载页面到一个文件里，可以使用 -o ，下载文件也是一样。比如，

$ curl -o 1.jpg http://cgi2.tky.3web.ne.jp/~zzh/screen1.JPG

这里教大家一个新的option： -O 大写的O，这么用：

$ curl -O http://cgi2.tky.3web.ne.jp/~zzh/screen1.JPG

这样，就可以按照服务器上的文件名，自动存在本地了！

再来一个更好用的。

如果screen1.JPG以外还有screen2.JPG、screen3.JPG、....、screen10.JPG需要下载，难不成还要让我们写一个script来完成这些操作？

不干！

在curl里面，这么写就可以了：

$ curl -O http://cgi2.tky.3web.ne.jp/~zzh/screen[1-10].JPG

呵呵呵，厉害吧？！ ~

9）再来，我们继续讲解下载！

$ curl -O http://cgi2.tky.3web.ne.jp/~{zzh,nick}/[001-201].JPG

这样产生的下载，就是

~zzh/001.JPG

~zzh/002.JPG

...

~zzh/201.JPG

~nick/001.JPG

~nick/002.JPG

...

~nick/201.JPG

够方便的了吧？哈哈哈

咦？高兴得太早了。

由于zzh/nick下的文件名都是001，002...，201，下载下来的文件重名，后面的把前面的文件都给覆盖掉了 ~

没关系，我们还有更狠的！

$ curl -o #2_#1.jpg http://cgi2.tky.3web.ne.jp/~{zzh,nick}/[001-201].JPG

—这是.....自定义文件名的下载？ —对头，呵呵！

这样，自定义出来下载下来的文件名，就变成了这样：原来： ~zzh/001.JPG —-> 下载后： 001-zzh.JPG 原来： ~nick/001.JPG —-> 下载后： 001-nick.JPG

这样一来，就不怕文件重名啦，呵呵

9）继续讲下载

我们平时在windows平台上，flashget这样的工具可以帮我们分块并行下载，还可以断线续传。curl在这些方面也不输给谁，嘿嘿

比如我们下载screen1.JPG中，突然掉线了，我们就可以这样开始续传

$ curl -c -O http://cgi2.tky.3wb.ne.jp/~zzh/screen1.JPG

当然，你不要拿个flashget下载了一半的文件来糊弄我    别的下载软件的半截文件可不一定能用哦 ~

分块下载，我们使用这个option就可以了： -r

举例说明

比如我们有一个http://cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 要下载（赵老师的电话朗诵 :D ）我们就可以用这样的命令：

$ curl -r 0-10240 -o "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 &\

$ curl -r 10241-20480 -o "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 &\

$ curl -r 20481-40960 -o "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 &\

$ curl -r 40961- -o "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3

这样就可以分块下载啦。不过你需要自己把这些破碎的文件合并起来如果你用UNIX或苹果，用 cat zhao.part* > zhao.MP3就可以如果用的是Windows，用copy /b 来解决吧，呵呵

上面讲的都是http协议的下载，其实ftp也一样可以用。用法嘛，

$ curl -u name:passwd ftp://ip:port/path/file

或者大家熟悉的

$ curl ftp://name:passwd@ip:port/path/file

10) 说完了下载，接下来自然该讲上传咯上传的option是 -T

比如我们向ftp传一个文件：

$ curl -T localfile -u name:passwd ftp://upload_site:port/path/

当然，向http服务器上传文件也可以比如

$ curl -T localfile http://cgi2.tky.3web.ne.jp/~zzh/abc.cgi

注意，这时候，使用的协议是HTTP的PUT method

刚才说到PUT，嘿嘿，自然让老服想起来了其他几种methos还没讲呢！ GET和POST都不能忘哦。

http提交一个表单，比较常用的是POST模式和GET模式

GET模式什么option都不用，只需要把变量写在url里面就可以了比如：

$ curl http://www.linuxidc.com/login.cgi?user=nickwolfe&password=12345

而POST模式的option则是 -d

比如，

$ curl -d "user=nickwolfe&password=12345" http://www.linuxidc.com/login.cgi

就相当于向这个站点发出一次登陆申请    ~

到底该用GET模式还是POST模式，要看对面服务器的程序设定。

一点需要注意的是，POST模式下的文件上的文件上传，比如

<form method="POST" enctype="multipar/form-data" action="http://cgi2.tky.3web.ne.jp/~zzh/up_file.cgi">

<input type=file name=upload>

<input type=submit name=nick value="go">

</form>

这样一个HTTP表单，我们要用curl进行模拟，就该是这样的语法：

$ curl -F upload=@localfile -F nick=go http://cgi2.tky.3web.ne.jp/~zzh/up_file.cgi

罗罗嗦嗦讲了这么多，其实curl还有很多很多技巧和用法比如 https的时候使用本地证书，就可以这样

$ curl -E localcert.pem https://remote_server

再比如，你还可以用curl通过dict协议去查字典    ~

$ curl dict://dict.org/d:computer
------------------------------------------------------------------

linux curl是一个利用URL规则在命令行下工作的文件传输工具。它支持文件的上传和下载，所以是综合传输工具，但按传统，习惯称url为下载工具。

　　一，curl命令参数，有好多我没有用过，也不知道翻译的对不对，如果有误的地方，还请指正。

　　-a/--append 上传文件时，附加到目标文件

　　-A/--user-agent <string>  设置用户代理发送给服务器

　　- anyauth   可以使用“任何”身份验证方法

　　-b/--cookie <name=string/file> cookie字符串或文件读取位置

　　- basic 使用HTTP基本验证

　　-B/--use-ascii 使用ASCII /文本传输

　　-c/--cookie-jar <file> 操作结束后把cookie写入到这个文件中

　　-C/--continue-at <offset>  断点续转

　　-d/--data <data>   HTTP POST方式传送数据

　　--data-ascii <data>  以ascii的方式post数据

　　--data-binary <data> 以二进制的方式post数据

　　--negotiate     使用HTTP身份验证

　　--digest        使用数字身份验证

　　--disable-eprt  禁止使用EPRT或LPRT

　　--disable-epsv  禁止使用EPSV

　　-D/--dump-header <file> 把header信息写入到该文件中

　　--egd-file <file> 为随机数据(SSL)设置EGD socket路径

　　--tcp-nodelay   使用TCP_NODELAY选项

　　-e/--referer 来源网址

　　-E/--cert <cert[:passwd]> 客户端证书文件和密码 (SSL)

　　--cert-type <type> 证书文件类型 (DER/PEM/ENG) (SSL)

　　--key <key>     私钥文件名 (SSL)

　　--key-type <type> 私钥文件类型 (DER/PEM/ENG) (SSL)

　　--pass  <pass>  私钥密码 (SSL)

　　--engine <eng>  加密引擎使用 (SSL). "--engine list" for list

　　--cacert <file> CA证书 (SSL)

　　--capath <directory> CA目录 (made using c_rehash) to verify peer against (SSL)

　　--ciphers <list>  SSL密码

　　--compressed    要求返回是压缩的形势 (using deflate or gzip)

　　--connect-timeout <seconds> 设置最大请求时间

　　--create-dirs   建立本地目录的目录层次结构

　　--crlf          上传是把LF转变成CRLF

　　-f/--fail          连接失败时不显示http错误

　　--ftp-create-dirs 如果远程目录不存在，创建远程目录

　　--ftp-method [multicwd/nocwd/singlecwd] 控制CWD的使用

　　--ftp-pasv      使用 PASV/EPSV 代替端口

　　--ftp-skip-pasv-ip 使用PASV的时候,忽略该IP地址

　　--ftp-ssl       尝试用 SSL/TLS 来进行ftp数据传输

　　--ftp-ssl-reqd  要求用 SSL/TLS 来进行ftp数据传输

　　-F/--form <name=content> 模拟http表单提交数据

　　-form-string <name=string> 模拟http表单提交数据

　　-g/--globoff 禁用网址序列和范围使用{}和[]

　　-G/--get 以get的方式来发送数据

　　-h/--help 帮助

　　-H/--header <line>自定义头信息传递给服务器

　　--ignore-content-length  忽略的HTTP头信息的长度

　　-i/--include 输出时包括protocol头信息

　　-I/--head  只显示文档信息

　　从文件中读取-j/--junk-session-cookies忽略会话Cookie

　　- 界面<interface>指定网络接口/地址使用

　　- krb4 <级别>启用与指定的安全级别krb4

　　-j/--junk-session-cookies 读取文件进忽略session cookie

　　--interface <interface> 使用指定网络接口/地址

　　--krb4 <level>  使用指定安全级别的krb4

　　-k/--insecure 允许不使用证书到SSL站点

　　-K/--config  指定的配置文件读取

　　-l/--list-only 列出ftp目录下的文件名称

　　--limit-rate <rate> 设置传输速度

　　--local-port<NUM> 强制使用本地端口号

　　-m/--max-time <seconds> 设置最大传输时间

　　--max-redirs <num> 设置最大读取的目录数

　　--max-filesize <bytes> 设置最大下载的文件总量

　　-M/--manual  显示全手动

　　-n/--netrc 从netrc文件中读取用户名和密码

　　--netrc-optional 使用 .netrc 或者 URL来覆盖-n

　　--ntlm          使用 HTTP NTLM 身份验证

　　-N/--no-buffer 禁用缓冲输出

　　-o/--output 把输出写到该文件中

　　-O/--remote-name 把输出写到该文件中，保留远程文件的文件名

　　-p/--proxytunnel   使用HTTP代理

　　--proxy-anyauth 选择任一代理身份验证方法

　　--proxy-basic   在代理上使用基本身份验证

　　--proxy-digest  在代理上使用数字身份验证

　　--proxy-ntlm    在代理上使用ntlm身份验证

　　-P/--ftp-port <address> 使用端口地址，而不是使用PASV

　　-Q/--quote <cmd>文件传输前，发送命令到服务器

　　-r/--range <range>检索来自HTTP/1.1或FTP服务器字节范围

　　--range-file 读取（SSL）的随机文件

　　-R/--remote-time   在本地生成文件时，保留远程文件时间

　　--retry <num>   传输出现问题时，重试的次数

　　--retry-delay <seconds>  传输出现问题时，设置重试间隔时间

　　--retry-max-time <seconds> 传输出现问题时，设置最大重试时间

　　-s/--silent静音模式。不输出任何东西

　　-S/--show-error   显示错误

　　--socks4 <host[:port]> 用socks4代理给定主机和端口

　　--socks5 <host[:port]> 用socks5代理给定主机和端口

　　--stderr <file>

　-t/--telnet-option <OPT=val> Telnet选项设置

　　--trace <file>  对指定文件进行debug

　　--trace-ascii <file> Like --跟踪但没有hex输出

　　--trace-time    跟踪/详细输出时，添加时间戳

　　-T/--upload-file <file> 上传文件

　　--url <URL>     Spet URL to work with

　　-u/--user <user[:password]>设置服务器的用户和密码

　　-U/--proxy-user <user[:password]>设置代理用户名和密码

　　-v/--verbose

　　-V/--version 显示版本信息

　　-w/--write-out [format]什么输出完成后

　　-x/--proxy <host[:port]>在给定的端口上使用HTTP代理

　　-X/--request <command>指定什么命令

　　-y/--speed-time 放弃限速所要的时间。默认为30

　　-Y/--speed-limit 停止传输速度的限制，速度时间'秒

　　-z/--time-cond  传送时间设置

　　-0/--http1.0  使用HTTP 1.0

　　-1/--tlsv1  使用TLSv1（SSL）

　　-2/--sslv2 使用SSLv2的（SSL）

　　-3/--sslv3         使用的SSLv3（SSL）

　　--3p-quote      like -Q for the source URL for 3rd party transfer

　　--3p-url        使用url，进行第三方传送

　　--3p-user       使用用户名和密码，进行第三方传送

　　-4/--ipv4   使用IP4

　　-6/--ipv6   使用IP6

　　-#/--progress-bar 用进度条显示当前的传送状态

　　-a/--append 上传文件时，附加到目标文件

　　-A/--user-agent <string>  设置用户代理发送给服务器

　　- anyauth   可以使用“任何”身份验证方法

　　-b/--cookie <name=string/file> cookie字符串或文件读取位置

　　- basic 使用HTTP基本验证

　　-B/--use-ascii 使用ASCII /文本传输

　　-c/--cookie-jar <file> 操作结束后把cookie写入到这个文件中

　　-C/--continue-at <offset>  断点续转

　　-d/--data <data>   HTTP POST方式传送数据

　　--data-ascii <data>  以ascii的方式post数据

　　--data-binary <data> 以二进制的方式post数据

　　--negotiate     使用HTTP身份验证

　　--digest        使用数字身份验证

　　--disable-eprt  禁止使用EPRT或LPRT

　　--disable-epsv  禁止使用EPSV

　　-D/--dump-header <file> 把header信息写入到该文件中

　　--egd-file <file> 为随机数据(SSL)设置EGD socket路径

　　--tcp-nodelay   使用TCP_NODELAY选项

　　-e/--referer 来源网址

　　-E/--cert <cert[:passwd]> 客户端证书文件和密码 (SSL)

　　--cert-type <type> 证书文件类型 (DER/PEM/ENG) (SSL)

　　--key <key>     私钥文件名 (SSL)

　　--key-type <type> 私钥文件类型 (DER/PEM/ENG) (SSL)

　　--pass  <pass>  私钥密码 (SSL)

　　--engine <eng>  加密引擎使用 (SSL). "--engine list" for list

　　--cacert <file> CA证书 (SSL)

　　--capath <directory> CA目录 (made using c_rehash) to verify peer against (SSL)

　　--ciphers <list>  SSL密码

　　--compressed    要求返回是压缩的形势 (using deflate or gzip)

　　--connect-timeout <seconds> 设置最大请求时间

　　--create-dirs   建立本地目录的目录层次结构

　　--crlf          上传是把LF转变成CRLF

　　-f/--fail          连接失败时不显示http错误

　　--ftp-create-dirs 如果远程目录不存在，创建远程目录

　　--ftp-method [multicwd/nocwd/singlecwd] 控制CWD的使用

　　--ftp-pasv      使用 PASV/EPSV 代替端口

　　--ftp-skip-pasv-ip 使用PASV的时候,忽略该IP地址

　　--ftp-ssl       尝试用 SSL/TLS 来进行ftp数据传输

　　--ftp-ssl-reqd  要求用 SSL/TLS 来进行ftp数据传输

　　-F/--form <name=content> 模拟http表单提交数据

　　-form-string <name=string> 模拟http表单提交数据

　　-g/--globoff 禁用网址序列和范围使用{}和[]

　　-G/--get 以get的方式来发送数据

　　-h/--help 帮助

　　-H/--header <line>自定义头信息传递给服务器

　　--ignore-content-length  忽略的HTTP头信息的长度

　　-i/--include 输出时包括protocol头信息

　　-I/--head  只显示文档信息

　　从文件中读取-j/--junk-session-cookies忽略会话Cookie

　　- 界面<interface>指定网络接口/地址使用

　　- krb4 <级别>启用与指定的安全级别krb4

　　-j/--junk-session-cookies 读取文件进忽略session cookie

　　--interface <interface> 使用指定网络接口/地址

　　--krb4 <level>  使用指定安全级别的krb4

　　-k/--insecure 允许不使用证书到SSL站点

　　-K/--config  指定的配置文件读取

　　-l/--list-only 列出ftp目录下的文件名称

　　--limit-rate <rate> 设置传输速度

　　--local-port<NUM> 强制使用本地端口号

　　-m/--max-time <seconds> 设置最大传输时间

　　--max-redirs <num> 设置最大读取的目录数

　　--max-filesize <bytes> 设置最大下载的文件总量

-M/--manual  显示全手动

　　-n/--netrc 从netrc文件中读取用户名和密码

　　--netrc-optional 使用 .netrc 或者 URL来覆盖-n

　　--ntlm          使用 HTTP NTLM 身份验证

　　-N/--no-buffer 禁用缓冲输出

　　-o/--output 把输出写到该文件中

　　-O/--remote-name 把输出写到该文件中，保留远程文件的文件名

　　-p/--proxytunnel   使用HTTP代理

　　--proxy-anyauth 选择任一代理身份验证方法

　　--proxy-basic   在代理上使用基本身份验证

　　--proxy-digest  在代理上使用数字身份验证

　　--proxy-ntlm    在代理上使用ntlm身份验证

　　-P/--ftp-port <address> 使用端口地址，而不是使用PASV

　　-Q/--quote <cmd>文件传输前，发送命令到服务器

　　-r/--range <range>检索来自HTTP/1.1或FTP服务器字节范围

　　--range-file 读取（SSL）的随机文件

　　-R/--remote-time   在本地生成文件时，保留远程文件时间

　　--retry <num>   传输出现问题时，重试的次数

　　--retry-delay <seconds>  传输出现问题时，设置重试间隔时间

　　--retry-max-time <seconds> 传输出现问题时，设置最大重试时间

　　-s/--silent静音模式。不输出任何东西

　　-S/--show-error   显示错误

　　--socks4 <host[:port]> 用socks4代理给定主机和端口

　　--socks5 <host[:port]> 用socks5代理给定主机和端口

　　--stderr <file>

　　-t/--telnet-option <OPT=val> Telnet选项设置

　　--trace <file>  对指定文件进行debug

　　--trace-ascii <file> Like --跟踪但没有hex输出

　　--trace-time    跟踪/详细输出时，添加时间戳

　　-T/--upload-file <file> 上传文件

　　--url <URL>     Spet URL to work with

　　-u/--user <user[:password]>设置服务器的用户和密码

　　-U/--proxy-user <user[:password]>设置代理用户名和密码

　　-v/--verbose

　　-V/--version 显示版本信息

　　-w/--write-out [format]什么输出完成后

　　-x/--proxy <host[:port]>在给定的端口上使用HTTP代理

　　-X/--request <command>指定什么命令

　　-y/--speed-time 放弃限速所要的时间。默认为30

　　-Y/--speed-limit 停止传输速度的限制，速度时间'秒

　　-z/--time-cond  传送时间设置

　　-0/--http1.0  使用HTTP 1.0

　　-1/--tlsv1  使用TLSv1（SSL）

　　-2/--sslv2 使用SSLv2的（SSL）

　　-3/--sslv3         使用的SSLv3（SSL）

　　--3p-quote      like -Q for the source URL for 3rd party transfer

　　--3p-url        使用url，进行第三方传送

　　--3p-user       使用用户名和密码，进行第三方传送

　　-4/--ipv4   使用IP4

　　-6/--ipv6   使用IP6

　　-#/--progress-bar 用进度条显示当前的传送状态

　　二，常用curl实例

　　1，抓取页面内容到一个文件中

　　[root@krlcgcms01 mytest]# curl -o home.html  http://blog.51yip.com

　　[root@krlcgcms01 mytest]# curl -o home.html  http://blog.51yip.com

　　2，用-O（大写的），后面的url要具体到某个文件，不然抓不下来。我们还可以用正则来抓取东西

　　[root@krlcgcms01 mytest]# curl -O

　　[root@krlcgcms01 mytest]# curl -O

　　3，模拟表单信息，模拟登录，保存cookie信息

　　[root@krlcgcms01 mytest]# curl -c ./cookie_c.txt -F log=aaaa -F pwd=****** http://blog.51yip.com/wp-login.php

　　[root@krlcgcms01 mytest]# curl -c ./cookie_c.txt -F log=aaaa -F pwd=****** http://blog.51yip.com/wp-login.php

　　4，模拟表单信息，模拟登录，保存头信息

　　[root@krlcgcms01 mytest]# curl -D ./cookie_D.txt -F log=aaaa -F pwd=****** http://blog.51yip.com/wp-login.php

　　[root@krlcgcms01 mytest]# curl -D ./cookie_D.txt -F log=aaaa -F pwd=****** http://blog.51yip.com/wp-login.php

　　-c(小写)产生的cookie和-D里面的cookie是不一样的。

　　5，使用cookie文件

　　[root@krlcgcms01 mytest]# curl -b ./cookie_c.txt  http://blog.51yip.com/wp-admin

　　[root@krlcgcms01 mytest]# curl -b ./cookie_c.txt  http://blog.51yip.com/wp-admin

　　6，断点续传，-C(大写的)

　　[root@krlcgcms01 mytest]# curl -C -O

　　7，传送数据,最好用登录页面测试，因为你传值过去后，curl回抓数据，你可以看到你传值有没有成功

　　[root@krlcgcms01 mytest]# curl -d log=aaaa  http://blog.51yip.com/wp-login.php

　　[root@krlcgcms01 mytest]# curl -d log=aaaa  http://blog.51yip.com/wp-login.php

　　8，显示抓取错误，下面这个例子，很清楚的表明了。

　　[root@krlcgcms01 mytest]# curl -f http://blog.51yip.com/asdf

　　curl: (22) The requested URL returned error: 404

　　[root@krlcgcms01 mytest]# curl http://blog.51yip.com/asdf

　　<HTML><HEAD><TITLE>404,not found</TITLE>

　　。。。。。。。。。。。。

　　[root@krlcgcms01 mytest]# curl -f http://blog.51yip.com/asdf

　　curl: (22) The requested URL returned error: 404

　　[root@krlcgcms01 mytest]# curl http://blog.51yip.com/asdf

　　<HTML><HEAD><TITLE>404,not found</TITLE>

　　。。。。。。。。。。。。

　　9，伪造来源地址，有的网站会判断，请求来源地址。

　　[root@krlcgcms01 mytest]# curl -e http://localhost http://blog.51yip.com/wp-login.php

　　[root@krlcgcms01 mytest]# curl -e http://localhost http://blog.51yip.com/wp-login.php

　　10，当我们经常用curl去搞人家东西的时候，人家会把你的IP给屏蔽掉的,这个时候,我们可以用代理

　　[root@krlcgcms01 mytest]# curl -x 24.10.28.84:32779 -o home.html http://blog.51yip.com

　　[root@krlcgcms01 mytest]# curl -x 24.10.28.84:32779 -o home.html http://blog.51yip.com

 

 11，比较大的东西，我们可以分段下载

　　[root@krlcgcms01 mytest]# curl -r 0-100 -o img.part1 http://blog.51yip.com/wp-

　　content/uploads/2010/09/compare_varnish.jpg

　　% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

　　Dload  Upload   Total   Spent    Left  Speed

　　100   101  100   101    0     0    105      0 --:--:-- --:--:-- --:--:--     0

　　[root@krlcgcms01 mytest]# curl -r 100-200 -o img.part2 http://blog.51yip.com/wp-

　　content/uploads/2010/09/compare_varnish.jpg

　　% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

　　Dload  Upload   Total   Spent    Left  Speed

　　100   101  100   101    0     0     57      0  0:00:01  0:00:01 --:--:--     0

　　[root@krlcgcms01 mytest]# curl -r 200- -o img.part3 http://blog.51yip.com/wp-

　　content/uploads/2010/09/compare_varnish.jpg

　　% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

　　Dload  Upload   Total   Spent    Left  Speed

　　100  104k  100  104k    0     0  52793      0  0:00:02  0:00:02 --:--:-- 88961

　　[root@krlcgcms01 mytest]# ls |grep part | xargs du -sh

　　4.0K    one.part1

　　112K    three.part3

　　4.0K    two.part2

　　[root@krlcgcms01 mytest]# curl -r 0-100 -o img.part1 http://blog.51yip.com/wp-

　　content/uploads/2010/09/compare_varnish.jpg

　　% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

　　Dload  Upload   Total   Spent    Left  Speed

　　100   101  100   101    0     0    105      0 --:--:-- --:--:-- --:--:--     0

　　[root@krlcgcms01 mytest]# curl -r 100-200 -o img.part2 http://blog.51yip.com/wp-

　　content/uploads/2010/09/compare_varnish.jpg

　　% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

　　Dload  Upload   Total   Spent    Left  Speed

　　100   101  100   101    0     0     57      0  0:00:01  0:00:01 --:--:--     0

　　[root@krlcgcms01 mytest]# curl -r 200- -o img.part3 http://blog.51yip.com/wp-

　　content/uploads/2010/09/compare_varnish.jpg

　　% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

　　Dload  Upload   Total   Spent    Left  Speed

　　100  104k  100  104k    0     0  52793      0  0:00:02  0:00:02 --:--:-- 88961

　　[root@krlcgcms01 mytest]# ls |grep part | xargs du -sh

　　4.0K    one.part1

　　112K    three.part3

　　4.0K    two.part2

　　用的时候，把他们cat一下就OK了,cat img.part* >img.jpg

　　12，不会显示下载进度信息

　　[root@krlcgcms01 mytest]# curl -s -o aaa.jpg 

　　13，显示下载进度条

　　[root@krlcgcms01 mytest]# curl -# -O 

　　######################################################################## 100.0%

　　14,通过ftp下载文件

　　[zhangy@BlackGhost ~]$ curl -u 用户名:密码 -O http://blog.51yip.com/demo/curtain/bbstudy_files/style.css

　　% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

　　Dload  Upload   Total   Spent    Left  Speed

　　101  1934  101  1934    0     0   3184      0 --:--:-- --:--:-- --:--:--  7136

　　[zhangy@BlackGhost ~]$ curl -u 用户名:密码 -O http://blog.51yip.com/demo/curtain/bbstudy_files/style.css

　　% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

　　Dload  Upload   Total   Spent    Left  Speed

　　101  1934  101  1934    0     0   3184      0 --:--:-- --:--:-- --:--:--  7136

　　或者用下面的方式

　　[zhangy@BlackGhost ~]$ curl -O ftp://用户名:密码@ip:port/demo/curtain/bbstudy_files/style.css

　　[zhangy@BlackGhost ~]$ curl -O ftp://用户名:密码@ip:port/demo/curtain/bbstudy_files/style.css

　　15，通过ftp上传

　　[zhangy@BlackGhost ~]$ curl -T test.sql ftp://用户名:密码@ip:port/demo/curtain/bbstudy_files/

　　[zhangy@BlackGhost ~]$ curl -T test.sql ftp://用户名:密码@ip:port/demo/curtain/bbstudy_files/

 

摘自：

http://linux.chinaitlab.com/command/830656_4.html

http://www.linuxidc.com/Linux/2008-01/10891p2.htm

http://os.51cto.com/art/200909/153386_1.htm



