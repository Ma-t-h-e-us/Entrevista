--DDL
create database UsersData
go

use UsersData
go

--TipoDeUsuarios
create table type(
	idType int primary key identity(1,1),
	typeName varchar(150) unique not null
);
go

--Status
create table status(
	idStatus int primary key identity(1,1),
	statusName varchar(150) unique not null
);
go

--Usuarios
create table userU(
	idUser int primary key identity(1,1),
	idType int foreign key references type(idType),
	idStatus int foreign key references status(idStatus),
	nameUser varchar(150) not null,
	email varchar(256) unique not null,
	passwd varchar(100) not null
);
go