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
	- user ID
	- name
	- current books on loan >> loan
	- owed fines

Table : Author
	-	author ID

<!-- Table : Library catalogue
	-	catalogue ID
	- title
	- Author
	- Total copies in Library
	- List of copies' IDs -->

Table : Books
	- unique book IDs for multiple copies of the same title
	- title
	- author
	- ISBN
	- genre/section
  - on loan: true/false
	- current loan >> entry in loan details Table
	- past loans >> entries in loan details Table

Table : Loans
	- loan ID
	- user ID
	- Loan date
	- Return date

Table : Loan details
	- loan ID
	- user ID
	- book ID
	- Loan date
	- Return date
	- Status (on loan, late return, returned)
	- fine due : true/false
	- fine amount
