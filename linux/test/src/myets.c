#include <stdio.h>
#include <time.h>
#include <errno.h>
#include <string.h>
#include <stdlib.h>

#include <db_func.h>
#include <sys/stat.h>
#include <pthread.h>
#include <semaphore.h>

#include <sqlca.h>


/*for my utils*/
#include "list.h"
#include "util_str.h"
#include "util_tcp.h"

/**
从上行短信拦截分流的短信直接送到这里

上行短信端口: 10086111
监听 9967(udp) 端口
收到之后直接存入 wSmsToBoss 表
连接数据库: smaccess

 数据格式:  systemid src_no dst_no content
 如: boss 8613508210041 10086091123 阿


 */


#define z0(a) memset(a, 0, sizeof(a))

rl_list list;
sem_t sem;
pthread_mutex_t mutex;

char LOG[30];


typedef struct _inode
{
	struct _inode *next;
	struct _inode *prev;
	char data[200];
} inode;


int getcoding(char *str)
{
    int l, i;
    l = strlen(str);
    for(i=0; i<l; i++){
        if(str[i] >= (char)128){
            return 8;
        }
    }
    return 0;
}

int sndsm(char *port_no, char *phone_no, const char *msg)
{
    EXEC SQL insert into wsmstopush(smid, src_no, dst_no, msg, send_status, create_time)
        values(seq_wsmstoboss.nextval, :port_no, :phone_no, :msg,
        '0', sysdate);
    if(SQLCODE != OK){
        file_log(LOG, "insert wsmstopush failed:%d %s", SQLCODE, SQLERRMSG);
        file_log(LOG, "port_no[%s] phone_no[%s] msg[%s]",
            port_no, phone_no, msg);
    }
    return SQLCODE;

}


/*移动有约
1、用户可编辑短信“YY+问题”发送至10086111；
2、系统接收到上行短信后根据时间进行判断：
1）、周五18：05-18：30期间，系统回复：“感谢参与中国移动‘移动有约’，我们会尽快回复您的问题。请关注下周五‘移动有约’抽奖结果”。
2、如短信上行时间非周五18：05-18：30时间段，系统回复：“抱歉，‘移动有约’短信互动时间为周五下午18：05-18：30。欢迎届时参加”。
3）、非周五18：05-18：30时间段的短信内容系统不做保留。

2008-07-10 11:34
*/
int up_ydyy(char *up_no, char *phone_no, char *msg)
{
    int ret;
    struct tm *t;
    time_t t1;
    int flag;

    time(&t1);
    t = localtime(&t1);

    if(getenv("TESTONLY") == NULL)
        flag = (t->tm_wday == 5 && t->tm_hour == 18 && t->tm_min>=5 && t->tm_min<=30);
    else
        flag = (t->tm_wday == 4 && t->tm_hour == 11 && t->tm_min>=45 && t->tm_min<=59);

    if(flag)
    {
        EXEC SQL insert into sms_upydyy values(seq_wsmstoboss.nextval, :up_no, :phone_no,
            sysdate, :msg);
         if(SQLCODE != OK){
            file_log(LOG, "insert up111 failed:%d %s", SQLCODE, SQLERRMSG);
            file_log(LOG, "up_no[%s] phone_no[%s] msg[%s]",
                up_no, phone_no, msg);
        }
        ret = sndsm(up_no, phone_no, "感谢参与中国移动‘移动有约’，我们会尽快回复您的问题。请关注下周五‘移动有约’抽奖结果");
    }else{
        ret = sndsm(up_no, phone_no, "抱歉，‘移动有约’短信互动时间为周五下午18：05-18：30。欢迎届时参加");
    }


    EXEC SQL commit;
    return ret;
}


