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
�����ж������ط����Ķ���ֱ���͵�����

���ж��Ŷ˿�: 10086111
���� 9967(udp) �˿�
�յ�֮��ֱ�Ӵ��� wSmsToBoss ��
�������ݿ�: smaccess

 ���ݸ�ʽ:  systemid src_no dst_no content
 ��: boss 8613508210041 10086091123 ��


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


/*�ƶ���Լ
1���û��ɱ༭���š�YY+���⡱������10086111��
2��ϵͳ���յ����ж��ź����ʱ������жϣ�
1��������18��05-18��30�ڼ䣬ϵͳ�ظ�������л�����й��ƶ����ƶ���Լ�������ǻᾡ��ظ��������⡣���ע�����塮�ƶ���Լ���齱�������
2�����������ʱ�������18��05-18��30ʱ��Σ�ϵͳ�ظ�������Ǹ�����ƶ���Լ�����Ż���ʱ��Ϊ��������18��05-18��30����ӭ��ʱ�μӡ���
3����������18��05-18��30ʱ��εĶ�������ϵͳ����������

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
        ret = sndsm(up_no, phone_no, "��л�����й��ƶ����ƶ���Լ�������ǻᾡ��ظ��������⡣���ע�����塮�ƶ���Լ���齱���");
    }else{
        ret = sndsm(up_no, phone_no, "��Ǹ�����ƶ���Լ�����Ż���ʱ��Ϊ��������18��05-18��30����ӭ��ʱ�μ�");
    }


    EXEC SQL commit;
    return ret;
}


/*��������������*/
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
    ret = sndsm(up_no, phone_no, "�𾴵��û�,��л���롰�����������ţ������׼��ײߡ������������Բ���ͻ��齱����ѡ��ѽ��飬�ڴ���������ཨ�顣");
    EXEC SQL commit;
    return ret;
}

/*����ɨä��Ϣ�ռ�*/
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
    ret = sndsm(up_no, phone_no, "��ӭ������ɶ��ƶ�������Ϣ�ռ������л����֧�֣�");
    EXEC SQL commit;
    return ret;
}

/*10086111����'�ͻ�����'�ռ�����*/
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
    ret = sndsm(up_no, phone_no, "��Ϣ����Ϥ��лл֧�֣�");
    return ret;
}


/*�������žٱ�*/
int up_999(char *up_no, char *phone_no, char *msg)
{
    char *ptr, *disp_no;
    int ret;

    ptr = strchr(msg, '*');
    if(ptr == NULL){
        ptr = strchr(msg, ' ');
    }
    if(ptr == NULL){
        ret = sndsm(up_no, phone_no, "�𾴵Ŀͻ���������Ϣ���ݵ���ǰ�����뱻�ٱ����룬���ԡ�*������Ϣ���ݷָ���Ȼ�����·��͵�10086999��лл���ĺ�����");
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
    ret = sndsm(up_no, phone_no, "�𾴵Ŀͻ��������ҹ�˾ת���Ĳ�����Ϣ���յ�����л�����й��ƶ���֧�ֺ͹��ģ��ҹ�˾����������ṩ����Ϣ������������в�֤�ʹ���лл��");
    EXEC SQL commit;
    return ret;
}

/*10086111Ͷ������*/
int up_zj(char *up_no, char *phone_no, char *msg)
{
	int ret;
    char *r[6];
    static char buf[2048];
    char city[2048];/*��*/
    char county[2048];/*����*/
    char village[2048];/*���*/
    char othersign[2048];/*������־��*/
    char problem[2048];/*���ֵ�����*/
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
    ret = sndsm(up_no, phone_no, "��Ϣ����Ϥ��лл֧�֣�");
    return ret;
}


int deal_sms(char *up_no, char *phone_no, char *msg)
{
    if(memcmp(up_no, "10086111", 8) == 0){
        if(strncasecmp(msg, "YY", 2) == 0)
            /*up_ydyy(up_no, phone_no, msg);*/
            sndsm(up_no, phone_no, "���ã��ƶ���Լ��Ŀ��ͣ������л���Ĺ�ע��лл��");
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

    /*�ǳ�����, ֱ�Ӵ���*/
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

    /*����, ���볤�������ӱ���, �ȴ�����*/
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
			printf("�������ݿ�ʧ��\n");
			exit(1);
		}

		file_log(LOG, "phone_no[%s] dst_no[%s], msg[%s]",
			phone_no, dst_no, msg);
        if(strstr(msg, "id:") != NULL && strstr(msg, "stat:") != NULL && strstr(msg, "err:") != NULL){
            /*״̬����,������*/
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
		/*�ж�״̬���治����*/
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

