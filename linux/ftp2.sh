

ftp -v -n 192.168.1.104 << EOF
user  ftpbx  @**\&\$*#()AdminWebTwo654489
binary
hash
cd /ftp/setup/`date '+%Y%m%d'`
prompt off
mget  *.zip
bye
EOF
EOF