/*垃圾短信治理建议*/
int up_111(char *up_no, char *phone_no, char *msg)
{
    int ret;
    EXEC SQL insert into sms_up111 values(seq_wsmstoboss.nextval, :up_no, :phone_no,
        sysdate, :msg);
     if(SQLCODE != OK){
        file_log(LOG, "insert up111 failed:%d %s", SQLCODE, SQLERRMSG);
        file_log(LOG, "up_no[%s] phone_no[%s] msg[%s]",
            up_no, phone_no, msg);
    }
    ret = sndsm(up_no, phone_no, "尊敬的用户,感谢参与“治理垃圾短信，您来献计献策”活动，活动结束将对参与客户抽奖及评选最佳建议，期待您提出更多建议。");
    EXEC SQL commit;
    return ret;
}

/*网络扫盲信息收集*/
int up_wl(char *up_no, char *phone_no, char *msg)
{
    int ret;
    EXEC SQL insert into sms_upwl values(seq_wsmstoboss.nextval, :up_no, :phone_no,
        sysdate, :msg);
     if(SQLCODE != OK){
        file_log(LOG, "insert up111 failed:%d %s", SQLCODE, SQLERRMSG);
        file_log(LOG, "up_no[%s] phone_no[%s] msg[%s]",
            up_no, phone_no, msg);
    }
    ret = sndsm(up_no, phone_no, "欢迎您参与成都移动网络信息收集活动，感谢您的支持！");
    EXEC SQL commit;
    return ret;
}

/*10086111增加'客户问题'收集功能*/
int up_khwt(char *up_no, char *phone_no, char *msg)
{
    int ret;
    EXEC SQL insert into sms_upkhwt values(seq_wsmstoboss.nextval, :up_no, :phone_no,
        sysdate, :msg);
     if(SQLCODE != OK){
        file_log(LOG, "insert upkhwt failed:%d %s", SQLCODE, SQLERRMSG);
        file_log(LOG, "up_no[%s] phone_no[%s] msg[%s]",
            up_no, phone_no, msg);
    }
    ret = sndsm(up_no, phone_no, "信息已收悉，谢谢支持！");
    return ret;
}


/*垃圾短信举报*/
int up_999(char *up_no, char *phone_no, char *msg)
{
    char *ptr, *disp_no;
    int ret;

    ptr = strchr(msg, '*');
    if(ptr == NULL){
        ptr = strchr(msg, ' ');
    }
    if(ptr == NULL){
        ret = sndsm(up_no, phone_no, "尊敬的客户：请在信息内容的最前面输入被举报号码，并以‘*’与信息内容分隔，然后重新发送到10086999，谢谢您的合作！");
        return ret;
    }
    disp_no = msg;
    ptr[0] = 0; ptr ++;
    EXEC SQL insert into LAJIDUANXIN (ID,DEST_Num,Disposed_Num,MSISDN,Content,STATUS,CREATE_TIME)
        values(SEQ_LAJIDUANXIN_ID.nextval, :up_no, :disp_no, :phone_no, :ptr, '1', sysdate);
    if(SQLCODE != OK){
        file_log(LOG, "insert into LAJIDUANXIN failed:%d [%s]", SQLCODE, SQLERRMSG);
        file_log(LOG, "up_no[%s] disp_no[%s], phone_no[%s], msg[%s]",
            up_no, disp_no, phone_no, ptr);
    }
    ret = sndsm(up_no, phone_no, "尊敬的客户：您向我公司转发的不良信息已收到，感谢您对中国移动的支持和关心，我公司将会根据您提供的信息联合社会各界进行查证和处理，谢谢！");
    EXEC SQL commit;
    return ret;
}

