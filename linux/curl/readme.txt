Linux curl����������
2013��7��3�� aiezu	�������� �Ķ�����

linux curl��ͨ��url�﷨�����������ϴ��������ļ��Ĺ����������֧��http,https,ftp,ftps,telnet�ȶ���Э�飬��������ץȡ��ҳ�ͼ��Web������״̬��
һ��Linux curl�÷�������
1. linux curlץȡ��ҳ��

ץȡ�ٶȣ�

curl http://www.baidu.com 
1
	
curl http://www.baidu.com 

�緢�����룬����ʹ��iconvת�룺

curl http://iframe.ip138.com/ic.asp|<span class='wp_keywordlink_affiliate'><a href="http://www.aiezu.com/tag/iconv" title="�鿴 iconv �е�ȫ������" target="_blank">iconv</a></span> -fgb2312
1
	
curl http://iframe.ip138.com/ic.asp|iconv -fgb2312

iconv���÷�����ģ���Linux/Unixϵͳ����iconv������ı��ļ�������������


2. Linux curlʹ�ô���

linux curlʹ��http����ץȡҳ�棺
curl -x 111.95.243.36:80 http://iframe.ip138.com/ic.asp|iconv -fgb2312
curl -x 111.95.243.36:80 -U aiezu:password http://www.baidu.com
1
2
	
curl -x 111.95.243.36:80 http://iframe.ip138.com/ic.asp|iconv -fgb2312
curl -x 111.95.243.36:80 -U aiezu:password http://www.baidu.com

ʹ��socks����ץȡҳ�棺
curl --socks4 202.113.65.229:443 http://iframe.ip138.com/ic.asp|iconv -fgb2312
curl --socks5 202.113.65.229:443 http://iframe.ip138.com/ic.asp|iconv -fgb2312
1
2
	
curl --socks4 202.113.65.229:443 http://iframe.ip138.com/ic.asp|iconv -fgb2312
curl --socks5 202.113.65.229:443 http://iframe.ip138.com/ic.asp|iconv -fgb2312

�����������ַ���Դ���������ϻ�ȡ��


3. linux curl����cookies

����cookies:
curl -c /tmp/cookies http://www.baidu.com #cookies���浽/tmp/cookies�ļ�
1
	
curl -c /tmp/cookies http://www.baidu.com #cookies���浽/tmp/cookies�ļ�

����cookies:
curl -b "key1=val1;key2=val2;" http://www.baidu.com #����cookies�ı�
curl -b /tmp/cookies http://www.baidu.com #���ļ��ж�ȡcookies
1
2
	
curl -b "key1=val1;key2=val2;" http://www.baidu.com #����cookies�ı�
curl -b /tmp/cookies http://www.baidu.com #���ļ��ж�ȡcookies


4. linux curl�������ݣ�

linux curl get��ʽ�ύ���ݣ�
curl -G -d "name=value&name2=value2" http://www.baidu.com 
1
	
curl -G -d "name=value&name2=value2" http://www.baidu.com 

linux curl post��ʽ�ύ���ݣ�
curl -d "name=value&name2=value2" http://www.baidu.com #<span class='wp_keywordlink_affiliate'><a href="http://www.aiezu.com/tag/post" title="�鿴 post �е�ȫ������" target="_blank">post</a></span>����
curl -d a=b&c=d&txt@/tmp/txt http://www.baidu.com  #post�ļ�
1
2
	
curl -d "name=value&name2=value2" http://www.baidu.com #post����
curl -d a=b&c=d&txt@/tmp/txt http://www.baidu.com  #post�ļ�

�Ա��ķ�ʽ�ϴ��ļ���
curl -F file=@/tmp/me.txt http://www.aiezu.com
1
	
curl -F file=@/tmp/me.txt http://www.aiezu.com

�൱������form����method="POST"��enctype='multipart/form-data'�������ԡ�


5. linux curl http header����

����http����ͷ��Ϣ��
curl -A "Mozilla/5.0 Firefox/21.0" http://www.baidu.com #����http����ͷUser-Agent
curl -e "http://pachong.org/" http://www.baidu.com #����http����ͷReferer
curl -H "Connection:keep-alive \n User-Agent: Mozilla/5.0" http://www.aiezu.com
1
2
3
	
curl -A "Mozilla/5.0 Firefox/21.0" http://www.baidu.com #����http����ͷUser-Agent
curl -e "http://pachong.org/" http://www.baidu.com #����http����ͷReferer
curl -H "Connection:keep-alive \n User-Agent: Mozilla/5.0" http://www.aiezu.com

����http��Ӧͷ����
curl -I http://www.aiezu.com #��������header
curl -D /tmp/header http://www.aiezu.com #��http header���浽/tmp/header�ļ�
1
2
	
curl -I http://www.aiezu.com #��������header
curl -D /tmp/header http://www.aiezu.com #��http header���浽/tmp/header�ļ�


6. linux curl��֤��

curl -u aiezu:password http://www.aiezu.com #�û���������֤
curl -E mycert.pem https://www.baidu.com #����֤����֤
1
2
	
curl -u aiezu:password http://www.aiezu.com #�û���������֤
curl -E mycert.pem https://www.baidu.com #����֤����֤


6. ������

curl -# http://www.baidu.com #�ԡ�#�������������
curl -o /tmp/aiezu http://www.baidu.com #����http��Ӧ��/tmp/aiezu
1
2
	
curl -# http://www.baidu.com #�ԡ�#�������������
curl -o /tmp/aiezu http://www.baidu.com #����http��Ӧ��/tmp/aiezu







Linux curl����������--ת��

linux curl��ͨ��url�﷨�����������ϴ��������ļ��Ĺ����������֧��http,https,ftp,ftps,telnet�ȶ���Э�飬��������ץȡ��ҳ�ͼ��Web������״̬��
һ��Linux curl�÷�������
1. linux curlץȡ��ҳ��

ץȡ�ٶȣ�

 
 
1
	
curl http://www.baidu.com

 

�緢�����룬����ʹ��iconvת�룺

 
 
1
	
curl http://iframe.ip138.com/ic.asp|iconv -fgb2312

iconv���÷�����ģ���Linux/Unixϵͳ����iconv������ı��ļ�������������

 
2. Linux curlʹ�ô���

linux curlʹ��http����ץȡҳ�棺
 
1
2
	
curl -x 111.95.243.36:80 http://iframe.ip138.com/ic.asp|iconv -fgb2312
curl -x 111.95.243.36:80 -U aiezu:password http://www.baidu.com

 

ʹ��socks����ץȡҳ�棺
 
1
2
	
curl --socks4 202.113.65.229:443 http://iframe.ip138.com/ic.asp|iconv -fgb2312
curl --socks5 202.113.65.229:443 http://iframe.ip138.com/ic.asp|iconv -fgb2312

 

�����������ַ���Դ���������ϻ�ȡ��

 
3. linux curl����cookies

����cookies:
 
1
	
curl -c /tmp/cookies http://www.baidu.com #cookies���浽/tmp/cookies�ļ�

 

����cookies:
 
1
2
	
curl -b "key1=val1;key2=val2;" http://www.baidu.com #����cookies�ı�
curl -b /tmp/cookies http://www.baidu.com #���ļ��ж�ȡcookies

 

 
4. linux curl�������ݣ�

linux curl get��ʽ�ύ���ݣ�
 
1
	
curl -G -d "name=value&name2=value2" http://www.baidu.com

 

linux curl post��ʽ�ύ���ݣ�
 
1
2
	
