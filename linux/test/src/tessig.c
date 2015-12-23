//信号集的使用
#include <signal.h>
#include <sys/types.h>
#include <unistd.h>
void user_func(int, siginfo_t*, void*);

int main(int argc, char**argv) {
	struct sigaction act;
	int sig;
	sig = atoi(argv[1]);

	sigemptyset(&act.sa_mask);
	act.sa_flags = SA_SIGINFO;
	act.sa_sigaction = (void *) user_func;

	if (sigaction(sig, &act, NULL) < 0) {
		printf("install sigal error\n");
	}

	while (1) {
		sleep(2);
		printf("wait for the signal\n");
	}
}
void user_func(int signum, siginfo_t *info, void *myact) {
	printf("receive signal %d\n\n\n", signum);
	sleep(5);
}

