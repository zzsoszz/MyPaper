select vcSetNumber as vcsetnumber
  from tblinteractioncatalog

 where

	(
		'${ses:starttime}' <= convert(char(8), dtMinStartTime, 112) + convert(char(8), dtMinStartTime, 108)
		and 
		'${ses:endtime}' >=convert(char(8), dtMinStartTime, 112) + convert(char(8), dtMinStartTime, 108)
	)
	or
	(
	   '${ses:starttime}' <= convert(char(8), dtMaxStartTime, 112) + convert(char(8), dtMaxStartTime, 108)
		and
	   '${ses:endtime}' >=convert(char(8), dtMaxStartTime, 112) + convert(char(8), dtMaxStartTime, 108)
	)
	or 
	(
		'${ses:starttime}' >=convert(char(8), dtMinStartTime, 112) + convert(char(8), dtMinStartTime, 108)
		and 
		'${ses:endtime}' <=convert(char(8), dtMaxStartTime, 112) + convert(char(8), dtMaxStartTime, 108)
	)
