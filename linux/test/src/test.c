/*
 ============================================================================
 Name        : test.c
 Author      :
 Version     :
 Copyright   : Your copyright notice
 Description : Hello World in C, Ansi-style
 ============================================================================
 */
#include <stdarg.h>
#include <stdio.h>
#include <stdlib.h>
void testManyArg(int start, ...)
{
    va_list arg_ptr;
    int nArgValue =start;
    va_start(arg_ptr,start);
    nArgValue = va_arg(arg_ptr,int);
    nArgValue = va_arg(arg_ptr,int);
    printf("%d",nArgValue);
}
int main(void) {
	puts("!!!Hello World!!!"); /* prints !!!Hello World!!! */
	testManyArg(123,456,455);
	return EXIT_SUCCESS;
}

