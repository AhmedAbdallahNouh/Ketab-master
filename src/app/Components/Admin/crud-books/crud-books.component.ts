import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/Core/Models/Author';
import { Book } from 'src/app/Core/Models/Book';
import { Category } from 'src/app/Core/Models/Category';
import { Publisher } from 'src/app/Core/Models/Publisher';
import { BookService } from 'src/app/Core/Services/book.service';

@Component({
  selector: 'app-crud-books',
  templateUrl: './crud-books.component.html',
  styleUrls: ['./crud-books.component.css']
})
export class CrudBooksComponent {
  categories: Category[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];

  books: Book[] = [];

  userForm !: FormGroup
  bookObj = <Book>{}

  /*category*/
  selectedCategory: any;
  changeCategory(e: any) {
    this.selectedCategory = e.target.value
  }

  /*Author*/
  selectedAuthor: any;
  changeAuthor(e: any) {
    this.selectedAuthor = e.target.value
  }

  /*Publisher*/
  selectedPublisher: any;
  changePublisher(e: any) {
    this.selectedPublisher = e.target.value
  }

  constructor(private fb: FormBuilder, private myservice: BookService) {
    this.getBooks()
    this.getAuthors()
    this.getCategories()
    this.getpublishers()

  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      describtion: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', Validators.required],
      page: ['', Validators.required],
      publisherDate: ['', Validators.required],
      authorFirstname: ['', Validators.required],
      authorLastname: ['', Validators.required],
      categoryName: ['', Validators.required],
      publisherName: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      poster: ['', Validators.required],
      mainCategory: ['', Validators.required],

      authorID: ['', Validators.required],
      publisherID: ['', Validators.required],
      categoryID: ['', Validators.required],
    });
  }

  imgurl: string = " "
  selectImage(e: any) {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event: any) => {
        this.imgurl = event.target.result;
        console.log(this.imgurl);
        this.userForm.get('poster')?.setValue(this.imgurl)
        console.log(this.imgurl);
      }
    }
  }

  /*** All Methods of Select Box***/
  getAuthors() {
    this.myservice.getAllAuthors().subscribe((data) => {
      this.authors = data
      console.log(this.authors);

    })
  }
  getpublishers() {
    this.myservice.getAllPublishers().subscribe((data) => {
      this.publishers = data
    })
  }

  getCategories() {
    this.myservice.getAllCategories().subscribe((data) => {
      this.categories = data
      console.log(this.categories);

    })
  }
  /*** End All Methods of Select Box***/

  /*Get All Books */
  getBooks() {
    this.myservice.getAllBooks().subscribe((data) => {
      this.books = data
      console.log(this.books);
    })
  }

  /*Add Book*/
  addNewBook() {
    this.bookObj.describtion = this.userForm.value.describtion;
    this.bookObj.title = this.userForm.value.title;
    this.bookObj.price = this.userForm.value.price;
    this.bookObj.page = this.userForm.value.page;
    this.bookObj.publisherDate = this.userForm.value.publisherDate;
    this.bookObj.arrivalDate = this.userForm.value.arrivalDate;
    this.bookObj.poster = this.userForm.value.poster;
    this.bookObj.mainCategory = this.userForm.value.mainCategory;
    this.bookObj.authorID = this.selectedAuthor;
    this.bookObj.publisherID = this.selectedPublisher;
    this.bookObj.categoryID = this.selectedCategory;

    console.log(this.bookObj);

    this.myservice.addNewBook(this.bookObj).subscribe((res) => {
      console.log(this.bookObj);
      console.log(res);
      this.getBooks()
      alert("Book added successfully");
      this.userForm.reset()
    })
  }

  /*Edit Book */
  updateBook(book: any) {
    this.userForm.patchValue({
      id: book.id,
      describtion: book.describtion,
      title: book.title,
      price: book.price,
      page: book.page,
      publisherDate: book.publisherDate,
      authorID: this.selectedAuthor,
      publisherID: this.selectedPublisher,
      categoryID: this.selectedCategory,
      arrivalDate: book.arrivalDate,
      mainCategory: book.mainCategory,
      poster: book.poster,
    })
    this.imgurl = book.poster
  }

  Update() {
    let updateBook = this.userForm.value;
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].id == updateBook.id) {
        this.books[i] = updateBook

        console.log(updateBook.id);
        console.log(this.books[i]);

        this.myservice.editBook(updateBook.id, this.books[i]).subscribe((res) => {
          console.log(res);
          this.getBooks()
          alert("Book updated successfully");
          this.userForm.reset()
        })
      }
    }

  }



  /*Delete Book*/
  deleteBook(id: number) {
    this.myservice.deleteBook(id).subscribe((res) => {
      console.log(res);
      this.getBooks()
      alert("deleted");
    })
  }
}
