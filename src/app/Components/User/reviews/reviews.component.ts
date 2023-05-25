import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/Core/Services/book.service';




@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  






  id:any;
  bookReviews:any={} ;
  isLogged:boolean = false;

comment : any [] = [] ;

  constructor(private bookService:BookService){

    bookService.getAllReview().subscribe((data) => {
    
      this.comment = data;
      console.log(data);
     
      
    });
    
 

   
  


  
  }

}





 




function reveiw() {
  throw new Error('Function not implemented.');
}

