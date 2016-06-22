
openssl genrsa -out rsa_1024_priv.pem 1024
openssl rsa -pubout -in rsa_1024_priv.pem -out rsa_1024_pub.pem
openssl pkcs8 -topk8 -in rsa_1024_priv.pem -out pkcs8_rsa_1024_priv.pem -nocrypt  


openssl

OpenSSL ��һ��ǿ��İ�ȫ�׽��ֲ�����⣬������Ҫ�������㷨�����õ���Կ��֤���װ�����ܼ�SSLЭ�飬���ṩ�ḻ��Ӧ�ó��򹩲��Ի�����Ŀ��ʹ�á�
��OpenSSL���س������ذ�ȫ©���󣬷��ֶ���ͨ��SSLЭ����ܵ���վʹ����ΪOpenSSL�Ŀ�Դ��������������ǻ�����Ӧ����㷺�İ�ȫ���䷽����������������֧����������վ���Ż���վ�������ʼ�����Ҫ��վ�㷺ʹ�ã����Ը�©��Ӱ�췶Χ���


OpenSSL����������ģʽ������ģʽ��������ģʽ��
ֱ������openssl�س����뽻��ģʽ�����������ѡ���openssl����������ģʽ��


OpenSSL�����������ſ��Էֳ�������Ҫ�Ĺ��ܲ��֣������㷨�⡢SSLЭ����Լ�Ӧ�ó���OpenSSL��Ŀ¼�ṹ��ȻҲ��Χ�����������ܲ��ֽ��й滮�ġ� 


1.�ԳƼ����㷨 


OpenSSLһ���ṩ��8�ֶԳƼ����㷨������7���Ƿ�������㷨�����е�һ���������㷨��RC4����7�ַ�������㷨�ֱ���AES��DES��Blowfish��CAST��IDEA��RC2��RC5����֧�ֵ������뱾ģʽ��ECB�������ܷ�������ģʽ��CBC�������ܷ���ģʽ��CFB�����������ģʽ��OFB�����ֳ��õķ����������ģʽ�����У�AESʹ�õļ��ܷ���ģʽ��CFB�����������ģʽ��OFB�����鳤����128λ�������㷨ʹ�õ�����64λ����ʵ�ϣ�DES�㷨���治�����ǳ��õ�DES�㷨����֧��������Կ��������Կ3DES�㷨�� 


2.�ǶԳƼ����㷨 


OpenSSLһ��ʵ����4�ַǶԳƼ����㷨������DH�㷨��RSA�㷨��DSA�㷨����Բ�����㷨��EC����DH�㷨һ���û���Կ������RSA�㷨�ȿ���������Կ������Ҳ������������ǩ������Ȼ��������ܹ������仺�����ٶȣ���ôҲ�����������ݼ��ܡ�DSA�㷨��һ��ֻ��������ǩ���� 


3.��ϢժҪ�㷨 


OpenSSLʵ����5����ϢժҪ�㷨���ֱ���MD2��MD5��MDC2��SHA��SHA1����RIPEMD��SHA�㷨��ʵ�ϰ�����SHA��SHA1������ϢժҪ�㷨�����⣬OpenSSL��ʵ����DSS��׼�й涨��������ϢժҪ�㷨DSS��DSS1�� 


4.��Կ��֤����� 


��Կ��֤�������PKI��һ����Ҫ��ɲ��֣�OpenSSLΪ֮�ṩ�˷ḻ�Ĺ��ܣ�֧�ֶ��ֱ�׼�� 


���ȣ�OpenSSLʵ����ASN.1��֤�����Կ��ر�׼���ṩ�˶�֤�顢��Կ��˽Կ��֤�������Լ�CRL�����ݶ����DER��PEM��BASE64�ı���빦�ܡ�OpenSSL�ṩ�˲������ֹ�����Կ�ԺͶԳ���Կ�ķ�����������Ӧ�ó���ͬʱ�ṩ�˶Թ�Կ��˽Կ��DER����빦�ܡ���ʵ����˽Կ��PKCS#12��PKCS#8�ı���빦�ܡ�OpenSSL�ڱ�׼���ṩ�˶�˽Կ�ļ��ܱ������ܣ�ʹ����Կ���԰�ȫ�ؽ��д洢�ͷַ��� 


