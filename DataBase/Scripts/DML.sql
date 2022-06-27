use UsersData
go

--Type
insert into type(typeName)
values ('Geral'),('Admin'),('Root');
go

--Status
insert into status(statusName)
values ('Ativo'),('Inativo');
go

--UserU
insert into userU(idType, idStatus, nameUser, email, passwd)
values  (1, 1, 'Anthony', 'anthony.stark@gmail.com', '123456'), 
		(2, 1, 'Heisenberg', 'walter.white@gmail.com', '123456'),
		(3, 1, 'Matheus', 'matheus.martins@gmail.com', '123456');
go