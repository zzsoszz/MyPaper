now=$(date +%Y%m%d)
echo ${now}
sqlplus -silent ZXDBM_UMAP/zxin_smap@zxin << EOF
set feedback off
set trimspool on
set linesize 9999
set pagesize 0
set newpage 1
set heading off
set term off
spool  ${now}.txt
SELECT
APPINDEX
||'|'||APPID
||'|'||APID
||'|'||APPIDNAME
||'|'||APPDESC
||'|'||SESSIONID
||'|'||SUBMITTIME
||'|'||EDITTIME
||'|'||REGISTERTIME
||'|'||SERVICECAPABILITYTYPE
||'|'||SERVICECAPABILITYS
||'|'||STATUS
||'|'||APPSTATUS
||'|'||APPPRICE
||'|'||TEXT
||'|'||FLAG
||'|'||APPFEETYPE
||'|'||APPPARAM1
||'|'||APPPARAM2
||'|'||APPPARAM3
||'|'||APPPARAM4
||'|'||APPPARAM5
||'|'||APPPARAM6
||'|'||APPPARAM7
||'|'||APPPARAM8
||'|'||APPPICURL
||'|'||APPRETURL
||'|'||APPTYPE
||'|'||APPPREVIEWURLS
FROM mcp_application;
EXIT;
EOF;