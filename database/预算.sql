create database yusuan;
use yusuan;
create table Items
(
	item_nbr int,
	item_descr varchar(50)
	
)
insert into Items values(10,'item10')
insert into Items values(20,'item20')
insert into Items values(30,'item30')
insert into Items values(40,'item40')
select * from Items

create table Actuals
(
	item_nbr int,
	actual_amt money,
	check_nbr varchar(50)
)
insert into Actuals values(10,300.00,'1111')
insert into Actuals values(20,325.00,'2222')
insert into Actuals values(20,300.00,'3333')
insert into Actuals values(30,525.00,'1111')
select * from Actuals

create table Estimates
(
	item_nbr int,
	estimated_amt money
)
insert into Estimates values(10,300.00)
insert into Estimates values(10,50.00)
insert into Estimates values(20,325.00)
insert into Estimates values(20,110.00)
insert into Estimates values(40,25.00)
select * from Estimates

select i.item_nbr,i.item_descr from Items as i
--实际费用
select a.item_nbr,sum(a.actual_amt) from Actuals as a group by a.item_nbr
--预算费用
select e.item_nbr,sum(e.estimated_amt) from Estimates as e group by e.item_nbr


-- 子查询行自适应父查询
select a.item_nbr,sum(a.actual_amt) from Actuals as a group by a.item_nbr

select * from 
(
select i.item_nbr,i.item_descr
	,(select sum(a.actual_amt) from Actuals a where a.item_nbr=i.item_nbr)
	,(select sum(e.estimated_amt) from Estimates e where e.item_nbr=i.item_nbr)
from Items as i order by item_nbr desc
) as Aa (i,d,a,e,c)
