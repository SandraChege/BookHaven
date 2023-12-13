CREATE TABLE Books 
(
    bookID VARCHAR (255) PRIMARY KEY,
    userID VARCHAR (255),
    title VARCHAR(500),
    series VARCHAR (500),
    author VARCHAR(255),
    genre VARCHAR(255),
    bookImage VARCHAR(255),
    content VARCHAR(8000),
    isDeleted BIT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (userID) REFERENCES Users(userID)    
);

SELECT * FROM Books;
DROP TABLE Books;