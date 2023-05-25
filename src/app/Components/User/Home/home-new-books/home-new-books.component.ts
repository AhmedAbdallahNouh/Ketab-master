import { Component, EventEmitter, Output } from '@angular/core';
import { BookService } from 'src/app/Core/Services/book.service';
BookService

@Component({
  selector: 'app-home-new-books',
  templateUrl: './home-new-books.component.html',
  styleUrls: ['./home-new-books.component.css']
})
export class HomeNewBooksComponent {
  newArrivals:any[] = [];
  @Output() item = new EventEmitter();

  constructor(private bookService:BookService){
    bookService.getNewArrivalBooks().subscribe((res) => {
      this.newArrivals = res.slice(0,4);
      console.log(res);
    });

  }
}