/*10086111投诉征集*/
int up_zj(char *up_no, char *phone_no, char *msg)
{
	int ret;
    char *r[6];
    static char buf[2048];
    char city[2048];/*市*/
    char county[2048];/*县区*/
    char village[2048];/*乡村*/
    char othersign[2048];/*其他标志物*/
    char problem[2048];/*出现的问题*/
    strcpy(buf, msg);
    i = splitc(buf, r, 6, '*');
    if(i == 6)
    {
    	  city =r[1];
    	  county =r[2];
    	  village=r[3];
    	  othersign=r[4];
    	  problem =r[5];
    }
    EXEC SQL insert into Tousuzj values(:phone_no,:city,:county,:village,:othersign,:problem,sysdate);
    if(SQLCODE != OK)
    {
        file_log(LOG, "insert Tousuzj failed:%d %s", SQLCODE, SQLERRMSG);
        file_log(LOG, "up_no[%s] phone_no[%s] msg[%s]",up_no, phone_no, msg);
    }
    ret = sndsm(up_no, phone_no, "信息已收悉，谢谢支持！");
    return ret;
}


int deal_sms(char *up_no, char *phone_no, char *msg)
{
    if(memcmp(up_no, "10086111", 8) == 0){
        if(strncasecmp(msg, "YY", 2) == 0)
            /*up_ydyy(up_no, phone_no, msg);*/
            sndsm(up_no, phone_no, "您好，移动有约节目已停播，感谢您的关注，谢谢！");
        else if(strncasecmp(msg, "wl", 2) == 0)
            up_wl(up_no, phone_no, msg);
        else if(strncasecmp(msg, "L",1) == 0)
            up_khwt(up_no, phone_no, msg);
        else if(strncasecmp(msg, "ZJ",2) == 0)
            up_zj(up_no, phone_no, msg);
        else
            up_111(up_no, phone_no, msg);
    }else if(memcmp(up_no, "10086999", 8) == 0){
        up_999(up_no, phone_no, msg);
    }
}


/*

create table sms_up111(smid number, up_no varchar2(21), phone_no varchar2(11),
 op_time date, cont varchar2(500));
create index sms_up111_idx1 on sms_up111(phone_no);
create index sms_up111_idx2 on sms_up111(op_time);

create table sms_up111_tmp(smid number, up_no varchar2(21), phone_no varchar2(11),
 op_time date, m_ref number, m_total number, m_seq number, cont varchar2(500));
create index tmp_idx11 on sms_up111_tmp(phone_no);

*/
int check_111(char *phone_no, char *up_no, char *msg)
{
    char *r[5];
    int i, j, ref, total, seq;
    static char buf[2048], cont[510];

    ref = 0;
    if(msg[0] == '!'){
        strcpy(buf, msg);
        i = splitc(buf, r, 5, '!');
        if(i == 5){
            ref = atoi(r[1]);
            seq = atoi(r[2]);
            total = atoi(r[3]);
            msg = r[4];
        }
    }

    /*非长短信, 直接处理*/
    if(ref == 0){
        deal_sms(up_no, phone_no, msg);
        return 0;
    }

    EXEC SQL insert into sms_up111_tmp values(seq_wsmstoboss.nextval, :up_no, :phone_no,
        sysdate, :ref, :total, :seq, :msg);
    if(SQLCODE != OK){
        file_log(LOG, "insert up111_tmp failed:%d %s", SQLCODE, SQLERRMSG);
    }
    EXEC SQL commit;

    /*否则, 加入长短信连接表中, 等待连接*/
    i = 0;
    EXEC SQL select count(*) into :i from sms_up111_tmp
        where phone_no=:phone_no and op_time>sysdate-1/144 and m_ref=:ref order by m_seq;
    if(i != total){
        return 0;
    }

    z0(cont);
    z0(buf);
    EXEC SQL declare cur cursor for
        select m_seq, cont from sms_up111_tmp
        where phone_no=:phone_no and op_time>sysdate-1/144 and m_ref=:ref order by m_seq;
    EXEC SQL open cur;
    while(SQLCODE == 0){
        EXEC SQL fetch cur into :seq, :cont;
        if(SQLCODE != 0)
            break;
        trim(cont);
        strcat(buf, cont);
    }
    EXEC SQL close cur;

    EXEC SQL delete sms_up111_tmp
        where phone_no=:phone_no and op_time>sysdate-1/144 and m_ref=:ref;
    EXEC SQL commit;

    deal_sms(up_no, phone_no, buf);
    return 0;
}

