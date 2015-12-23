
首页> 编程技术> C/C++> 正文

Linux下C语言编程--信号处理函数
http://linuxc.51.net 作者:hoyt (2001-05-08 11:35:28)
前言:这一章我们讨论一下Linux下的信号处理函数.
Linux下的信号处理函数:
1.信号的产生
2.信号的处理
3.其它信号函数
--------------------------------------------------------------------------------
一个实例
1。信号的产生
Linux下的信号可以类比于DOS下的INT或者是Windows下的事件.在有一个信号发生时候相信的信号就会发送给相应的进程.在Linux下的信号有以下几个. 我们使用 kill -l 命令可以得到以下的输出结果:

1) SIGHUP 2) SIGINT 3) SIGQUIT 4) SIGILL
5) SIGTRAP 6) SIGABRT 7) SIGBUS 8) SIGFPE
9) SIGKILL 10) SIGUSR1 11) SIGSEGV 12) SIGUSR2
13) SIGPIPE 14) SIGALRM 15) SIGTERM 17) SIGCHLD
18) SIGCONT 19) SIGSTOP 20) SIGTSTP 21) SIGTTIN
22) SIGTTOU 23) SIGURG 24) SIGXCPU 25) SIGXFSZ
26) SIGVTALRM 27) SIGPROF 28) SIGWINCH 29) SIGIO
30) SIGPWR

关于这些信号的详细解释请查看man 7 signal的输出结果. 信号事件的发生有两个来源:一个是硬件的原因(比如我们按下了键盘),一个是软件的原因(比如我们使用系统函数或者是命令发出信号). 最常用的四个发出信号的系统函数是kill, raise, alarm和setitimer函数. setitimer函数我们在计时器的使用 那一章再学习.
#include
#include
#include

int kill(pid_t pid,int sig);
int raise(int sig);
unisigned int alarm(unsigned int seconds);

kill系统调用负责向进程发送信号sig.
如果pid是正数,那么向信号sig被发送到进程pid.
如果pid等于0,那么信号sig被发送到所以和pid进程在同一个进程组的进程
如果pid等于-1,那么信号发给所有的进程表中的进程,除了最大的哪个进程号.
如果pid由于-1,和0一样,只是发送进程组是-pid.
我们用最多的是第一个情况.还记得我们在守护进程那一节的例子吗?我们那个时候用这个函数杀死了父进程守护进程的创建
raise系统调用向自己发送一个sig信号.我们可以用上面那个函数来实现这个功能的.
alarm函数和时间有点关系了,这个函数可以在seconds秒后向自己发送一个SIGALRM信号. 下面这个函数会有什么结果呢?

#include

main()
{
 unsigned int i;
 alarm(1);
 for(i=0;1;i++)
 printf("I=%d",i);
}
SIGALRM的缺省操作是结束进程,所以程序在1秒之后结束,你可以看看你的最后I值为多少,来比较一下大家的系统性能差异(我的是2232).

2。信号操作     有时候我们希望进程正确的执行,而不想进程受到信号的影响,比如我们希望上面那个程序在1秒钟之后不结束.这个时候我们就要进行信号的操作了.
信号操作最常用的方法是信号屏蔽.信号屏蔽要用到下面的几个函数.

#include

int sigemptyset(sigset_t *set);
int sigfillset(sigset_t *set);
int sigaddset(sigset_t *set, int signo);
int sigdelset(sigset_t *set, int signo);
int sigismember(sigset_t *set, int signo);
int sigprocmask(int how, const sigset_t *set, sigset_t *oset);

