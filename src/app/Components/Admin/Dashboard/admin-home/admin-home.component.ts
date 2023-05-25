import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/Core/Models/Author';
import { Book } from 'src/app/Core/Models/Book';
import { Category } from 'src/app/Core/Models/Category';
import { Publisher } from 'src/app/Core/Models/Publisher';
import { HomeService } from 'src/app/Core/Services/home.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  categories: Category[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
  books: Book[] = [];
  totalPrice: string = ''
  constructor(private myservice: HomeService) {

  }

  ngOnInit(): void {
    this.getBooks()
    this.getAuthors()
    this.getCategories()
    this.getpublishers()
    this.getTotalPrice()
  }

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

  /*Get All Books */
  getBooks() {
    this.myservice.getAllBooks().subscribe((data) => {
      this.books = data
      console.log(this.books);
    })
  }

  getTotalPrice() {
    this.myservice.getTotalPrice().subscribe((data) => {
      this.totalPrice = data
      console.log(this.totalPrice);
    })
  }
}
