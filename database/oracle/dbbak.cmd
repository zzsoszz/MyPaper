echo "开始备份数据库" >>e:\dbbak\exp%date:~2,8%.log
echo "-----------------------------------------------------" >> e:\dbbak\exp%date:~2,8%.log
echo " " >> e:\dbbak\exp%date:~2,8%.log

echo "..正在导出wfm用户" >> e:\dbbak\exp%date:~2,8%.log
exp wfm/wfm file=e:\dbbak\wfm%date:~2,8%.dmp log=e:\dbbak\exp%date:~2,8%.log compress=n buffer=8092 consistent=y direct=n constraints=y feedback=10000  grants=y record=y indexes=y triggers=y rows=y;
echo "..导出wfm用户完毕。"  >> e:\dbbak\exp%date:~2,8%.log

echo " " >> e:\dbbak\exp%date:~2,8%.log
echo "-----------------------------------------------------" >> e:\dbbak\exp%date:~2,8%.log
echo "备份数据库完毕。" >> e:\dbbak\exp%date:~2,8%.log
