---- Setting permissions / Alternative to setting bookish as owner of each individual table in the DB

GRANT CONNECT ON DATABASE bookish TO bookish;
GRANT USAGE ON SCHEMA public TO bookish;

GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA public TO bookish;
-- and the sequences, for INSERT to work
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO bookish;
-- and the functions
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO bookish;


---- Example records in each Table

INSERT INTO Titles VALUES ('978-3-16-148410-0', 'Harry Potter', 'JK Rowling', 'Fantasy');

INSERT INTO Books(ISBN, On_Shelf) VALUES ('978-3-16-148410-0', FALSE);
INSERT INTO Books(ISBN, On_Shelf) VALUES ('258-5-76-344453-2', FALSE);
INSERT INTO Books(ISBN, On_Shelf) VALUES ('258-5-76-543345-2', FALSE);
INSERT INTO Books(ISBN, On_Shelf) VALUES ('978-4-78-56334-2', TRUE);
INSERT INTO Books(ISBN, On_Shelf) VALUES ('124-3-76-134235-4', TRUE);

INSERT INTO Users(Forename, Surname) VALUES ('Bob', 'Bloggs');
INSERT INTO Users(Forename, Surname) VALUES ('Joe', 'Bloggs');

INSERT INTO Loans(User_ID, Book_ID, Loan_Date, Return_Date, Loan_Status) VALUES (1, 1, '12/11/2018', '1/12/2018', 'On Loan');


SELECT * FROM Users;



--------Using transactions to ensure book taken off shelf when loaned output
BEGIN;
INSERT INTO Loans(User_ID, Book_ID, Loan_Date, Return_Date, Loan_Status) VALUES (2, 4, '12/12/2018', '2/13/2018', 'On Loan');
UPDATE Books SET on_shelf = FALSE WHERE book_id = 4;
COMMIT;
