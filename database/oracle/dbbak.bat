echo "开始备份数据库" >> d:\dbbak_zx\exp%date:~9,1%.log
echo "-----------------------------------------------------" >> d:\dbbak_zx\exp%date:~9,1%.log
echo " " >> d:\dbbak_zx\exp%date:~9,1%.log


echo "..正在导出runto_crm用户" >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_crm/crm_runto@scwb file=d:\dbbak_zx\runto_crm%date:~9,1%.dmp log=d:\dbbak_zx\runto_crm%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出runto_crm用户完毕。" >> d:\dbbak_zx\exp%date:~9,1%.log


echo "..正在导出runto_west用户"  >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_west/west_runto@scwb file=d:\dbbak_zx\runto_west%date:~9,1%.dmp log=d:\dbbak_zx\runto_west%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出runto_alan用户完毕。" >> d:\dbbak_zx\exp%date:~9,1%.log

echo "..正在导出runto_byt用户"  >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_byt/byt_runto@scwb file=d:\dbbak_zx\runto_byt%date:~9,1%.dmp log=d:\dbbak_zx\runto_byt%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出runto_byt用户完毕。" >> d:\dbbak_zx\exp%date:~9,1%.log

echo "..正在导出runto_alan用户"  >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_alan/alan_runto@scwb file=d:\dbbak_zx\runto_alan%date:~9,1%.dmp log=d:\dbbak_zx\runto_alan%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出runto_alan用户完毕。" >> d:\dbbak_zx\exp%date:~9,1%.log

echo "..正在导出runto_cpic用户"  >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_cpic/cpic_runto@scwb file=d:\dbbak_zx\runto_cpic%date:~9,1%.dmp log=d:\dbbak_zx\runto_cpic%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出runto_cpic用户完毕。" >> d:\dbbak_zx\exp%date:~9,1%.log

echo "..正在导出runto_zhbx用户"  >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_zhbx/zhbx_runto@scwb file=d:\dbbak_zx\runto_zhbx%date:~9,1%.dmp log=d:\dbbak_zx\runto_zhbx%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出runto_zhbxh用户完毕。" >> d:\dbbak_zx\exp%date:~9,1%.log

echo "..正在导出runto_sdbk用户" >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_sdbk/sdbk_runto@scwb file=d:\dbbak_zx\runto_sdbk%date:~9,1%.dmp log=d:\dbbak_zx\runto_sdbk%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出runto_sdbk用户完毕。" >> d:\dbbak_zx\exp%date:~9,1%.log

echo "..正在导出runto_yaab用户" >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_yaab/yaab_runto@scwb file=d:\dbbak_zx\runto_yaab%date:~9,1%.dmp log=d:\dbbak_zx\runto_yaab%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出runto_yaab用户完毕。"  >> d:\dbbak_zx\exp%date:~9,1%.log


echo "..正在导出rtob用户" >> d:\dbbak_zx\exp%date:~9,1%.log
exp rtob/rtob@scwb file=d:\dbbak_zx\rtob%date:~9,1%.dmp log=d:\dbbak_zx\rtob%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出rtob用户完毕。" >> d:\dbbak_zx\exp%date:~9,1%.log


echo "..正在导出runto_cti用户" >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_cti/cti_runto@scwb file=d:\dbbak_zx\runto_cti%date:~9,1%.dmp log=d:\dbbak_zx\runto_cti%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出runto_cti用户完毕。" >> d:\dbbak_zx\exp%date:~9,1%.log


echo "..正在导出runto_mid2用户" >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_mid2/mid2_runto@scwb file=d:\dbbak_zx\runto_mid2%date:~9,1%.dmp log=d:\dbbak_zx\runto_mid2%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出runto_mid2用户完毕。" >> d:\dbbak_zx\exp%date:~9,1%.log


echo "..正在导出wfm2用户" >> d:\dbbak_zx\exp%date:~9,1%.log
exp wfm2/wfm2@scwb file=d:\dbbak_zx\wfm2%date:~9,1%.dmp log=d:\dbbak_zx\wfm2%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出wfm2用户完毕。"  >> d:\dbbak_zx\exp%date:~9,1%.log


echo " " >> d:\dbbak_zx\exp%date:~9,1%.log
echo "-----------------------------------------------------" >> d:\dbbak_zx\exp%date:~9,1%.log
echo "备份数据库完毕。" >> d:\dbbak_zx\exp%date:~9,1%.log
