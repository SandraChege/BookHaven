CREATE OR ALTER PROCEDURE createBook
(   @bookID VARCHAR(255),
      @author VARCHAR(255),
      @genre VARCHAR(255),
      @content VARCHAR(8000),
      @bookImage VARCHAR(255),
      @title VARCHAR(500),
      @userID VARCHAR(255),
      @series VARCHAR (500)
)
    
AS

BEGIN
    set nocount on;

    INSERT INTO Books (bookID, author, genre, content, bookImage, title, userID, series)
    VALUES (@bookID, @author, @genre, @content, @bookImage, @title, @userID, @series)
END

DROP PROCEDURE createBook