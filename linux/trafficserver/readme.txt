http://pkgs.org/centos-6/ghettoforge-plus-x86_64/trafficserver-5.3.0-1.gf.el6.x86_64.rpm.html




    Download the latest gf-release rpm from

    http://mirror.symnds.com/distributions/gf/el/6/plus/x86_64/

    Install gf-release rpm:

    # rpm -Uvh gf-release*rpm

    Install trafficserver rpm package:

    # yum --enablerepo=gf-plus install trafficserver


	
	
rpm -Uvh trafficserver-5.3.0-1.gf.el6.x86_64.rpm 
vi  /etc/trafficserver/records.config 