�ڴ˻����ϣ�OpenSSLʵ���˶�֤���X.509��׼����롢PKCS#12��ʽ�ı�����Լ�PKCS#7�ı���빦�ܡ����ṩ��һ���ı����ݿ⣬֧��֤��Ĺ����ܣ�����֤����Կ���������������֤��ǩ������������֤�ȹ��ܡ� 


��ʵ�ϣ�OpenSSL�ṩ��CAӦ�ó������һ��С�͵�֤��������ģ�CA����ʵ����֤��ǩ�����������̺�֤�����Ĵ󲿷ֻ��ơ�


1,��ϢժҪ�㷨Ӧ������


# ��SHA1�㷨�����ļ�file.txt�Ĺ���ֵ�������stdout
# openssl dgst -sha1 file.txt

#��SHA1�㷨�����ļ�file.txt�Ĺ���ֵ,������ļ�digest.txt
# openssl sha1 -out digest.txt file.txt	

# ��DSS1(SHA1)�㷨Ϊ�ļ�file.txtǩ��,������ļ�dsasign.bin
# ǩ����private key����ΪDSA�㷨�����ģ��������ļ�dsakey.pem��
# openssl dgst -dss1 -sign dsakey.pem -out dsasign.bin file.txt

# ��dss1�㷨��֤file.txt������ǩ��dsasign.bin��
# ��֤��private keyΪDSA�㷨�������ļ�dsakey.pem
# openssl dgst -dss1 -prverify dsakey.pem -signature dsasign.bin file.txt

# ��sha1�㷨Ϊ�ļ�file.txtǩ��,������ļ�rsasign.bin
# ǩ����private keyΪRSA�㷨�������ļ�rsaprivate.pem
# openssl sha1 -sign rsaprivate.pem -out rsasign.bin file.txt

# ��sha1�㷨��֤file.txt������ǩ��rsasign.bin��
# ��֤��public keyΪRSA�㷨���ɵ�rsapublic.pem
# openssl sha1 -verify rsapublic.pem -signature rsasign.bin file.txt



2,�ԳƼ���Ӧ������


# �ԳƼ���Ӧ������
# ��DES3�㷨��CBCģʽ�����ļ�plaintext.doc��
# ���ܽ��������ļ�ciphertext.bin
# openssl enc -des3 -salt -in plaintext.doc -out ciphertext.bin

# ��DES3�㷨��OFBģʽ�����ļ�ciphertext.bin��
# �ṩ�Ŀ���Ϊtrousers��������ļ�plaintext.doc
# ע�⣺��Ϊģʽ��ͬ��������ܶ����ϵ��ļ����н���
# openssl enc -des-ede3-ofb -d -in ciphertext.bin -out plaintext.doc -pass pass:trousers

# ��Blowfish��CFBģʽ����plaintext.doc������ӻ�������PASSWORD��ȡ
# ������ļ�ciphertext.bin
# openssl bf-cfb -salt -in plaintext.doc -out ciphertext.bin -pass env:PASSWORD

# ���ļ�ciphertext.bin��base64���룬������ļ�base64.txt
# openssl base64 -in ciphertext.bin -out base64.txt

# ��RC5�㷨��CBCģʽ�����ļ�plaintext.doc
# ������ļ�ciphertext.bin��
# salt��key�ͳ�ʼ������(iv)��������ָ��
# openssl rc5 -in plaintext.doc -out ciphertext.bin -S C62CB1D49F158ADC -iv E9EDACA1BD7090C6 -K 89D4B1678D604FAA3DBFFD030A314B29

3,Diffie-HellmanӦ������


