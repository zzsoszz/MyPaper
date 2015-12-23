
��ҳ> ��̼���> C/C++> ����

Linux��C���Ա��--�źŴ�����
http://linuxc.51.net ����:hoyt (2001-05-08 11:35:28)
ǰ��:��һ����������һ��Linux�µ��źŴ�����.
Linux�µ��źŴ�����:
1.�źŵĲ���
2.�źŵĴ���
3.�����źź���
--------------------------------------------------------------------------------
һ��ʵ��
1���źŵĲ���
Linux�µ��źſ��������DOS�µ�INT������Windows�µ��¼�.����һ���źŷ���ʱ�����ŵ��źžͻᷢ�͸���Ӧ�Ľ���.��Linux�µ��ź������¼���. ����ʹ�� kill -l ������Եõ����µ�������:

1) SIGHUP 2) SIGINT 3) SIGQUIT 4) SIGILL
5) SIGTRAP 6) SIGABRT 7) SIGBUS 8) SIGFPE
9) SIGKILL 10) SIGUSR1 11) SIGSEGV 12) SIGUSR2
13) SIGPIPE 14) SIGALRM 15) SIGTERM 17) SIGCHLD
18) SIGCONT 19) SIGSTOP 20) SIGTSTP 21) SIGTTIN
22) SIGTTOU 23) SIGURG 24) SIGXCPU 25) SIGXFSZ
26) SIGVTALRM 27) SIGPROF 28) SIGWINCH 29) SIGIO
30) SIGPWR

������Щ�źŵ���ϸ������鿴man 7 signal��������. �ź��¼��ķ�����������Դ:һ����Ӳ����ԭ��(�������ǰ����˼���),һ���������ԭ��(��������ʹ��ϵͳ����������������ź�). ��õ��ĸ������źŵ�ϵͳ������kill, raise, alarm��setitimer����. setitimer���������ڼ�ʱ����ʹ�� ��һ����ѧϰ.
#include
#include
#include

int kill(pid_t pid,int sig);
int raise(int sig);
unisigned int alarm(unsigned int seconds);

killϵͳ���ø�������̷����ź�sig.
���pid������,��ô���ź�sig�����͵�����pid.
���pid����0,��ô�ź�sig�����͵����Ժ�pid������ͬһ��������Ľ���
���pid����-1,��ô�źŷ������еĽ��̱��еĽ���,���������ĸ����̺�.
���pid����-1,��0һ��,ֻ�Ƿ��ͽ�������-pid.
�����������ǵ�һ�����.���ǵ��������ػ�������һ�ڵ�������?�����Ǹ�ʱ�����������ɱ���˸������ػ����̵Ĵ���
raiseϵͳ�������Լ�����һ��sig�ź�.���ǿ����������Ǹ�������ʵ��������ܵ�.
alarm������ʱ���е��ϵ��,�������������seconds������Լ�����һ��SIGALRM�ź�. ���������������ʲô�����?

#include

main()
{
 unsigned int i;
 alarm(1);
 for(i=0;1;i++)
 printf("I=%d",i);
}
SIGALRM��ȱʡ�����ǽ�������,���Գ�����1��֮�����,����Կ���������IֵΪ����,���Ƚ�һ�´�ҵ�ϵͳ���ܲ���(�ҵ���2232).

2���źŲ���     ��ʱ������ϣ��������ȷ��ִ��,����������ܵ��źŵ�Ӱ��,��������ϣ�������Ǹ�������1����֮�󲻽���.���ʱ�����Ǿ�Ҫ�����źŵĲ�����.
�źŲ�����õķ������ź�����.�ź�����Ҫ�õ�����ļ�������.

#include

int sigemptyset(sigset_t *set);
int sigfillset(sigset_t *set);
int sigaddset(sigset_t *set, int signo);
int sigdelset(sigset_t *set, int signo);
int sigismember(sigset_t *set, int signo);
int sigprocmask(int how, const sigset_t *set, sigset_t *oset);

sigemptyset������ʼ���źż���set,��set����Ϊ��.sigfillsetҲ��ʼ���źż���,ֻ�ǽ��źż�������Ϊ�����źŵļ���.sigaddset���ź�signo���뵽�źż���֮��,sigdelset���źŴ��źż�����ɾ��.sigismember��ѯ�ź��Ƿ����źż���֮��.
sigprocmask����Ϊ�ؼ���һ������.��ʹ��֮ǰҪ�����ú��źż���set.��������������ǽ�ָ�����źż���set���뵽���̵��ź���������֮��ȥ,����ṩ��oset��ô��ǰ�Ľ����ź��������Ͻ��ᱣ����oset����.����how���������Ĳ�����ʽ.
SIG_BLOCK:����һ���źż��ϵ���ǰ���̵���������֮��.
SIG_UNBLOCK:�ӵ�ǰ����������֮��ɾ��һ���źż���.
SIG_SETMASK:����ǰ���źż�������Ϊ�ź���������.
��һ��ʵ��������ʹ���⼸������.

