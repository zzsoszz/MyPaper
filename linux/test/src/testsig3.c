#include <signal.h>
#include <unistd.h>
#include <stdio.h>
#define damo
void user_func(int no) {
	switch (no) {
	case 1:
		printf("Get SIGHUP.\n");
		break;
	case 2:
		printf("Get SIGINT\n");
		break;
	case 3:
		printf("Get SIGQUIT \n");
		break;
	default:
		printf("What wan yi a \n\n");
		break;
	}

}
int main() {
	printf("rocess id is %d\n ", getpid());

#ifdef damo
	signal(SIGHUP, user_func);
	signal(SIGINT, user_func);
	signal(SIGQUIT, user_func);
	signal(SIGBUS, user_func);
#else
	signal(SIGHUP, SIG_IGN);
	signal(SIGINT, SIG_IGN);
	signal(SIGQUIT, SIG_IGN);
	signal(SIGBUS, SIG_DFL);
#endif

	while (1)
		;
}
