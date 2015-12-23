#include <signal.h>
#include <unistd.h>
#include <stdio.h>
#include <sys/time.h>

void user_func(int sig) {
	if (sig == SIGALRM)
		printf("Catch a signal SIGALRM \n");
	else if (sig == SIGVTALRM)
		printf("Catch a signal SIGVTALRM\n");
}

int main() {
	struct itimerval value, ovalue, value2;

	printf("rocess id is = %d \n", getpid());

	signal(SIGALRM, user_func);
	signal(SIGVTALRM, user_func);

	value.it_value.tv_sec = 1;
	value.it_value.tv_usec = 0;
	value.it_interval.tv_sec = 1;
	value.it_interval.tv_usec = 0;

	setitimer(ITIMER_REAL, &value, &ovalue);

	value2.it_value.tv_sec = 1;
	value2.it_value.tv_usec = 500000;
	value2.it_interval.tv_sec = 1;
	value2.it_interval.tv_usec = 500000;

	setitimer(ITIMER_VIRTUAL, &value2, &ovalue);

	while (1)
		;
}

