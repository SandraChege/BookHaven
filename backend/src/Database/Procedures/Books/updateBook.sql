CREATE OR ALTER PROCEDURE updateBook
(   @bookID VARCHAR(255),
      @author VARCHAR(255),
      @genre VARCHAR(255),
      @content VARCHAR(8000),
      @bookImage VARCHAR(255),
      @title VARCHAR(500),
      @userID VARCHAR(255),
      @series VARCHAR(500)
)
as

SET NOCOUNT ON;

BEGIN
	UPDATE Books
	SET 
	
      bookID = @bookID,
      author = @author,
      genre = @genre ,
      content = @content,
      bookImage = @bookImage,
      title = @title,
      series = @series,
      userID = @userID
	
	WHERE bookID= @bookID AND userID = @userID ;
END;