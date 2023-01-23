# schema-registry
Schema Registry Tool

UI
List of Screens we need to support
Login
View Schemas
Edit Schema
Add Schema
View Schema
View Version History

API
List of API's supporting Schema Registry
GET /resources
POST /login
GET  /schema
GET  /schema/id
POST /schema 
POST /schema/id 

DB
List of tables required
Resource
	id: varbinary
	page: varchar(400)
	key: varchar(400)
	value: varchar(2000)
    createdon: datetime
	createdby: varchar(400)
	modifiedon: datetime
	modifiedby: varchar(400)
User
	userid: varchar(400)
	passwordHash: varchar(2000)
	active: varchar(10)
	name: varchar(400)
	createdon: datetime
	createdby: varchar(400)
	modifiedon: datetime
	modifiedby: varchar(400)

    INSERT INTO `User` (`userid`, `passwordHash`, `active`, `name`, `createdOn`, `createdBy`, `modifiedOn`, `modifiedBy`) VALUES ('varsha', MD5('password'), 'Y', 'Varsha Nagesh', '2023-01-23 00:00:00', 'varsha', '2023-01-23 00:00:00', 'varsha');


Schemas
	id: varbinary
	name: varchar(400)
	version: varchar(10)
	schema: varchar(2000)
	active: varchar(10)
	createdon: datetime
	createdby: varchar(400)
	modifiedon: datetime
	modifiedby: varchar(400)


Todo's:
DB
1. Create Table Schemas and Resource
NodeJS
1. Create API Project Structure and verify using POSTMAN
