CREATE OR ALTER  PROCEDURE deleteBook
	@bookID varchar(255)
AS

SET NOCOUNT ON

BEGIN
	UPDATE Books
	SET isDeleted = 1
	
	WHERE bookID = @bookID AND isDeleted = 0;
END;