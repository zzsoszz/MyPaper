http://www.ruanyifeng.com/blog/2012/08/how_to_read_diff.html


[root@localhost dropbear-2014.66]# mkdir /etc/dropbear
[root@localhost dropbear-2014.66]# /usr/local/bin/dropbearkey -t dss -f /etc/dropbear/dropbear_dss_host_key
Generating key, this may take a while...
Public key portion is:
ssh-dss AAAAB3NzaC1kc3MAAACBANjuQK8H+2I29we5aDJesO93E6DtEgJhnN+LovSnxLsly30Isqhj88/47u+6pIFibGKmiYxrv0AQdIJdgdaB7G9wudIi+Wuh3kUU8Kt76wVlD+SP6288cnaSHkuXFiGSC4Mm3NjqFYtiEGJSzda0H3smM0JWqTwX17SxxxVHj0L5AAAAFQCvzAsVit0fQ8rjkSA6v6PdUugGJQAAAIEAtquHzGPhsaIJJOGSqE0BTwxnt/gJHmzhVAoEJUmu1+NiagWE4jp1ITIFM1CKJHJE0VvPVX4/SfTEvSyRfdpyuv63JxBdpcUqdN/wmzJX3Ev+nI85mJo+KKw/PceHNYulvTHHXxxg18uuTqsU13eqgm3P/EMP9OdcT1o51Qj1CUEAAACBAJGYkyhvbX7ald3+TbwS5JodK/nTDbglaj8Gr4/d/oP3n2SrhJXvgfMpRQYJe/D/ficzs51hS4Wp25H3KPBTbG+gng3AMRtCb1jlSKzdB3ykf8jWKgLYGp8O4HoWoXjteCUO/vYUvdCRf35xmWTjUfoARKYeks2Oi0ruupHnlWjq root@localhost
Fingerprint: md5 34:6c:39:41:da:d2:41:0f:42:79:27:24:c3:37:93:8d
[root@localhost dropbear-2014.66]# /usr/local/bin/dropbearkey -t rsa -s 4096 -f /etc/dropbear/dropbear_rsa_host_key
Generating key, this may take a while...
Public key portion is:
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCwIlvyOWgfpZwZzYqdOyiP+zP5Sj+jfEL42uHg7zyIsClCWahBZosvPjuAzNu/EhpOGY0RX/+gMWULFbaHBw+mowhdgDuC8bqUtV7aUgtpVE5Z15lPUNRcW9eXNc5AekrWRYPYXMS7xM/gowfPXy+Cm7+zR+wAOWK2XzyQrbfn7kx1HkwOAdap461jdeY1hRD1mp+lMCgtz8MkScDdARvpakywpDUAgayyB3S+oXXn6EuYMCn+M6XIsi0l99lfNStTNhKADGwuJlFq8+DDSOKYN9t8UpQUyMjQhAkMGWxHcgHR995f8j7E8almfTUWxEQMn8Q6xCGyF3HOB/+3beRrBX+XMnFS8A17uDJ9ZzvOfkzLNSSkJ3TwZWCQlQdGTk+OokRqj6v4ooq6LYGeMvSbZz3WLp5QB2jEavndaz7KsLQ4B9LBZ/lauPcwjLzwV1YD5eL10uwcyB1sk+GruZViSDXrvpMABohrbtfADOq5R4NTJSe44HlIjQ0z03R/0yZo1CDpD8lU2bFbirclsjAvuZ1i3teqp6wFRGu6Qpsl3JCZOfTzKQ37a2ydQI1cVaBaL3wo8KNjBWAFzlLdTwV4PW8mR8hNuUHlVZ3Mo9J3PV6Clo0nfzDpyIFdnOzMJMQtUZX76qwsy1tT3a6S4hUS8zeCgHTqwKktRSjBOhtdvQ== root@localhost
Fingerprint: md5 95:0b:b3:6f:ce:52:25:da:aa:b5:c9:3a:11:42:b4:61
You have new mail in /var/spool/mail/root
[root@localhost dropbear-2014.66]# /usr/local/sbin/dropbear -p 2222


