CREATE OR ALTER PROCEDURE getUserByEmail
	(@email varchar(250))
AS

BEGIN
	SELECT	
        *
	FROM Users  WHERE email = @email AND isDeleted = 0;
END;