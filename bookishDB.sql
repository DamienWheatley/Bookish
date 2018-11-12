-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Books'
--
-- ---

DROP TABLE IF EXISTS Books;

CREATE TABLE Books (
  Book_ID SERIAL,
  ISBN VARCHAR(17) NOT NULL DEFAULT 'NULL',
  On_Loan_BOOL BINARY NOT NULL,
  PRIMARY KEY (Book_ID)
);

-- ---
-- Table 'Titles'
--
-- ---

DROP TABLE IF EXISTS Titles;

CREATE TABLE Titles (
  ISBN VARCHAR(17) NOT NULL DEFAULT 'NULL',
  Book_ID_Books INTEGER NOT NULL DEFAULT NULL,
  Title VARCHAR(500) NOT NULL DEFAULT 'NULL',
  Author VARCHAR(500) NOT NULL DEFAULT 'NULL',
  Genre VARCHAR(500) NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (ISBN)
);

-- ---
-- Table 'Loans'
--
-- ---

DROP TABLE IF EXISTS Loans;

CREATE TABLE Loans (
  Loan_ID SERIAL,
  User_ID_Users INTEGER NOT NULL DEFAULT NULL,
  Book_ID_Books INTEGER NULL DEFAULT NULL,
  Loan_Date DATE(1000) NOT NULL DEFAULT 'NULL',
  Return_Date DATE(1000) NOT NULL DEFAULT 'NULL',
  On_Loan_BOOL BINARY NOT NULL,
  Overdue_BOOL BINARY NOT NULL,
  Fine_Amount DOUBLE(100) NOT NULL DEFAULT 0,
  PRIMARY KEY (Loan_ID, Status)
);

-- ---
-- Table 'Users'
--
-- ---

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  User_ID SERIAL,
  Forename VARCHAR(500) NOT NULL DEFAULT 'NULL',
  Surname VARCHAR(500) NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (User_ID)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE Books ADD FOREIGN KEY (Status_Loans) REFERENCES Loans (Status);
ALTER TABLE Titles ADD FOREIGN KEY (Book_ID_Books) REFERENCES Books (Book_ID);
ALTER TABLE Loans ADD FOREIGN KEY (User_ID_Users) REFERENCES Users (User_ID);
ALTER TABLE Loans ADD FOREIGN KEY (Book_ID_Books) REFERENCES Books (Book_ID);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE Books ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Titles ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Loans ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Users ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO Books (Book_ID,ISBN,Status_Loans) VALUES
-- ('','','');
-- INSERT INTO Titles (ISBN,Book_ID_Books,Title,Author,Genre) VALUES
-- ('','','','','');
-- INSERT INTO Loans (Loan_ID,User_ID_Users,Book_ID_Books,Loan_Date,Return_Date,Status,Fine_Amount) VALUES
-- ('','','','','','','');
-- INSERT INTO Users (User_ID,Forename,Surname) VALUES
-- ('','','');
