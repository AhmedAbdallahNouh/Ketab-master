import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { BookService } from 'src/app/Core/Services/book.service';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  Id:any;
  bookDetails:any={};
  selectedQuantity:any;
  isLogged:boolean = false;


  constructor(
    private bookService:BookService, 
    private Route:ActivatedRoute,
    private router:Router,
    public authService:AuthService,
    private cartService:CartService)
    {
    this.Id = Route.snapshot.paramMap.get('id');
    bookService.getBookDetails(this.Id).subscribe((res) =>{
      this.bookDetails = res;
      console.log("id = ",this.Id);
    })
  }

  addToCart(bookId:any, book:any){
    this.authService.currentUserData.subscribe(() =>{
      if(this.authService.currentUserData.getValue() == null){
        this.isLogged = false;
        this.router.navigate(['/login'])
      }else{
        this.isLogged = true;
        //send it to DB
        let userId = localStorage.getItem("userId");
        let amount = 1;

        let cartData = {
          userId:userId,
          bookId:bookId,
          amount:amount
        }
        this.cartService.addToShoppingCart(cartData).subscribe((res)=>{
          alert("successfully Added")
        })
      }
    })
  }
 

  
}