sigemptyset函数初始化信号集合set,将set设置为空.sigfillset也初始化信号集合,只是将信号集合设置为所有信号的集合.sigaddset将信号signo加入到信号集合之中,sigdelset将信号从信号集合中删除.sigismember查询信号是否在信号集合之中.
sigprocmask是最为关键的一个函数.在使用之前要先设置好信号集合set.这个函数的作用是将指定的信号集合set加入到进程的信号阻塞集合之中去,如果提供了oset那么当前的进程信号阻塞集合将会保存在oset里面.参数how决定函数的操作方式.
SIG_BLOCK:增加一个信号集合到当前进程的阻塞集合之中.
SIG_UNBLOCK:从当前的阻塞集合之中删除一个信号集合.
SIG_SETMASK:将当前的信号集合设置为信号阻塞集合.
以一个实例来解释使用这几个函数.

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
	sigemptyset(&intmask); /* 将信号集合设置为空  */
	sigaddset(&intmask,SIGINT); /* 加入中断 Ctrl+C 信号*/
	while(1)
	{
		/*阻塞信号,我们不希望保存原来的集合所以参数为NULL*/
		sigprocmask(SIG_BLOCK,&intmask,NULL);
		fprintf(stderr,"SIGINT signal blocked\n");
		for(i=0;i fprintf(stderr,"Blocked calculation is finished\n");
				/*  取消阻塞 */
				sigprocmask(SIG_UNBLOCK,&intmask,NULL);
				fprintf(stderr,"SIGINT signal unblocked\n");
				for(i=0;i fprintf(stderr,"Unblocked calculation is finished\n");
					}
					exit(0);
				}

				程序在运行的时候我们要使用Ctrl+C来结束.如果我们在第一计算的时候发出SIGINT信号,由于信号已经屏蔽了,所以程序没有反映.只有到信号被取消阻塞的时候程序才会结束. 注意我们只要发出一次SIGINT信号就可以了,因为信号屏蔽只是将信号加入到信号阻塞集合之中,并没有丢弃这个信号.一旦信号屏蔽取消了,这个信号就会发生作用.
				有时候我们希望对信号作出及时的反映的,比如当拥护按下Ctrl+C时,我们不想什么事情也不做,我们想告诉用户你的这个操作不好,请不要重试,而不是什么反映也没有的. 这个时候我们要用到sigaction函数.
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

这个函数和结构看起来是不是有点恐怖呢.不要被这个吓着了,其实这个函数的使用相当简单的.我们先解释一下各个参数的含义. signo很简单就是我们要处理的信号了,可以是任何的合法的信号.有两个信号不能够使用(SIGKILL和SIGSTOP). act包含我们要对这个信号进行如何处理的信息.oact更简单了就是以前对这个函数的处理信息了,主要用来保存信息的,一般用NULL就OK了.
信号结构有点复杂.不要紧我们慢慢的学习.
sa_handler是一个函数型指针,这个指针指向一个函数,这个函数有一个参数.这个函数就是我们要进行的信号操作的函数. sa_sigaction,sa_restore和sa_handler差不多的,只是参数不同罢了.这两个元素我们很少使用,就不管了.
sa_flags用来设置信号操作的各个情况.一般设置为0好了.sa_mask我们已经学习过了
在使用的时候我们用sa_handler指向我们的一个信号操作函数,就可以了.sa_handler有两个特殊的值:SIG_DEL和SIG_IGN.SIG_DEL是使用缺省的信号操作函数,而SIG_IGN是使用忽略该信号的操作函数.
这个函数复杂,我们使用一个实例来说明.下面这个函数可以捕捉用户的CTRL+C信号.并输出一个提示语句.

#include
#include
#include
#include
#include

#define PROMPT "你想终止程序吗?"

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

在上面程序的信号操作函数之中,我们使用了write函数而没有使用fprintf函数.是因为我们要考虑到下面这种情况.如果我们在信号操作的时候又有一个信号发生,那么程序该如何运行呢? 为了处理在信号处理函数运行的时候信号的发生,我们需要设置sa_mask成员. 我们将我们要屏蔽的信号添加到sa_mask结构当中去,这样这些函数在信号处理的时候就会被屏蔽掉的.
3。其它信号函数     由于信号的操作和处理比较复杂,我们再介绍几个信号操作函数.

#include
#include

int pause(void)				;
				int sigsuspend(const sigset_t *sigmask);

pause函数很简单,就是挂起进程直到一个信号发生了.而sigsuspend也是挂起进程只是在调用的时候用sigmask取代当前的信号阻塞集合.
#include

int sigsetjmp(sigjmp_buf env,int val)				;
				void siglongjmp(sigjmp_buf env, int val);

				还记得goto函数或者是setjmp和longjmp函数吗.这两个信号跳转函数也可以实现程序的跳转让我们可以从函数之中跳转到我们需要的地方.
				由于上面几个函数,我们很少遇到,所以只是说明了一下,详细情况请查看联机帮助.
				4。一个实例 还记得我们在守护进程创建的哪个程序吗?守护进程在这里我们把那个程序加强一下. 下面这个程序会在也可以检查用户的邮件.不过提供了一个开关,如果用户不想程序提示有新的邮件到来,可以向程序发送SIGUSR2信号,如果想程序提供提示可以发送SIGUSR1信号.

#include
#include
#include
#include
#include
#include
#include

#include
#include

				/*  Linux  的默任个人的邮箱地址是 /var/spool/mail/ */

#define  MAIL_DIR   "/var/spool/mail/"

				/*      睡眠10秒钟      */

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

信号操作是一件非常复杂的事情,比我们想象之中的复杂程度还要复杂,如果你想彻底的弄清楚信号操作的各个问题,那么除了大量的练习以外还要多看联机手册.不过如果我们只是一般的使用的话,有了上面的几个函数也就差不多了. 我们就介绍到这里了.