curl -d "name=value&name2=value2" http://www.baidu.com #post����
curl -d a=b&c=d&txt@/tmp/txt http://www.baidu.com  #post�ļ�

 

�Ա��ķ�ʽ�ϴ��ļ���
 
1
	
curl -F file=@/tmp/me.txt http://www.aiezu.com

 

�൱������form����method="POST"��enctype='multipart/form-data'�������ԡ�

 
5. linux curl http header����

����http����ͷ��Ϣ��
 
1
2
3
	
curl -A "Mozilla/5.0 Firefox/21.0" http://www.baidu.com #����http����ͷUser-Agent
curl -e "http://pachong.org/" http://www.baidu.com #����http����ͷReferer
curl -H "Connection:keep-alive \n User-Agent: Mozilla/5.0" http://www.aiezu.com

����http��Ӧͷ����
 
1
2
	
curl -I http://www.aiezu.com #��������header
curl -D /tmp/header http://www.aiezu.com #��http header���浽/tmp/header�ļ�

 

 
6. linux curl��֤��

 
 
1
2
	
curl -u aiezu:password http://www.aiezu.com #�û���������֤
curl -E mycert.pem https://www.baidu.com #����֤����֤

 

 
6. ������

 
 
1
2
	
curl -# http://www.baidu.com #�ԡ�#�������������
curl -o /tmp/aiezu http://www.baidu.com #����http��Ӧ��/tmp/aiezu

 
 
 ԭ�ĵ�ַ��http://www.aiezu.com/system/linux/linux_curl_syntax.html
 
linux ʹ��curlС�����ѵ��
http�����ַ��urlҪʹ��""�����������д��ڶ������ʹ��&����ʱ���ܻ����
 



 linux curl �÷����
���ࣺ linux ���� 2011-09-15 10:26 4654���Ķ� ����(0) �ղ� �ٱ�
linuxhttp������������ftp������urldownload
 linux ??curl�÷����

??curl��Ӧ�÷�ʽ��һ�ǿ���ֱ��ͨ�������й��ߣ���һ��������libcurl�����ϲ�Ŀ�������ƪ��Ҫ�ܽ�һ�������й��ߵ�http��ص�Ӧ�ã� ������http���ط���ģ���һƪ�ٽ�����libcurl��Ŀ�����

 
 
   curl�������й��߹��ܷǳ�ǿ����Щ���ݽ����Ĺ��ܻ����϶���ͨ��URL��ʽ���еģ�������������curl�Զ��URL������������Щ����ʹ���ǵ� ����������Ӧ�������ǳ����㡣
 
   1����{}��ʾ���URL
   �� http://site.{one,two,three}.com�� ֻҪ��{}��д�ϲ�ͬ�Ĳ��֣��Ϳ��Ա�ʾ3��URL�ˡ�
 
   2����[]��ʾ���URL
   �� ftp://ftp.numericals.com/file[1-100].txt��ftp://ftp.numericals.com/file[001-100].txt��ftp://ftp.letters.com/file[a-z].txt�� []�б�ʾ�����ֻ���ĸ��˳�����С�
   ���ܱ�ʾ�����������У��� http://www.numericals.com/file[1-100:10].txt��http://www.letters.com/file[a-z:2].txt��":" ��������ֱ�ʾ�Ȳ����еĽ�Ծ����
 
   3���������ʹ��
   �� http://any.org/archive[1996-1999]/vol[1-4]/part{a,b,c}.html��
 
 
   curl�����й��ߵĻ������Ϊ��curl [options] [URL...]���� curl [ѡ��] [���ص�ַ]����ˣ�����������ذٶȵ���ҳ����򵥵ķ�������cmd������curl��װĿ¼���������curl http://www.baidu.com���س������������ڽ��������ְٶ���ҳ ��html���ݡ�
   �������еĲ�����option��������--option��ʾ֧�����ѡ�--no-option��ʾ�������ѡ������ܽἸ���Ƚ����õ� options��
 
   1��-o/--output <file>
   ���������Ҫ����õ�ѡ���ˣ����ڽ����ص����ݱ��浽ĳ���ļ��С��� curl -o baidu.html http://www.baidu.com�򽫰ٶ���ҳ���浽baidu.html �ļ����ˡ����ع����б�׼���������ʾ���ص�ͳ����Ϣ��������ȡ������ֽ����������ٶȵȡ����ָ�����Ϊ"-"�����������ݻ��������׼�����
   ���������ļ���һ���༶Ŀ¼�Ļ�����Ҫ���--create-dirsѡ�--create-dirs���Զ��������õ����Ŀ¼��
   ���ϣ�����浽���ص��ļ����ͷ������ϵ���ͬ���Ϳ���ֱ����-Oѡ���дO������ʡȥָ�������ļ�����
   ������ض�������ļ�������ʹ�������ᵽ�Ķ�URL���������ļ���Ҳ���������Զ��壬����ʹ��"#"�����Խ�"#"�ӵ��ļ������У�����ʵ���ļ����� ��#�������URL�еĵ�ǰ�ַ������棬�� curl http://{site,host}.host[1-5].com -o "#1_#2"��#1����"site"��"host"���棬#2����1-5֮������ִ��棬Ҳ���Ǳ���ǰ�������URL�е��ַ������档
   �����������ݵ�ʱ�򣬿��ԼӸ�"-#"ѡ���һ���������������ı���ʾ���ȡ�
 
   2��-c/--cookie-jar <file name> �� -b/--cookie <name=data>
   ������������cookie��ѡ��ܶ����������Ҫcookie��Ϣ�ġ���ǰһ��ѡ�����ָ��һ���ļ����������ļ��е�cookie���ߴӷ������õ��� cookieд���ļ��У���һ��ѡ�������������������cookie��Ϣ��������"name=data"����ʽ��Ҳ����ֱ�Ӹ�һ������cookie���ļ� ����
 
   3��-x/--proxy <proxyhost[:port]>
   ��ѡ��Ϊhttpָ�������˿ڣ������ָ���˿ڣ�Ĭ��Ϊ1080���� curl -x 201.36.208.19:3128 http://curl.haxx.se/��
 
   4��-u/--user <user:password> �� -U/--proxy-user <user:password>
   ��¼ĳЩҳ���ftp��Ҫ�Ƚ�����֤�������û��������롣curl�����ѡ�����ֱ�Ӵ��������������ָ�����˺ź�������е�¼��֤��
   �����ѡ��ָ��������û��������룬���������ֱ����������������ҳ�ˣ��� curl -U user:password -x 201.36.208.19:3128 http://curl.haxx.se/��
 
   5��-A/--user-agent <agent string>
   ��ѡ�����ָ���ͻ������ͣ�������ͨ����ѡ���ж��û�Ӧ�õ�ƽ̨���������Ϣ���� curl -A "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)" http://www.clientinfo.com��
��ʾ���߷��������ͻ�����������Windows 2000ϵͳ�ϵ�IE6.0��

  

    6��-d/--data <data>
   ��ѡ��������POST��ʽ��http�����������ض����ݣ���õľ����ύ������ curl -d "user=username&password=111" http://www.login.com�� ��ʾ���˺�username������111��վ�㷢�͵�¼���롣���ж�����ݶο�����"&"��������һ���ͣ��������ǰ����Ϸ���"@"�������� ��ԴΪ����ָ�����ļ����� curl -d password=@D:\pw.txthttp://www.login.com��

  

    7��-C/--continue-at <offset>
   ��ѡ���ṩ�ϵ��������ܣ���-oѡ�����ʹ�á��� curl -c -O http://vfile.home.news.cn/music/public/vd05/200905/31/a8/MUfs052009053117155750a8be70.mp3�� ���ָ��offset�����offset��λ�ÿ�ʼ���������δָ��offset������ֱ����"-C -"����curl���Լ������ô�ʲôλ�ÿ�ʼ������

  

    8��-r/--range <range>
   ��ѡ��ָ�������ֽڵķ�Χ����Ӧ���ڷֿ������ļ���range�ı�ʾ��ʽ�ж��֣���100-500����ָ����100��ʼ��400���ֽ����ݣ�-500��ʾ ����500���ֽڣ�5000-��ʾ�ӵ�5000���ֽڿ�ʼ�������ֽڣ����⻹����ͬʱָ������ֽڿ飬�м���","�ֿ�����
   curl -r 0-1024000 -o new_divide_1.mp3 http://vfile.home.news.cn/music/public/vd05/200905/31/a8/MUfs052009053117155750a8be70.mp3 &
   curl -r 1024001-2048000 -o new_divide_2.mp3 http://vfile.home.news.cn/music/public/vd05/200905/31/a8/MUfs052009053117155750a8be70.mp3 &
   curl -r 2048001- -o new_divide_3.mp3 http://vfile.home.news.cn/music/public/vd05/200905/31/a8/MUfs052009053117155750a8be70.mp3
   �����ͻὫĿ��mp3�ļ��ֿ�����Ϊ3���ļ���Ȼ�������dos��copy���copy new_divide_1.mp3/b + new_divide_2.mp3/b + new_divide_3.mp3/b new_divide.mp3���ɽ�3���ֿ��ļ��ϲ�Ϊһ��������mp3�ļ���
 
   9��-w/--write-out <format>
   ��ѡ���ʽ�����һЩ�û�������������Ϣ���õ��ĸ�ʽ�����������"\n"��"\r"��"\t"��Щ����ת����⣬������"@"��"%"���� ��"@filename"��ʾ���filename�ļ��е����ݣ�"@-"��ʾ����û�д���׼��������ݣ�"%"��ʶ��������϶���Ĺؼ��֣� ����������Ӧ��curl���ݣ����õĹؼ����У�
   http_code ���� �ϴβ������ص���Ӧ�룻
   time_total ���� �ϴβ�����ʱ����λΪ�룻
   time_connect ���� TCP����Զ�������ĺ�ʱ����λΪ�룻
   time_pretransfer ���� �ļ�������ʼ����֮ǰ������ʱ����λΪ�룬������Ҫ����һЩ������Э������ĺ�ʱ��
   time_starttransfer ���� �ļ��ĵ�һ���ֽڿ�ʼ����֮ǰ�ĺ�ʱ����λΪ�룬����time_pretransfer�ͷ�������������ʱ�䣻
   size_download ���� ���ص����ֽ�����
   size_upload ���� �ϴ������ֽ�����
   size_request ���� ����http��������ֽ�����
   speed_download ���� curl�ɹ����ص�ƽ�������ٶȣ�
   speed_upload ���� curl�ɹ��ϴ���ƽ���ϴ��ٶȣ�
   ������curl -o page.html -s -w %{time_connect}:%{time_starttransfer}:%{time_total} http://curl.haxx.se/������-s��ʾ����ģʽ������ȥ���� ״̬��Ϣ��
 
   10��--connect-timeout <seconds> �� -m/--max-time <seconds>
   ǰ�߱�ʾ��������ӵ����ʱ����λΪ�룻���߱�ʾ������������������ʱ����λΪ�룬���ѡ����ڿ���һ�������������ʱ���ǳ����á�
 
   11��--limit-rate <speed> �� -Y/--speed-limit <speed> �� -y/--speed-time <time>
   --limit-rate <speed>ָ���������ݴ����ʣ���λΪbytes/s��Ҳ������'k'��'K'��ʾkb/s��'m'��'M'��ʾmb/s��'g'�� 'G'��ʾgb/s��������speedΪƽ�������ʣ���ʱ���ֵ���ܻᳬ����ֵ��
-Y/--speed-limit <speed>ָ����С�����ʣ���λΪbytes/s�����С��speedֵ��������ֹ�����ʱ-yѡ��û�б����ã�Ĭ��timeΪ 30��-y/--speed-time <time>ָ��-Yѡ�����Чʱ��Σ����-Yѡ��û�б����ã�Ĭ��Ϊ1��

    12��--max-filesize <bytes>
   ��ѡ��ָ����Ҫ���ص��ļ�����󳤶ȣ��������bytesֵ�������ز�����ʼ��curl�����˳���63��
 
   13��--retry <num> �� --retry-delay <seconds> �� --retry-max-time <seconds>
   ����������г��ִ����糬ʱ��FTP 5xx���������HTTP 5xx�����룬curl����а������ý������ԣ��⼸��ѡ��������йء�--retry <num>�������Դ�����--retry-delay <seconds>�����������Եļ��ʱ�䣬--retry-max-time <seconds>�����������Լ�����ʱ�䡣Ĭ������£�curl���������ԣ�������ԣ���һ�μ��1�룬֮��ÿ�ζ������һ�ε�2��ʱ �䣬ֱ�����ʱ��ﵽ10���ӣ�֮������Զ�������10���Ӽ���������3��ѡ���ֵ���������ã���ִ������ֵ��
 
   14��-T/--upload-file <file>
   ��ѡ�����ϴ��������http�������ϴ�һ���ļ���curl -T D:\new_divide.mp3 http://www.uploadserver.com/path/�� ��һ��ftp�������ϴ��ļ���curl -T D:\new_divide.mp3 -u user:password ftp://upload_site:port/path/��


   curl������һ��"EXIT CODES"��������ʶ�ڳ��ִ���ʱ�������Ϣ��Ŀǰ��Χ��1-83��������Ϣ���Բ���curl���Դ����ĵ�����Щ�˳���������Ƿ�������ԭ���кܴ�� ����
 
 
   ���ϼ򵥽�����һ������curl�����й��߽���һЩ�򵥵�http��ftpӦ�ã���ҿ������Ŷ���һ�£�����������curl��ǿ���ܣ��кܶ���صĹ��� �������ǳ��򵥷��� 











 Linux��ʹ��curl

Curl��Linux��һ����ǿ���http�����й��ߣ��书��ʮ��ǿ��

1����ȡ��ҳ

$ curl linuxidc.com">http://www.linuxidc.com

2��������ҳ

$ curl http://www.linuxidc.com > page.html $ curl -o page.html http://www.linuxidc.com

3��ʹ�õ�proxy����������˿ڣ�-x

$ curl -x 123.45.67.89��1080 -o page.html http://www.linuxidc.com

4��ʹ��cookie����¼session��Ϣ

$ curl -x 123.45.67.89��1080 -o page.html -D cookie0001.txt http://www.linuxidc.com���option�� -D �ǰ�http��response�����cookie��Ϣ�浽һ���ر���ļ���ȥ����������ҳ�汻�浽page.html��ͬʱ��cookie��ϢҲ���浽��cookie0001.txt������5����ô����һ�η��ʵ�ʱ����μ���ʹ���ϴ����µ�cookie��Ϣ�أ�

ʹ��option�����ϴε�cookie��Ϣ׷�ӵ�http request����ȥ��-b

$ curl -x 123.45.67.89��1080 -o page1.html -D cookie0002.txt -b cookie0001.txt http://www.linuxidc.com

