ftp -v -n 172.16.16.106<< EOF
user zxin10 zxin10
binary
hash
cd /home/setup
dir
lcd /home/setup/qingtian
prompt
mget  udt-see1128.tar
bye
EOF















ÊµÀý2
ftp -v -n 192.168.1.104 << EOF
user  ftpbx  @**\&\$*#()AdminWebTwo654489
binary
hash
cd /ftp/setup/`date '+%Y%m%d'`
prompt off
mget  *.zip
bye
EOF
