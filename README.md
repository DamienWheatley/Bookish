Bookish

Bootcamp Project 5

Learning Objectives:
	•	Databases
	•	Creating a CRUD (create-read-update-delete) API
	•	Object-relational mappers (ORMs)


Project Brief:

Create a library management API that supports the following:

	•	Accessing the API should require an access token acquired by logging in (or registering).
	•	Show a list of books which are currently checked out in the user's name, and the due date for returns.
	•	Show the library catalogue. This shows a paged view of every book in the catalogue, ordered alphabetically.
	•	Search books by title or author.
	•	View the number of copies for a book in total, and the number which are currently available. Where some books are unavailable, it shows which user borrowed them, and the date that they're due back.
	•	Add new books by submitting the book's title, author(s), ISBN, and the number of copies owned by the library. After adding the book some barcode image(s) for the added book copies should be returned by the API so that these can be printed out on labels and stuck on the books.


Table : Users
	- PK : user ID
	- name

Table : Titles
 	- PK: ISBN (ID)
	- Title
	- author
	- list of copies by ID (array)
	- genre/section

Table : Books
	- PK: unique book IDs for multiple copies of the same title
	- FK: ISBN
  - on loan: true/false

Table : Loans
	- PK: loan ID
	- FK: user ID
	- FK: book ID
	- Loan date
	- Return date
	- Status (on loan, late return, returned)
	- fine amount : 0 default




	https://stackoverflow.com/questions/9875223/auto-increment-table-column


Made Schema using http://db.lewagon.com/ as a starting point and then editing the generated SQL.

Foreign keys need to be set up last due to depending on all tables being created first.

Querying the DB via pg-promises requires you to have a valid username and password, and the DB set up so that user either has ownership of the bookish DB or has permissions given to them by the DB owner.

				GRANT CONNECT ON DATABASE bookish TO bookish;
				GRANT USAGE ON SCHEMA public TO bookish;

				GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA public TO bookish;
				-- and the sequences, for INSERT to work
				GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO bookish;
				-- and the functions
				GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO bookish;

Querying the DB returns data in the form of an array of objects. We've made a class Titles.js which resembles the objects pulled down; will be useful for sending up records to add to the DB.



Part 4:

**JSON Web Token:https://jwt.io/introduction/**

After a user successfully logs in a JWT token is returned


3 parts separated by dots: xxxxx.yyyyy.zzzzz
Parts : Header.Payload.Signature

Header - contains info on the type of the token, hashing algorithm

			e.g.
			{
				"alg" : "HS256",
				"typ" : "JWT"
			}

Payload - contains the claims.
					Claims = info about the user + additional info.
					Claims names are 3 characters long

			e.g.
			{
				"sub" : "1234567890",
				"name" : "John Doe"
				"admin" : "true"
			}

Do not put secret information in the payload or header elements of a JWT unless it is encrypted. This data can't be tampered with but is readable by everyone.

Signature - "To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that."

			e.g.
			{
				base64UrlEncode(header) + "." +
				base64UrlEncode(payload),
				secret
			}


api
GET to see data in DB
POST to add records to DB


transactions to ensure book on loan isn't on shelf etc
https://github.com/vitaly-t/pg-promise#transactions
