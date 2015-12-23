select
	t.ANI as ani,
	t.DN as dn,
	to_char(t.CALL_DATE,'yyyyMMddHH24:mi:ss') as starttime, 
        to_char(t.DROP_DATE,'yyyyMMddHH24:mi:ss')  as endtime,
	t.USERLOGIN as agentid
from 
     ${ses:cti_table_name}  t
where 
	  1=1
and
	  t.call_id=${fld:call_id}
and rownum=1