6���������Ϣ

$ curl -A "Mozilla/4.0 ��compatible�� MSIE 6.0�� Windows NT 5.0��" -x 123.45.67.89��1080 -o page.html -D cookie0001.txt http://www.linuxidc.com

7��referer

$ curl -A "Mozilla/4.0 ��compatible�� MSIE 6.0�� Windows NT 5.0��" -x 123.45.67.89��1080 -e "mail.linuxidc.com" -o page.html -D cookie0001.txt http://www.linuxidc.com�����Ϳ���ƭ�Է��ķ����������Ǵ�mail.linuxidc.com���ĳ�����ӹ�����

8�������ļ�

$ curl -o 1.jpg http://cgi2.tky.3web.ne.jp/~zzh/screen1.JPG $ curl -O http://cgi2.tky.3web.ne.jp/~zzh/screen1.JPG -O ���԰��շ������ϵ��ļ������Զ����ڱ���$ curl -O http://cgi2.tky.3web.ne.jp/~zzh/screen[1-10].JPG

9����������

$ curl -O http://cgi2.tky.3web.ne.jp/~{zzh��nick}/[001-201].JPG�������������أ�����~zzh/001.JPG ~zzh/002.JPG

����

~zzh/201.JPG ~nick/001.JPG ~nick/002.JPG

����

~nick/201.JPG

 

$�Զ����ļ���������

curl -o #2_#1.jpg http://cgi2.tky.3web.ne.jp/~{zzh��nick}/[001-201].JPG�������Զ�����������������ļ������ͱ����������ԭ���� ~zzh/001.JPG ��-> ���غ� 001-zzh.JPG ԭ���� ~nick/001.JPG ��-> ���غ� 001-nick.JPG

����һ���Ͳ����ļ�������

9���ϵ�����

$ curl -c -O http://cgi2.tky.3wb.ne.jp/~zzh/screen1.JPG�ֿ����أ�����ʹ�����option�Ϳ����ˣ� -r

����˵��

����������һ��http://cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 Ҫ���أ�����ʦ�ĵ绰���� ��D �����ǾͿ��������������$ curl -r 0-10240 -o "zhao.part1" http��/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 $ curl -r 10241-20480 -o "zhao.part1" http��/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 $ curl -r 20481-40960 -o "zhao.part1" http��/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 $ curl -r 40961- -o "zhao.part1" http��/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3�����Ϳ��Էֿ�����������������Ҫ�Լ�����Щ������ļ��ϲ������������UNIX��ƻ������ cat zhao.part* > zhao.MP3�Ϳ�������õ���Windows����copy /b ������ɣ��Ǻ����潲�Ķ���httpЭ������أ���ʵftpҲһ�������á��÷��

$ curl -u name��passwd ftp://ip��port/path/file

���ߴ����Ϥ��

$ curl ftp://name��passwd@ip��port/path/file

10���ϴ���option��-T

����������ftp��һ���ļ���

$ curl -T localfile -u name��passwd ftp://upload_site��port/path/

��Ȼ����http�������ϴ��ļ�Ҳ���Ա���$ curl -T localfile http://cgi2.tky.3web.ne.jp/~zzh/abc.cgiע�⣬��ʱ��ʹ�õ�Э����HTTP��PUT method�ղ�˵��PUT���ٺ٣���Ȼ���Ϸ�����������������methos��û���أ� GET��POST��������Ŷ��

11��POST��GETģʽ

$ curl http://www.linuxidc.com/login.cgi��user=nickwolfe

��POSTģʽ��option����-d

���磬$ curl -d "user=nickwolfe http://www.linuxidc.com/login.cgi

һ����Ҫע����ǣ�POSTģʽ�µ��ļ��ϵ��ļ��ϴ�������

����һ��HTTP��������Ҫ��curl����ģ�⣬�͸����������﷨��$ curl -F upload=@localfile -F nick=go http://cgi2.tky.3web.ne.jp/~zzh/up_file.cgi

https����֤��

$ curl -E localcert.pem https://remote_server�ٱ��磬�㻹������curlͨ��dictЭ��ȥ���ֵ�$ curl dict://dict.org/d��computer

---------------------------

 

 

 

Curl��Linux��һ����ǿ���http�����й��ߣ��书��ʮ��ǿ��

1) ������˵���ȴ����￪ʼ�ɣ�

$ curl http://www.linuxidc.com

�س�֮��www.linuxidc.com ��html��ϡ�ﻩ������ʾ����Ļ����    ~

2) �ţ�Ҫ��Ѷ�����ҳ����������ǲ���Ҫ�����أ�

$ curl http://www.linuxidc.com > page.html

��Ȼ���ԣ���������ô�鷳�ģ�

��curl������option�ͺã�����http�Ľ���������option: -o

$ curl -o page.html http://www.linuxidc.com

��������Ϳ��Կ�����Ļ�ϳ���һ������ҳ�����ָʾ���Ƚ�չ��100%����Ȼ�� OK��

3) ʲôʲô�������ʲ������϶������proxyû���趨�ˡ�

ʹ��curl��ʱ�������option����ָ��http������ʹ�õ�proxy����������˿ڣ� -x

$ curl -x 123.45.67.89:1080 -o page.html http://www.linuxidc.com

4) ������Щ��վ��ʱ��Ƚ����ᣬ��ʹ��cookie����¼session��Ϣ��

��IE/NN���������������Ȼ�������״���cookie��Ϣ�������ǵ�curl�أ�.....

������ѧϰ���option: -D <�� ����ǰ�http��response�����cookie��Ϣ�浽һ���ر���ļ���ȥ

$ curl -x 123.45.67.89:1080 -o page.html -D cookie0001.txt http://www.linuxidc.com

��������ҳ�汻�浽page.html��ͬʱ��cookie��ϢҲ���浽��cookie0001.txt������

5����ô����һ�η��ʵ�ʱ����μ���ʹ���ϴ����µ�cookie��Ϣ�أ�Ҫ֪�����ܶ���վ���ǿ��������cookie��Ϣ�����ж����ǲ��ǲ�����ط������ǵ���վ�ġ�

�������ʹ�����option�����ϴε�cookie��Ϣ׷�ӵ�http request����ȥ�� -b

$ curl -x 123.45.67.89:1080 -o page1.html -D cookie0002.txt -b cookie0001.txt http://www.linuxidc.com

���������ǾͿ��Լ���ģ�����е�IE������ȥ������ҳ�ˣ�

6����΢�ȵ�    ~�Һ�������ʲô��    ~

���ˣ����������Ϣ

��Щ�������վ��Ҫ����ʹ��ĳЩ�ض��������ȥ�������ǣ���ʱ������ֵ��ǣ���Ҫʹ��ĳЩ�ض��İ汾     NND��������ʱ��Ϊ����ȥ����Щ�����������أ���

����curl�������ṩ��һ�����õ�option����������������ָ���Լ���η��������Ƶ��Լ����������Ϣ�� -A

$ curl -A "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)" -x 123.45.67.89:1080 -o page.html -D cookie0001.txt http://www.linuxidc.com

�������������˽ӵ����ʵ�Ҫ�󣬻���Ϊ����һ��������Windows 2000�ϵ� IE6.0���ٺٺ٣���ʵҲ�����õ���ƻ�����أ�

��"Mozilla/4.73 [en] (X11; U; Linux 2.2; 15 i686"����Ը��߶Է�����һ̨ PC�����ŵ�Linux���õ���Netscape 4.73���ǺǺ�

7������һ���������˳��õ����Ʒ��������Ǽ��http���ʵ�referer���������ȷ�����ҳ���ٷ���������ָ��������ҳ����ڶ��η��ʵ� referer��ַ���ǵ�һ�η��ʳɹ����ҳ���ַ����������������ֻҪ���ֶ�����ҳ��ĳ�η��ʵ�referer��ַ������ҳ�ĵ�ַ���Ϳ��Զ϶����Ǹ�������    ~

�������� ~�Ҿ���Ҫ����    ~����

�Һ�curl�������ṩ���趨referer��option�� -e

$ curl -A "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)" -x 123.45.67.89:1080 -e "mail.linuxidc.com" -o page.html -D cookie0001.txt http://www.linuxidc.com

�������Ϳ���ƭ�Է��ķ����������Ǵ�mail.linuxidc.com���ĳ�����ӹ������ˣ��ǺǺ�

8��д��д�ŷ���©��ʲô��Ҫ�Ķ����ˣ�����- ����curl �����ļ�

�ղŽ����ˣ�����ҳ�浽һ���ļ������ʹ�� -o �������ļ�Ҳ��һ�������磬

$ curl -o 1.jpg http://cgi2.tky.3web.ne.jp/~zzh/screen1.JPG

����̴��һ���µ�option�� -O ��д��O����ô�ã�

$ curl -O http://cgi2.tky.3web.ne.jp/~zzh/screen1.JPG

�������Ϳ��԰��շ������ϵ��ļ������Զ����ڱ����ˣ�

����һ�������õġ�

���screen1.JPG���⻹��screen2.JPG��screen3.JPG��....��screen10.JPG��Ҫ���أ��Ѳ��ɻ�Ҫ������дһ��script�������Щ������

���ɣ�

��curl���棬��ôд�Ϳ����ˣ�

$ curl -O http://cgi2.tky.3web.ne.jp/~zzh/screen[1-10].JPG

�ǺǺǣ������ɣ��� ~

9�����������Ǽ����������أ�

$ curl -O http://cgi2.tky.3web.ne.jp/~{zzh,nick}/[001-201].JPG

�������������أ�����

~zzh/001.JPG

~zzh/002.JPG

...

~zzh/201.JPG

~nick/001.JPG

~nick/002.JPG

...

~nick/201.JPG

��������˰ɣ�������

�ף����˵�̫���ˡ�

����zzh/nick�µ��ļ�������001��002...��201�������������ļ�����������İ�ǰ����ļ��������ǵ��� ~

û��ϵ�����ǻ��и��ݵģ�

$ curl -o #2_#1.jpg http://cgi2.tky.3web.ne.jp/~{zzh,nick}/[001-201].JPG

������.....�Զ����ļ��������أ� ����ͷ���Ǻǣ�

�������Զ�����������������ļ������ͱ����������ԭ���� ~zzh/001.JPG ��-> ���غ� 001-zzh.JPG ԭ���� ~nick/001.JPG ��-> ���غ� 001-nick.JPG

����һ�����Ͳ����ļ����������Ǻ�

9������������

����ƽʱ��windowsƽ̨�ϣ�flashget�����Ĺ��߿��԰����Ƿֿ鲢�����أ������Զ���������curl����Щ����Ҳ�����˭���ٺ�

������������screen1.JPG�У�ͻȻ�����ˣ����ǾͿ���������ʼ����

$ curl -c -O http://cgi2.tky.3wb.ne.jp/~zzh/screen1.JPG

��Ȼ���㲻Ҫ�ø�flashget������һ����ļ�����Ū��    �����������İ���ļ��ɲ�һ������Ŷ ~

�ֿ����أ�����ʹ�����option�Ϳ����ˣ� -r

����˵��

����������һ��http://cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 Ҫ���أ�����ʦ�ĵ绰���� :D �����ǾͿ��������������

$ curl -r 0-10240 -o "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 &\

$ curl -r 10241-20480 -o "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 &\

$ curl -r 20481-40960 -o "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3 &\

$ curl -r 40961- -o "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.MP3

�����Ϳ��Էֿ�����������������Ҫ�Լ�����Щ������ļ��ϲ������������UNIX��ƻ������ cat zhao.part* > zhao.MP3�Ϳ�������õ���Windows����copy /b ������ɣ��Ǻ�

���潲�Ķ���httpЭ������أ���ʵftpҲһ�������á��÷��

$ curl -u name:passwd ftp://ip:port/path/file

���ߴ����Ϥ��

$ curl ftp://name:passwd@ip:port/path/file

10) ˵�������أ���������Ȼ�ý��ϴ����ϴ���option�� -T

����������ftp��һ���ļ���

$ curl -T localfile -u name:passwd ftp://upload_site:port/path/

��Ȼ����http�������ϴ��ļ�Ҳ���Ա���

$ curl -T localfile http://cgi2.tky.3web.ne.jp/~zzh/abc.cgi

ע�⣬��ʱ��ʹ�õ�Э����HTTP��PUT method

�ղ�˵��PUT���ٺ٣���Ȼ���Ϸ�����������������methos��û���أ� GET��POST��������Ŷ��

http�ύһ�������Ƚϳ��õ���POSTģʽ��GETģʽ

GETģʽʲôoption�����ã�ֻ��Ҫ�ѱ���д��url����Ϳ����˱��磺

$ curl http://www.linuxidc.com/login.cgi?user=nickwolfe&password=12345

��POSTģʽ��option���� -d

���磬

$ curl -d "user=nickwolfe&password=12345" http://www.linuxidc.com/login.cgi

���൱�������վ�㷢��һ�ε�½����    ~

���׸���GETģʽ����POSTģʽ��Ҫ������������ĳ����趨��

һ����Ҫע����ǣ�POSTģʽ�µ��ļ��ϵ��ļ��ϴ�������

<form method="POST" enctype="multipar/form-data" action="http://cgi2.tky.3web.ne.jp/~zzh/up_file.cgi">

<input type=file name=upload>

<input type=submit name=nick value="go">

</form>

����һ��HTTP��������Ҫ��curl����ģ�⣬�͸����������﷨��

$ curl -F upload=@localfile -F nick=go http://cgi2.tky.3web.ne.jp/~zzh/up_file.cgi

�������½�����ô�࣬��ʵcurl���кܶ�ܶ༼�ɺ��÷����� https��ʱ��ʹ�ñ���֤�飬�Ϳ�������

$ curl -E localcert.pem https://remote_server

�ٱ��磬�㻹������curlͨ��dictЭ��ȥ���ֵ�    ~

$ curl dict://dict.org/d:computer
------------------------------------------------------------------

linux curl��һ������URL�������������¹������ļ����乤�ߡ���֧���ļ����ϴ������أ��������ۺϴ��乤�ߣ�������ͳ��ϰ�߳�urlΪ���ع��ߡ�

����һ��curl����������кö���û���ù���Ҳ��֪������ĶԲ��ԣ��������ĵط�������ָ����

����-a/--append �ϴ��ļ�ʱ�����ӵ�Ŀ���ļ�

����-A/--user-agent <string>  �����û������͸�������

����- anyauth   ����ʹ�á��κΡ������֤����

����-b/--cookie <name=string/file> cookie�ַ������ļ���ȡλ��

����- basic ʹ��HTTP������֤

����-B/--use-ascii ʹ��ASCII /�ı�����

����-c/--cookie-jar <file> �����������cookieд�뵽����ļ���

����-C/--continue-at <offset>  �ϵ���ת

