#include <unistd.h>
#include <stdio.h>
#include <signal.h>
void user_func() {
	printf("\n\nCatch a signal SIGINT \n");
}

int main() {
	printf("pid = %d \n\n ", getpid());
	signal(SIGINT, user_func);
	pause();
	printf("receive a signal \n\n");
}
