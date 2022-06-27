--DQL
use UsersData
go

--Type
select * from userType order by idType;
go

--Status
select * from userStatus order by idStatus;
go

--UserU
select * from userU order by idUser;

select nameUser, email, statusName from
userU inner join userStatus u on userU.idStatus = u.idStatus
go