# ʹ����������2�������1024-bit����������D0ffie-Hellman����
# ������浽�ļ�dhparam.pem
# openssl dhparam -out dhparam.pem -2 1024

# ��dhparam.pem�ж�ȡDiffie-Hell��������C�������ʽ
# �����stdout
# openssl dhparam -in dhparam.pem -noout -C

������ 2014-08-21 10:14:33 - �����༭�����£���ӳ
������������
(0)
��ȷ
(0)
��4

4,DSAӦ������Ӧ������


# ����1024λDSA����������������ļ�dsaparam.pem
# openssl dsaparam -out dsaparam.pem 1024

# ʹ�ò����ļ�dsaparam.pem����DSA˽Կ�ף�
# ����3DES���ܺ�������ļ�dsaprivatekey.pem
# openssl gendsa -out dsaprivatekey.pem -des3 dsaparam.pem

# ʹ��˽Կ��dsaprivatekey.pem���ɹ�Կ�ף�
# �����dsapublickey.pem
# openssl dsa -in dsaprivatekey.pem -pubout -out dsapublickey.pem

# ��dsaprivatekey.pem�ж�ȡ˽Կ�ף����ܲ������¿�����м��ܣ�
# Ȼ��д���ļ�dsaprivatekey.pem
# openssl dsa -in dsaprivatekey.pem -out dsaprivatekey.pem -des3 -passin


5,RSAӦ������


# ����1024λRSA˽�ף���3DES������������Ϊtrousers��
# ������ļ�rsaprivatekey.pem
# openssl genrsa -out rsaprivatekey.pem -passout pass:trousers -des3 1024

# ���ļ�rsaprivatekey.pem��ȡ˽�ף��ÿ���trousers���ܣ�
# ���ɵĹ�Կ��������ļ�rsapublickey.pem
# openssl rsa -in rsaprivatekey.pem -passin pass:trousers -pubout -out rsapubckey.pem

# �ù�Կ��rsapublickey.pem�����ļ�plain.txt��
# ������ļ�cipher.txt
# openssl rsautl -encrypt -pubin -inkey rsapublickey.pem -in plain.txt -out cipher.txt

# ʹ��˽Կ��rsaprivatekey.pem��������cipher.txt��
# ������ļ�plain.txt
# openssl rsautl -decrypt -inkey rsaprivatekey.pem -in cipher.txt -out plain.txt

# ��˽Կ��rsaprivatekey.pem���ļ�plain.txtǩ����
# ������ļ�signature.bin
# openssl rsautl -sign -inkey rsaprivatekey.pem -in plain.txt -out signature.bin

# �ù�Կ��rsapublickey.pem��֤ǩ��signature.bin��
# ������ļ�plain.txt
# openssl rsautl -verify -pubin -inkey rsapublickey.pem -in signature.bin -out plain

# ��X.509֤���ļ�cert.pem�л�ȡ��Կ�ף�
# ��3DES����mail.txt
# ������ļ�mail.enc
# openssl smime -encrypt -in mail.txt -des3 -out mail.enc cert.pem

# ��X.509֤���ļ�cert.pem�л�ȡ�����˵Ĺ�Կ�ף�
# ��˽Կ��key.pem����S/MIME��Ϣmail.enc��
# ���������ļ�mail.txt
# openssl smime -decrypt -in mail.enc -recip cert.pem -inkey key.pem -out mail.txt

# cert.pemΪX.509֤���ļ�����˽��key,pemΪmail.txtǩ����
# ֤�鱻������S/MIME��Ϣ�У�������ļ�mail.sgn
# openssl smime -sign -in mail.txt -signer cert.pem -inkey key.pem -out mail.sgn

# ��֤S/MIME��Ϣmail.sgn��������ļ�mail.txt
# ǩ���ߵ�֤��Ӧ����ΪS/MIME��Ϣ��һ���ְ�����mail.sgn��
# openssl smime -verify -in mail.sgn -out mail.txt