void *thread_insert_db(void *parm)
{
    char *ptr, *p1, *p2;
    char phone_no[30], dst_no[30], msg[500];
    int counter, i;
	char *r[10];
	char cfgfile[128];
	inode *node;
	char buf[1024], status[5], time_flag, op_name[40];
	long id_no, cmdid;
	int accept_tail;


	sprintf(cfgfile, "%s/etc/dblogin.cfg", getenv("WORKDIR"));

	counter = 0;
    while(1){
        sem_wait(&sem);
		pthread_mutex_lock(&mutex);
		node = (inode *)list.header;
		if(node != NULL)
			{
			strcpy(buf, node->data);
			p1 = buf;
	        rl_list_remove(&list, (char *)node);
			}
		else{
			p1 = NULL;
			}
		pthread_mutex_unlock(&mutex);

		if(p1 == NULL)
			continue;

        i = splitc(buf, r, 4, ' ');
		if(i < 4)
			continue;


		strcpy(phone_no, r[1]);
		strcpy(dst_no, r[2]);
		strcpy(msg, r[3]);

		if(logindb(cfgfile) != 0){
			printf("连接数据库失败\n");
			exit(1);
		}

		file_log(LOG, "phone_no[%s] dst_no[%s], msg[%s]",
			phone_no, dst_no, msg);
        if(strstr(msg, "id:") != NULL && strstr(msg, "stat:") != NULL && strstr(msg, "err:") != NULL){
            /*状态报告,不处理*/
            continue;
        }
        if(memcmp(phone_no, "861", 3) == 0)
	    	strcpy(phone_no, phone_no+2); /*del the 86*/

        check_111(phone_no, dst_no, msg);

		EXEC SQL commit;
    }
}

void *thread_rcvsm(void *parm)
{
    const int buflen = 4096;
    int sockid;
    char buf[buflen];
    int l, r;
    char client_ip[30];
    int client_port;
	inode node;

    sockid = *((int *)parm);

    while(1){
        r = udp_recvfrom(sockid, client_ip, &client_port, buf, buflen);
        if(r <= 0){
            printf("client read failed, break\n");
            break;
        }

        buf[r] = 0;
        printf("len:%d buf[%s]\n", r, buf);
		/*判断状态报告不处理*/
		if(strstr(buf, "id:") != NULL && strstr(buf, "submit date:") != NULL){
			continue;
			}
		strcpy(node.data, buf);
		pthread_mutex_lock(&mutex);
        rl_list_add(&list, (char *)&node);
		pthread_mutex_unlock(&mutex);
        sem_post(&sem);
    }

    tcp_close(sockid);
    return NULL;
}




int main(int argc, char *argv[])
{
    int ret;
    int sock1;
    int listen_port;
    pthread_t th1, th2;
    char cfgfile[128];
	char *p;

    listen_port = 9967;

    if(argc > 1)
        listen_port = atoi(argv[1]);

	p = strlchr(argv[0], '/');
	if(p == NULL)
		strcpy(LOG, argv[0]);
	else
		strcpy(LOG, p);

	GenDaemon();

    sock1 = udp_bind(NULL, listen_port);
    if(sock1 <= 0){
        printf("udp bind failed [%d]\n", listen_port);
        return 0;
    }

    sem_init( &sem, PTHREAD_PROCESS_PRIVATE, 0 );
	pthread_mutex_init(&mutex, NULL);
	rl_list_create(&list, sizeof(inode));

    ret = pthread_create(&th1, NULL, thread_insert_db, NULL);
    printf("pthread_create thread_insert_db return %d\n", ret);


    thread_rcvsm((void *)&sock1);

    return 0;
}

