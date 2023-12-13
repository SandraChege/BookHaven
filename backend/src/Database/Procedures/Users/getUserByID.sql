CREATE OR ALTER PROCEDURE getUserById
	(@userID varchar(250))
AS

SET NOCOUNT ON;
BEGIN
	SELECT
        userID,
        email,
        fullname,
        username,
        phone_no						
		
	FROM Users  WHERE userID= @userID AND isDeleted = 0;
END;