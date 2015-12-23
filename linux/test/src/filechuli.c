#include <stdio.h>
int getLine(FILE *fp, char *buffer, int maxlen);
int main() {
	char buf[1000];
	printf("Hello world\n");
	FILE *fptr = fopen("aa.txt", "r");
	getLine(fptr, buf, sizeof(buf));
	printf(buf);
	return 0;
}
int getLine(FILE *fp, char *buffer, int maxlen) {
	char temp;
	int i, j;
	for (i = 0, j = 0; i < maxlen; j++) {
		if (fread(&temp, sizeof(char), 1, fp) != 1) {

		}
	}
}

