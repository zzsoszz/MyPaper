#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>
#include <signal.h>

#define SIG_MY_MSG SIGUSR1+100

void signalhandler(int signumber);

int main(void) {
	pid_t pid;
	if ((pid = fork()) < 0) {
		printf("fork error!\n");
		exit(1);
	}
	/*子进程*/
	else if (pid == 0) {
		signal(SIG_MY_MSG,&signalhandler);
	}
	/*父进程*/
	else {
		kill(pid, SIG_MY_MSG);
	}
	exit(0);
}

void signalhandler(int signumber) {
	printf("signal %d.;\n", signumber);
}
