CREATE or alter PROCEDURE getBooks
	
as

set nocount on;

begin
	select *  from Books 
    where isDeleted = 0
   
end;