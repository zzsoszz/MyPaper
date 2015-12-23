select merg.icompoundid,merg.iuserid,merg.nvcAgentId,merg.nvcPhoneNumber,merg.nvcDialedNumber,merg.nvcStation,merg.talktime/10000000 as talktime from 
(
select 
tall.iinteractionid,
tall.biInteractionDuration as talktime,
tall.dtInteractionLocalStartTime,
tall.dtInteractionLocalStopTime,
tvoice.icompoundid,
tall.nvcDialedNumber,
tpart.nvcPhoneNumber,
tpart.nvcStation,
tpart.nvcAgentId,
tpart.IUserID

 from 
(
	select * from tblinteraction${ses:vcsetnumber}
)
tall

left join 
(
	select * from tblcallinteraction${ses:vcsetnumber}
)
tvoice

on tall.iinteractionid=tvoice.iinteractionid


left join 
(
	select * from tblParticipant${ses:vcsetnumber}
)
tpart

on tall.iinteractionid=tpart.iinteractionid

) merg
where 
merg.nvcAgentId='6${ses:agentid}'
and merg.nvcPhoneNumber='${ses:ani}'
and merg.nvcDialedNumber='${ses:dn}'
and 
( 
	convert(char(8),merg.dtinteractionlocalstarttime,112)+convert(char(8),dateadd(minute,-5,merg.dtinteractionlocalstarttime),108)<'${ses:starttime}'
	and 
	'${ses:starttime}'< convert(char(8),merg.dtInteractionLocalStopTime,112)+convert(char(8),dateadd(minute,+5,merg.dtInteractionLocalStopTime),108)
)
and 
(
	convert(char(8),merg.dtinteractionlocalstarttime,112)+convert(char(8),dateadd(minute,-5,merg.dtinteractionlocalstarttime),108)<'${ses:endtime}'
	 and 
	'${ses:endtime}' < convert(char(8),merg.dtInteractionLocalStopTime,112)+convert(char(8),dateadd(minute,+5,merg.dtInteractionLocalStopTime),108)
)