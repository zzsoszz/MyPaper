echo "��ʼ�������ݿ�" >> d:\dbbak_zx\exp%date:~9,1%.log
echo "-----------------------------------------------------" >> d:\dbbak_zx\exp%date:~9,1%.log
echo " " >> d:\dbbak_zx\exp%date:~9,1%.log


echo "..���ڵ���runto_crm�û�" >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_crm/crm_runto@scwb file=d:\dbbak_zx\runto_crm%date:~9,1%.dmp log=d:\dbbak_zx\runto_crm%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����runto_crm�û���ϡ�" >> d:\dbbak_zx\exp%date:~9,1%.log


echo "..���ڵ���runto_west�û�"  >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_west/west_runto@scwb file=d:\dbbak_zx\runto_west%date:~9,1%.dmp log=d:\dbbak_zx\runto_west%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����runto_alan�û���ϡ�" >> d:\dbbak_zx\exp%date:~9,1%.log

echo "..���ڵ���runto_byt�û�"  >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_byt/byt_runto@scwb file=d:\dbbak_zx\runto_byt%date:~9,1%.dmp log=d:\dbbak_zx\runto_byt%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����runto_byt�û���ϡ�" >> d:\dbbak_zx\exp%date:~9,1%.log

echo "..���ڵ���runto_alan�û�"  >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_alan/alan_runto@scwb file=d:\dbbak_zx\runto_alan%date:~9,1%.dmp log=d:\dbbak_zx\runto_alan%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����runto_alan�û���ϡ�" >> d:\dbbak_zx\exp%date:~9,1%.log

echo "..���ڵ���runto_cpic�û�"  >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_cpic/cpic_runto@scwb file=d:\dbbak_zx\runto_cpic%date:~9,1%.dmp log=d:\dbbak_zx\runto_cpic%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����runto_cpic�û���ϡ�" >> d:\dbbak_zx\exp%date:~9,1%.log

echo "..���ڵ���runto_zhbx�û�"  >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_zhbx/zhbx_runto@scwb file=d:\dbbak_zx\runto_zhbx%date:~9,1%.dmp log=d:\dbbak_zx\runto_zhbx%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����runto_zhbxh�û���ϡ�" >> d:\dbbak_zx\exp%date:~9,1%.log

echo "..���ڵ���runto_sdbk�û�" >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_sdbk/sdbk_runto@scwb file=d:\dbbak_zx\runto_sdbk%date:~9,1%.dmp log=d:\dbbak_zx\runto_sdbk%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����runto_sdbk�û���ϡ�" >> d:\dbbak_zx\exp%date:~9,1%.log

echo "..���ڵ���runto_yaab�û�" >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_yaab/yaab_runto@scwb file=d:\dbbak_zx\runto_yaab%date:~9,1%.dmp log=d:\dbbak_zx\runto_yaab%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����runto_yaab�û���ϡ�"  >> d:\dbbak_zx\exp%date:~9,1%.log


echo "..���ڵ���rtob�û�" >> d:\dbbak_zx\exp%date:~9,1%.log
exp rtob/rtob@scwb file=d:\dbbak_zx\rtob%date:~9,1%.dmp log=d:\dbbak_zx\rtob%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����rtob�û���ϡ�" >> d:\dbbak_zx\exp%date:~9,1%.log


echo "..���ڵ���runto_cti�û�" >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_cti/cti_runto@scwb file=d:\dbbak_zx\runto_cti%date:~9,1%.dmp log=d:\dbbak_zx\runto_cti%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����runto_cti�û���ϡ�" >> d:\dbbak_zx\exp%date:~9,1%.log


echo "..���ڵ���runto_mid2�û�" >> d:\dbbak_zx\exp%date:~9,1%.log
exp runto_mid2/mid2_runto@scwb file=d:\dbbak_zx\runto_mid2%date:~9,1%.dmp log=d:\dbbak_zx\runto_mid2%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����runto_mid2�û���ϡ�" >> d:\dbbak_zx\exp%date:~9,1%.log


echo "..���ڵ���wfm2�û�" >> d:\dbbak_zx\exp%date:~9,1%.log
exp wfm2/wfm2@scwb file=d:\dbbak_zx\wfm2%date:~9,1%.dmp log=d:\dbbak_zx\wfm2%date:~9,1%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����wfm2�û���ϡ�"  >> d:\dbbak_zx\exp%date:~9,1%.log


echo " " >> d:\dbbak_zx\exp%date:~9,1%.log
echo "-----------------------------------------------------" >> d:\dbbak_zx\exp%date:~9,1%.log
echo "�������ݿ���ϡ�" >> d:\dbbak_zx\exp%date:~9,1%.log
