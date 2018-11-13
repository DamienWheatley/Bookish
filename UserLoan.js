class UserLoan {

  constructor(loan_id, user_id, loan_date, return_date, forename, surname, book_id, title, isbn){
    this.loan_id = loan_id;
    this.user_id = user_id;
    this.loan_date = loan_date;
    this.return_date = return_date;
    this.forename = forename;
    this.surname = surname;
    this.book_id = book_id;
    this.title = title;
    this.isbn = isbn;

  }
}

exports.UserLoan = UserLoan;
