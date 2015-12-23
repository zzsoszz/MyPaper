/*
create database design;

create table employee
(
	eid int identity(1,1),
	ename varchar(50),
	ebumen int,
)
create table bumen
(
	bid int,
	bname varchar(50)
)
*/

--select * from employee  as e left join bumen  as b  on e.ebumen=b.bid 
--where e.ename like '李%'
--where ename like '李%'


select e1.ename,Boss=
	case
	when e2.ename!=null then e2.ename
	else '无'
	end 
from employee as e1 left join employee as e2 on e1.bossid=e2.eid

select e1.ename,e2.ename
from employee as e1 left join employee as e2 on e1.bossid=e2.eid

USE pubs

SELECT   Category =
      CASE type
         WHEN 'business' THEN 'Business'
	 when 'null' then '无'
      END
FROM titles

