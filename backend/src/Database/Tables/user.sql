CREATE TABLE Users (
    userID VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    fullname VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    phone_no NUMERIC(20) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(255) DEFAULT 'user',
    profileUrl VARCHAR(255) DEFAULT 'no-image',
    profileCaption VARCHAR(5000) DEFAULT 'No Caption',
    isWelcomed BIT DEFAULT 0,
    isDeleted BIT DEFAULT 0,
    resetPassword BIT DEFAULT 0,
    OTP vARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM Users;

-- UPDATE Users
-- set role = 'admin'
-- where email = '9superbikes@gmail.com'

DROP TABLE Users;