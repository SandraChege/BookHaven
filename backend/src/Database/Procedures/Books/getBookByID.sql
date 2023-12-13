CREATE or alter PROCEDURE getBookById
	@bookID VARCHAR(255)
as

set nocount on;

begin
	select *  from Books  
	
    where bookID = @bookID and isDeleted = 0
   
end;