#include
#include
#include
#include

int main(int argc,char **argv)
{
	double y;
	sigset_t intmask;
	int i,repeat_factor;

	if(argc!=2)
	{
		fprintf(stderr,"Usage:%s repeat_factor\n\a",argv[0]);
		exit(1);
	}

	if((repeat_factor=atoi(argv[1]))<1)repeat_factor=10;
	sigemptyset(&intmask); /* ���źż�������Ϊ��  */
	sigaddset(&intmask,SIGINT); /* �����ж� Ctrl+C �ź�*/
	while(1)
	{
		/*�����ź�,���ǲ�ϣ������ԭ���ļ������Բ���ΪNULL*/
		sigprocmask(SIG_BLOCK,&intmask,NULL);
		fprintf(stderr,"SIGINT signal blocked\n");
		for(i=0;i fprintf(stderr,"Blocked calculation is finished\n");
				/*  ȡ������ */
				sigprocmask(SIG_UNBLOCK,&intmask,NULL);
				fprintf(stderr,"SIGINT signal unblocked\n");
				for(i=0;i fprintf(stderr,"Unblocked calculation is finished\n");
					}
					exit(0);
				}

				���������е�ʱ������Ҫʹ��Ctrl+C������.��������ڵ�һ�����ʱ�򷢳�SIGINT�ź�,�����ź��Ѿ�������,���Գ���û�з�ӳ.ֻ�е��źű�ȡ��������ʱ�����Ż����. ע������ֻҪ����һ��SIGINT�źžͿ�����,��Ϊ�ź�����ֻ�ǽ��źż��뵽�ź���������֮��,��û�ж�������ź�.һ���ź�����ȡ����,����źžͻᷢ������.
				��ʱ������ϣ�����ź�������ʱ�ķ�ӳ��,���統ӵ������Ctrl+Cʱ,���ǲ���ʲô����Ҳ����,����������û���������������,�벻Ҫ����,������ʲô��ӳҲû�е�. ���ʱ������Ҫ�õ�sigaction����.
#include

				int sigaction(int signo,const struct sigaction *act,
						struct sigaction *oact);

				struct sigaction {
					void (*sa_handler)(int signo);
					void (*sa_sigaction)(int siginfo_t *info,void *act);
					sigset_t sa_mask;
					int sa_flags;
					void (*sa_restore)(void);
				}

��������ͽṹ�������ǲ����е�ֲ���.��Ҫ�����������,��ʵ���������ʹ���൱�򵥵�.�����Ƚ���һ�¸��������ĺ���. signo�ܼ򵥾�������Ҫ������ź���,�������κεĺϷ����ź�.�������źŲ��ܹ�ʹ��(SIGKILL��SIGSTOP). act��������Ҫ������źŽ�����δ������Ϣ.oact�����˾�����ǰ����������Ĵ�����Ϣ��,��Ҫ����������Ϣ��,һ����NULL��OK��.
�źŽṹ�е㸴��.��Ҫ������������ѧϰ.
sa_handler��һ��������ָ��,���ָ��ָ��һ������,���������һ������.���������������Ҫ���е��źŲ����ĺ���. sa_sigaction,sa_restore��sa_handler����,ֻ�ǲ�����ͬ����.������Ԫ�����Ǻ���ʹ��,�Ͳ�����.
sa_flags���������źŲ����ĸ������.һ������Ϊ0����.sa_mask�����Ѿ�ѧϰ����
��ʹ�õ�ʱ��������sa_handlerָ�����ǵ�һ���źŲ�������,�Ϳ�����.sa_handler�����������ֵ:SIG_DEL��SIG_IGN.SIG_DEL��ʹ��ȱʡ���źŲ�������,��SIG_IGN��ʹ�ú��Ը��źŵĲ�������.
�����������,����ʹ��һ��ʵ����˵��.��������������Բ�׽�û���CTRL+C�ź�.�����һ����ʾ���.

#include
#include
#include
#include
#include

#define PROMPT "������ֹ������?"

char *prompt=PROMPT;

				void ctrl_c_op(int signo) {
					write(STDERR_FILENO, prompt, strlen(prompt));
				}

				int main() {
					struct sigaction act;

					act.sa_handler = ctrl_c_op;
					sigemptyset(&act.sa_mask);
					act.sa_flags = 0;
					if (sigaction(SIGINT, &act, NULL) < 0) {
						fprintf(stderr, "Install Signal Action Error:%s\n\a",
								strerror(errno));
						exit(1);
					}
					while (1)
						;
				}

�����������źŲ�������֮��,����ʹ����write������û��ʹ��fprintf����.����Ϊ����Ҫ���ǵ������������.����������źŲ�����ʱ������һ���źŷ���,��ô��������������? Ϊ�˴������źŴ��������е�ʱ���źŵķ���,������Ҫ����sa_mask��Ա. ���ǽ�����Ҫ���ε��ź���ӵ�sa_mask�ṹ����ȥ,������Щ�������źŴ����ʱ��ͻᱻ���ε���.
3�������źź���     �����źŵĲ����ʹ���Ƚϸ���,�����ٽ��ܼ����źŲ�������.

#include
#include

int pause(void)				;
				int sigsuspend(const sigset_t *sigmask);

pause�����ܼ�,���ǹ������ֱ��һ���źŷ�����.��sigsuspendҲ�ǹ������ֻ���ڵ��õ�ʱ����sigmaskȡ����ǰ���ź���������.
#include

int sigsetjmp(sigjmp_buf env,int val)				;
				void siglongjmp(sigjmp_buf env, int val);

				���ǵ�goto����������setjmp��longjmp������.�������ź���ת����Ҳ����ʵ�ֳ������ת�����ǿ��ԴӺ���֮����ת��������Ҫ�ĵط�.
				�������漸������,���Ǻ�������,����ֻ��˵����һ��,��ϸ�����鿴��������.
				4��һ��ʵ�� ���ǵ��������ػ����̴������ĸ�������?�ػ��������������ǰ��Ǹ������ǿһ��. ��������������Ҳ���Լ���û����ʼ�.�����ṩ��һ������,����û����������ʾ���µ��ʼ�����,�����������SIGUSR2�ź�,���������ṩ��ʾ���Է���SIGUSR1�ź�.

#include
#include
#include
#include
#include
#include
#include

#include
#include

				/*  Linux  ��Ĭ�θ��˵������ַ�� /var/spool/mail/ */

#define  MAIL_DIR   "/var/spool/mail/"

				/*      ˯��10����      */

#define  SLEEP_TIME     10
#define  MAX_FILENAME 255

				unsigned char notifyflag=1;

				long get_file_size(const char *filename) {
					struct stat buf;

					if(stat(filename,&;buf)==-1)
					{
						if(errno==ENOENT)return 0;
						else return -1;
					}
					return (long) buf.st_size;
				}

				void send_mail_notify(void) {
					fprintf(stderr, "New mail has arrived\007\n");
				}

				void turn_on_notify(int signo) {
					notifyflag = 1;
				}

				void turn_off_notify(int signo) {
					notifyflag = 0;
				}

				int check_mail(const char *filename) {
					long old_mail_size, new_mail_size;
					sigset_t blockset, emptyset;

					sigemptyset(&;blockset);
					sigemptyset(&;emptyset);
					sigaddset(&;blockset,SIGUSR1);
					sigaddset(&;blockset,SIGUSR2);

					old_mail_size = get_file_size(filename);
					if (old_mail_size < 0)
						return 1;
					if (old_mail_size > 0)
						send_mail_notify();
					sleep(SLEEP_TIME);

					while (1) {
						if(sigprocmask(SIG_BLOCK,&;blockset,NULL)<0) return 1;
						while(notifyflag==0)sigsuspend(&;emptyset);
						if(sigprocmask(SIG_SETMASK,&;emptyset,NULL)<0) return 1;
						new_mail_size = get_file_size(filename);
						if (new_mail_size > old_mail_size)
							send_mail_notify;
						old_mail_size = new_mail_size;
						sleep(SLEEP_TIME);
					}
				}

				int main(void) {
					char mailfile[MAX_FILENAME];
					struct sigaction newact;
					struct passwd *pw;

					if ((pw = getpwuid(getuid())) == NULL) {
						fprintf(stderr, "Get Login Name Error:%s\n\a",
								strerror(errno));
						exit(1);
					}
					strcpy(mailfile, MAIL_DIR);
					strcat(mailfile, pw->pw_name);
					newact.sa_handler = turn_on_notify;
					newact.sa_flags = 0;sigemptyset(&;newact.sa_mask);
					sigaddset(&;newact.sa_mask,SIGUSR1);
					sigaddset(&;newact.sa_mask,SIGUSR2);
					if(sigaction(SIGUSR1,&;newact,NULL)<0)
					fprintf(stderr,"Turn On Error:%s\n\a",strerror(errno));
					newact.sa_handler = turn_off_notify;if(sigaction(SIGUSR1,&;newact,NULL)<0)
					fprintf(stderr,"Turn Off Error:%s\n\a",strerror(errno));
					check_mail(mailfile);
					exit(0);
				}

�źŲ�����һ���ǳ����ӵ�����,����������֮�еĸ��ӳ̶Ȼ�Ҫ����,������볹�׵�Ū����źŲ����ĸ�������,��ô���˴�������ϰ���⻹Ҫ�࿴�����ֲ�.�����������ֻ��һ���ʹ�õĻ�,��������ļ�������Ҳ�Ͳ����. ���Ǿͽ��ܵ�������.


