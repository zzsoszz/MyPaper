echo "��ʼ�������ݿ�" >>e:\dbbak\exp%date:~2,8%.log
echo "-----------------------------------------------------" >> e:\dbbak\exp%date:~2,8%.log
echo " " >> e:\dbbak\exp%date:~2,8%.log

echo "..���ڵ���wfm�û�" >> e:\dbbak\exp%date:~2,8%.log
exp wfm/wfm file=e:\dbbak\wfm%date:~2,8%.dmp log=e:\dbbak\exp%date:~2,8%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..����wfm�û���ϡ�"  >> e:\dbbak\exp%date:~2,8%.log

echo " " >> e:\dbbak\exp%date:~2,8%.log
echo "-----------------------------------------------------" >> e:\dbbak\exp%date:~2,8%.log
echo "�������ݿ���ϡ�" >> e:\dbbak\exp%date:~2,8%.log