����-d/--data <data>   HTTP POST��ʽ��������

����--data-ascii <data>  ��ascii�ķ�ʽpost����

����--data-binary <data> �Զ����Ƶķ�ʽpost����

����--negotiate     ʹ��HTTP�����֤

����--digest        ʹ�����������֤

����--disable-eprt  ��ֹʹ��EPRT��LPRT

����--disable-epsv  ��ֹʹ��EPSV

����-D/--dump-header <file> ��header��Ϣд�뵽���ļ���

����--egd-file <file> Ϊ�������(SSL)����EGD socket·��

����--tcp-nodelay   ʹ��TCP_NODELAYѡ��

����-e/--referer ��Դ��ַ

����-E/--cert <cert[:passwd]> �ͻ���֤���ļ������� (SSL)

����--cert-type <type> ֤���ļ����� (DER/PEM/ENG) (SSL)

����--key <key>     ˽Կ�ļ��� (SSL)

����--key-type <type> ˽Կ�ļ����� (DER/PEM/ENG) (SSL)

����--pass  <pass>  ˽Կ���� (SSL)

����--engine <eng>  ��������ʹ�� (SSL). "--engine list" for list

����--cacert <file> CA֤�� (SSL)

����--capath <directory> CAĿ¼ (made using c_rehash) to verify peer against (SSL)

����--ciphers <list>  SSL����

����--compressed    Ҫ�󷵻���ѹ�������� (using deflate or gzip)

����--connect-timeout <seconds> �����������ʱ��

����--create-dirs   ��������Ŀ¼��Ŀ¼��νṹ

����--crlf          �ϴ��ǰ�LFת���CRLF

����-f/--fail          ����ʧ��ʱ����ʾhttp����

����--ftp-create-dirs ���Զ��Ŀ¼�����ڣ�����Զ��Ŀ¼

����--ftp-method [multicwd/nocwd/singlecwd] ����CWD��ʹ��

����--ftp-pasv      ʹ�� PASV/EPSV ����˿�

����--ftp-skip-pasv-ip ʹ��PASV��ʱ��,���Ը�IP��ַ

����--ftp-ssl       ������ SSL/TLS ������ftp���ݴ���

����--ftp-ssl-reqd  Ҫ���� SSL/TLS ������ftp���ݴ���

����-F/--form <name=content> ģ��http���ύ����

����-form-string <name=string> ģ��http���ύ����

����-g/--globoff ������ַ���кͷ�Χʹ��{}��[]

����-G/--get ��get�ķ�ʽ����������

����-h/--help ����

����-H/--header <line>�Զ���ͷ��Ϣ���ݸ�������

����--ignore-content-length  ���Ե�HTTPͷ��Ϣ�ĳ���

����-i/--include ���ʱ����protocolͷ��Ϣ

����-I/--head  ֻ��ʾ�ĵ���Ϣ

�������ļ��ж�ȡ-j/--junk-session-cookies���ԻỰCookie

����- ����<interface>ָ������ӿ�/��ַʹ��

����- krb4 <����>������ָ���İ�ȫ����krb4

����-j/--junk-session-cookies ��ȡ�ļ�������session cookie

����--interface <interface> ʹ��ָ������ӿ�/��ַ

����--krb4 <level>  ʹ��ָ����ȫ�����krb4

����-k/--insecure ����ʹ��֤�鵽SSLվ��

����-K/--config  ָ���������ļ���ȡ

����-l/--list-only �г�ftpĿ¼�µ��ļ�����

����--limit-rate <rate> ���ô����ٶ�

����--local-port<NUM> ǿ��ʹ�ñ��ض˿ں�

����-m/--max-time <seconds> ���������ʱ��

����--max-redirs <num> ��������ȡ��Ŀ¼��

����--max-filesize <bytes> ����������ص��ļ�����

����-M/--manual  ��ʾȫ�ֶ�

����-n/--netrc ��netrc�ļ��ж�ȡ�û���������

����--netrc-optional ʹ�� .netrc ���� URL������-n

����--ntlm          ʹ�� HTTP NTLM �����֤

����-N/--no-buffer ���û������

����-o/--output �����д�����ļ���

����-O/--remote-name �����д�����ļ��У�����Զ���ļ����ļ���

����-p/--proxytunnel   ʹ��HTTP����

����--proxy-anyauth ѡ����һ���������֤����

����--proxy-basic   �ڴ�����ʹ�û��������֤

����--proxy-digest  �ڴ�����ʹ�����������֤

����--proxy-ntlm    �ڴ�����ʹ��ntlm�����֤

����-P/--ftp-port <address> ʹ�ö˿ڵ�ַ��������ʹ��PASV

����-Q/--quote <cmd>�ļ�����ǰ���������������

����-r/--range <range>��������HTTP/1.1��FTP�������ֽڷ�Χ

����--range-file ��ȡ��SSL��������ļ�

����-R/--remote-time   �ڱ��������ļ�ʱ������Զ���ļ�ʱ��

����--retry <num>   �����������ʱ�����ԵĴ���

����--retry-delay <seconds>  �����������ʱ���������Լ��ʱ��

����--retry-max-time <seconds> �����������ʱ�������������ʱ��

����-s/--silent����ģʽ��������κζ���

����-S/--show-error   ��ʾ����

����--socks4 <host[:port]> ��socks4������������Ͷ˿�

����--socks5 <host[:port]> ��socks5������������Ͷ˿�

����--stderr <file>

��-t/--telnet-option <OPT=val> Telnetѡ������

����--trace <file>  ��ָ���ļ�����debug

����--trace-ascii <file> Like --���ٵ�û��hex���

����--trace-time    ����/��ϸ���ʱ�����ʱ���

����-T/--upload-file <file> �ϴ��ļ�

����--url <URL>     Spet URL to work with

����-u/--user <user[:password]>���÷��������û�������

����-U/--proxy-user <user[:password]>���ô����û���������

����-v/--verbose

����-V/--version ��ʾ�汾��Ϣ

����-w/--write-out [format]ʲô�����ɺ�

����-x/--proxy <host[:port]>�ڸ����Ķ˿���ʹ��HTTP����

����-X/--request <command>ָ��ʲô����

����-y/--speed-time ����������Ҫ��ʱ�䡣Ĭ��Ϊ30

����-Y/--speed-limit ֹͣ�����ٶȵ����ƣ��ٶ�ʱ��'��

����-z/--time-cond  ����ʱ������

����-0/--http1.0  ʹ��HTTP 1.0

����-1/--tlsv1  ʹ��TLSv1��SSL��

����-2/--sslv2 ʹ��SSLv2�ģ�SSL��

����-3/--sslv3         ʹ�õ�SSLv3��SSL��

����--3p-quote      like -Q for the source URL for 3rd party transfer

����--3p-url        ʹ��url�����е���������

����--3p-user       ʹ���û��������룬���е���������

����-4/--ipv4   ʹ��IP4

����-6/--ipv6   ʹ��IP6

����-#/--progress-bar �ý�������ʾ��ǰ�Ĵ���״̬

����-a/--append �ϴ��ļ�ʱ�����ӵ�Ŀ���ļ�

����-A/--user-agent <string>  �����û������͸�������

����- anyauth   ����ʹ�á��κΡ������֤����

����-b/--cookie <name=string/file> cookie�ַ������ļ���ȡλ��

����- basic ʹ��HTTP������֤

����-B/--use-ascii ʹ��ASCII /�ı�����

����-c/--cookie-jar <file> �����������cookieд�뵽����ļ���

����-C/--continue-at <offset>  �ϵ���ת

����-d/--data <data>   HTTP POST��ʽ��������

����--data-ascii <data>  ��ascii�ķ�ʽpost����

����--data-binary <data> �Զ����Ƶķ�ʽpost����

����--negotiate     ʹ��HTTP�����֤

����--digest        ʹ�����������֤

����--disable-eprt  ��ֹʹ��EPRT��LPRT

����--disable-epsv  ��ֹʹ��EPSV

����-D/--dump-header <file> ��header��Ϣд�뵽���ļ���

����--egd-file <file> Ϊ�������(SSL)����EGD socket·��

����--tcp-nodelay   ʹ��TCP_NODELAYѡ��

����-e/--referer ��Դ��ַ

����-E/--cert <cert[:passwd]> �ͻ���֤���ļ������� (SSL)

����--cert-type <type> ֤���ļ����� (DER/PEM/ENG) (SSL)

����--key <key>     ˽Կ�ļ��� (SSL)

����--key-type <type> ˽Կ�ļ����� (DER/PEM/ENG) (SSL)

����--pass  <pass>  ˽Կ���� (SSL)

����--engine <eng>  ��������ʹ�� (SSL). "--engine list" for list

����--cacert <file> CA֤�� (SSL)

����--capath <directory> CAĿ¼ (made using c_rehash) to verify peer against (SSL)

����--ciphers <list>  SSL����

����--compressed    Ҫ�󷵻���ѹ�������� (using deflate or gzip)

����--connect-timeout <seconds> �����������ʱ��

����--create-dirs   ��������Ŀ¼��Ŀ¼��νṹ

����--crlf          �ϴ��ǰ�LFת���CRLF

����-f/--fail          ����ʧ��ʱ����ʾhttp����

����--ftp-create-dirs ���Զ��Ŀ¼�����ڣ�����Զ��Ŀ¼

����--ftp-method [multicwd/nocwd/singlecwd] ����CWD��ʹ��

����--ftp-pasv      ʹ�� PASV/EPSV ����˿�

����--ftp-skip-pasv-ip ʹ��PASV��ʱ��,���Ը�IP��ַ

����--ftp-ssl       ������ SSL/TLS ������ftp���ݴ���

����--ftp-ssl-reqd  Ҫ���� SSL/TLS ������ftp���ݴ���

����-F/--form <name=content> ģ��http���ύ����

����-form-string <name=string> ģ��http���ύ����

����-g/--globoff ������ַ���кͷ�Χʹ��{}��[]

����-G/--get ��get�ķ�ʽ����������

����-h/--help ����

����-H/--header <line>�Զ���ͷ��Ϣ���ݸ�������

����--ignore-content-length  ���Ե�HTTPͷ��Ϣ�ĳ���

����-i/--include ���ʱ����protocolͷ��Ϣ

����-I/--head  ֻ��ʾ�ĵ���Ϣ

�������ļ��ж�ȡ-j/--junk-session-cookies���ԻỰCookie

����- ����<interface>ָ������ӿ�/��ַʹ��

����- krb4 <����>������ָ���İ�ȫ����krb4

����-j/--junk-session-cookies ��ȡ�ļ�������session cookie

����--interface <interface> ʹ��ָ������ӿ�/��ַ

����--krb4 <level>  ʹ��ָ����ȫ�����krb4

����-k/--insecure ����ʹ��֤�鵽SSLվ��

����-K/--config  ָ���������ļ���ȡ

����-l/--list-only �г�ftpĿ¼�µ��ļ�����

����--limit-rate <rate> ���ô����ٶ�

����--local-port<NUM> ǿ��ʹ�ñ��ض˿ں�

����-m/--max-time <seconds> ���������ʱ��

����--max-redirs <num> ��������ȡ��Ŀ¼��

����--max-filesize <bytes> ����������ص��ļ�����

-M/--manual  ��ʾȫ�ֶ�

����-n/--netrc ��netrc�ļ��ж�ȡ�û���������

����--netrc-optional ʹ�� .netrc ���� URL������-n

����--ntlm          ʹ�� HTTP NTLM �����֤

����-N/--no-buffer ���û������

����-o/--output �����д�����ļ���

����-O/--remote-name �����д�����ļ��У�����Զ���ļ����ļ���

����-p/--proxytunnel   ʹ��HTTP����

����--proxy-anyauth ѡ����һ���������֤����

����--proxy-basic   �ڴ�����ʹ�û��������֤

����--proxy-digest  �ڴ�����ʹ�����������֤

����--proxy-ntlm    �ڴ�����ʹ��ntlm�����֤

����-P/--ftp-port <address> ʹ�ö˿ڵ�ַ��������ʹ��PASV

����-Q/--quote <cmd>�ļ�����ǰ���������������

����-r/--range <range>��������HTTP/1.1��FTP�������ֽڷ�Χ

����--range-file ��ȡ��SSL��������ļ�

����-R/--remote-time   �ڱ��������ļ�ʱ������Զ���ļ�ʱ��

����--retry <num>   �����������ʱ�����ԵĴ���

����--retry-delay <seconds>  �����������ʱ���������Լ��ʱ��

����--retry-max-time <seconds> �����������ʱ�������������ʱ��

����-s/--silent����ģʽ��������κζ���

����-S/--show-error   ��ʾ����

����--socks4 <host[:port]> ��socks4������������Ͷ˿�

����--socks5 <host[:port]> ��socks5������������Ͷ˿�

����--stderr <file>

����-t/--telnet-option <OPT=val> Telnetѡ������

����--trace <file>  ��ָ���ļ�����debug

����--trace-ascii <file> Like --���ٵ�û��hex���

����--trace-time    ����/��ϸ���ʱ�����ʱ���

����-T/--upload-file <file> �ϴ��ļ�

����--url <URL>     Spet URL to work with

����-u/--user <user[:password]>���÷��������û�������

����-U/--proxy-user <user[:password]>���ô����û���������

����-v/--verbose

����-V/--version ��ʾ�汾��Ϣ

����-w/--write-out [format]ʲô�����ɺ�

����-x/--proxy <host[:port]>�ڸ����Ķ˿���ʹ��HTTP����

����-X/--request <command>ָ��ʲô����

����-y/--speed-time ����������Ҫ��ʱ�䡣Ĭ��Ϊ30

����-Y/--speed-limit ֹͣ�����ٶȵ����ƣ��ٶ�ʱ��'��

����-z/--time-cond  ����ʱ������

����-0/--http1.0  ʹ��HTTP 1.0

����-1/--tlsv1  ʹ��TLSv1��SSL��

����-2/--sslv2 ʹ��SSLv2�ģ�SSL��

����-3/--sslv3         ʹ�õ�SSLv3��SSL��

����--3p-quote      like -Q for the source URL for 3rd party transfer

����--3p-url        ʹ��url�����е���������

����--3p-user       ʹ���û��������룬���е���������

����-4/--ipv4   ʹ��IP4

����-6/--ipv6   ʹ��IP6

����-#/--progress-bar �ý�������ʾ��ǰ�Ĵ���״̬

������������curlʵ��

����1��ץȡҳ�����ݵ�һ���ļ���

����[root@krlcgcms01 mytest]# curl -o home.html  http://blog.51yip.com

����[root@krlcgcms01 mytest]# curl -o home.html  http://blog.51yip.com

����2����-O����д�ģ��������urlҪ���嵽ĳ���ļ�����Ȼץ�����������ǻ�������������ץȡ����

