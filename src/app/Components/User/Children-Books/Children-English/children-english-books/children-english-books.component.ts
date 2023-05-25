import { Component } from '@angular/core';
import { BookService } from 'src/app/Core/Services/book.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-children-english-books',
  templateUrl: './children-english-books.component.html',
  styleUrls: ['./children-english-books.component.css']
})
export class ChildrenEnglishBooksComponent {
  term: string = '';
  isLogged:boolean = false;
  EnglishBooks: any[] = [];
  Chips:string[]=['3 to 6 years ', '6 to 10 years ', 'Educational'];

  constructor(private bookService: BookService,
    private authService:AuthService, 
    private cartService:CartService, 
    private router:Router) {
    this.bookService.getAllEnglishChildEBooks().subscribe((res) =>{
      console.log("res",res);
      this.EnglishBooks = res;
    });
  }
  getAllEnglish(){
    this.bookService.getAllEnglishChildEBooks().subscribe((res) =>{
      console.log("res",res);
      this.EnglishBooks = res;
    });
  }
  getCategoryBooks(name:string){
    this.bookService.getChildEBooksCategories(name).subscribe((res) =>{
      console.log("category", res);
      this.EnglishBooks = res;
    });
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