����[root@krlcgcms01 mytest]# curl -O

����[root@krlcgcms01 mytest]# curl -O

����3��ģ�����Ϣ��ģ���¼������cookie��Ϣ

����[root@krlcgcms01 mytest]# curl -c ./cookie_c.txt -F log=aaaa -F pwd=****** http://blog.51yip.com/wp-login.php

����[root@krlcgcms01 mytest]# curl -c ./cookie_c.txt -F log=aaaa -F pwd=****** http://blog.51yip.com/wp-login.php

����4��ģ�����Ϣ��ģ���¼������ͷ��Ϣ

����[root@krlcgcms01 mytest]# curl -D ./cookie_D.txt -F log=aaaa -F pwd=****** http://blog.51yip.com/wp-login.php

����[root@krlcgcms01 mytest]# curl -D ./cookie_D.txt -F log=aaaa -F pwd=****** http://blog.51yip.com/wp-login.php

����-c(Сд)������cookie��-D�����cookie�ǲ�һ���ġ�

����5��ʹ��cookie�ļ�

����[root@krlcgcms01 mytest]# curl -b ./cookie_c.txt  http://blog.51yip.com/wp-admin

����[root@krlcgcms01 mytest]# curl -b ./cookie_c.txt  http://blog.51yip.com/wp-admin

����6���ϵ�������-C(��д��)

����[root@krlcgcms01 mytest]# curl -C -O

����7����������,����õ�¼ҳ����ԣ���Ϊ�㴫ֵ��ȥ��curl��ץ���ݣ�����Կ����㴫ֵ��û�гɹ�

����[root@krlcgcms01 mytest]# curl -d log=aaaa  http://blog.51yip.com/wp-login.php

����[root@krlcgcms01 mytest]# curl -d log=aaaa  http://blog.51yip.com/wp-login.php

����8����ʾץȡ��������������ӣ�������ı����ˡ�

����[root@krlcgcms01 mytest]# curl -f http://blog.51yip.com/asdf

����curl: (22) The requested URL returned error: 404

����[root@krlcgcms01 mytest]# curl http://blog.51yip.com/asdf

����<HTML><HEAD><TITLE>404,not found</TITLE>

����������������������������

����[root@krlcgcms01 mytest]# curl -f http://blog.51yip.com/asdf

����curl: (22) The requested URL returned error: 404

����[root@krlcgcms01 mytest]# curl http://blog.51yip.com/asdf

����<HTML><HEAD><TITLE>404,not found</TITLE>

����������������������������

����9��α����Դ��ַ���е���վ���жϣ�������Դ��ַ��

����[root@krlcgcms01 mytest]# curl -e http://localhost http://blog.51yip.com/wp-login.php

����[root@krlcgcms01 mytest]# curl -e http://localhost http://blog.51yip.com/wp-login.php

����10�������Ǿ�����curlȥ���˼Ҷ�����ʱ���˼һ�����IP�����ε���,���ʱ��,���ǿ����ô���

����[root@krlcgcms01 mytest]# curl -x 24.10.28.84:32779 -o home.html http://blog.51yip.com

����[root@krlcgcms01 mytest]# curl -x 24.10.28.84:32779 -o home.html http://blog.51yip.com

 

 11���Ƚϴ�Ķ��������ǿ��Էֶ�����

����[root@krlcgcms01 mytest]# curl -r 0-100 -o img.part1 http://blog.51yip.com/wp-

����content/uploads/2010/09/compare_varnish.jpg

����% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

����Dload  Upload   Total   Spent    Left  Speed

����100   101  100   101    0     0    105      0 --:--:-- --:--:-- --:--:--     0

����[root@krlcgcms01 mytest]# curl -r 100-200 -o img.part2 http://blog.51yip.com/wp-

����content/uploads/2010/09/compare_varnish.jpg

����% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

����Dload  Upload   Total   Spent    Left  Speed

����100   101  100   101    0     0     57      0  0:00:01  0:00:01 --:--:--     0

����[root@krlcgcms01 mytest]# curl -r 200- -o img.part3 http://blog.51yip.com/wp-

����content/uploads/2010/09/compare_varnish.jpg

����% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

����Dload  Upload   Total   Spent    Left  Speed

����100  104k  100  104k    0     0  52793      0  0:00:02  0:00:02 --:--:-- 88961

����[root@krlcgcms01 mytest]# ls |grep part | xargs du -sh

����4.0K    one.part1

����112K    three.part3

����4.0K    two.part2

����[root@krlcgcms01 mytest]# curl -r 0-100 -o img.part1 http://blog.51yip.com/wp-

����content/uploads/2010/09/compare_varnish.jpg

����% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

����Dload  Upload   Total   Spent    Left  Speed

����100   101  100   101    0     0    105      0 --:--:-- --:--:-- --:--:--     0

����[root@krlcgcms01 mytest]# curl -r 100-200 -o img.part2 http://blog.51yip.com/wp-

����content/uploads/2010/09/compare_varnish.jpg

����% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

����Dload  Upload   Total   Spent    Left  Speed

����100   101  100   101    0     0     57      0  0:00:01  0:00:01 --:--:--     0

����[root@krlcgcms01 mytest]# curl -r 200- -o img.part3 http://blog.51yip.com/wp-

����content/uploads/2010/09/compare_varnish.jpg

����% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

����Dload  Upload   Total   Spent    Left  Speed

����100  104k  100  104k    0     0  52793      0  0:00:02  0:00:02 --:--:-- 88961

����[root@krlcgcms01 mytest]# ls |grep part | xargs du -sh

����4.0K    one.part1

����112K    three.part3

����4.0K    two.part2

�����õ�ʱ�򣬰�����catһ�¾�OK��,cat img.part* >img.jpg

����12��������ʾ���ؽ�����Ϣ

����[root@krlcgcms01 mytest]# curl -s -o aaa.jpg 

����13����ʾ���ؽ�����

����[root@krlcgcms01 mytest]# curl -# -O 

����######################################################################## 100.0%

����14,ͨ��ftp�����ļ�

����[zhangy@BlackGhost ~]$ curl -u �û���:���� -O http://blog.51yip.com/demo/curtain/bbstudy_files/style.css

����% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

����Dload  Upload   Total   Spent    Left  Speed

����101  1934  101  1934    0     0   3184      0 --:--:-- --:--:-- --:--:--  7136

����[zhangy@BlackGhost ~]$ curl -u �û���:���� -O http://blog.51yip.com/demo/curtain/bbstudy_files/style.css

����% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

����Dload  Upload   Total   Spent    Left  Speed

����101  1934  101  1934    0     0   3184      0 --:--:-- --:--:-- --:--:--  7136

��������������ķ�ʽ

����[zhangy@BlackGhost ~]$ curl -O ftp://�û���:����@ip:port/demo/curtain/bbstudy_files/style.css

����[zhangy@BlackGhost ~]$ curl -O ftp://�û���:����@ip:port/demo/curtain/bbstudy_files/style.css

����15��ͨ��ftp�ϴ�

����[zhangy@BlackGhost ~]$ curl -T test.sql ftp://�û���:����@ip:port/demo/curtain/bbstudy_files/

����[zhangy@BlackGhost ~]$ curl -T test.sql ftp://�û���:����@ip:port/demo/curtain/bbstudy_files/

 

ժ�ԣ�

http://linux.chinaitlab.com/command/830656_4.html

http://www.linuxidc.com/Linux/2008-01/10891p2.htm

http://os.51cto.com/art/200909/153386_1.htm



