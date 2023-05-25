import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { BookService } from 'src/app/Core/Services/book.service';
import { SharedDataService } from 'src/app/Core/Services/shared-data.service';

@Component({
  selector: 'app-arabic-books',
  templateUrl: './arabic-books.component.html',
  styleUrls: ['./arabic-books.component.css']
})
export class ArabicBooksComponent implements OnInit {
  isLogged:boolean = false;
  term: string = '';
  ArabicBooks: any[] = [];
  filterdBooksByCategory: any[] = [];
  chips:string[]=['الكل'];

  cartLenght:number =0;


  constructor(private bookService: BookService,
    private authService:AuthService, 
    private cartService:CartService, 
    private router:Router,
    private sharedDataService:SharedDataService ) {
  
  }
  ngOnInit(): void {
    this.bookService.getAllArabicBooks().subscribe((res) =>{
      console.log("res",res);
      this.ArabicBooks = res;
      this.filterdBooksByCategory = this.ArabicBooks;
      this.ArabicBooks.forEach(book => {
        if(!this.chips.includes(book.categoryName)) this.chips.push(book.categoryName);    
      })
    });
  }
  // getAllArabic(){
  //   this.bookService.getAllArabicBooks().subscribe((res) =>{
  //     console.log("res",res);
  //     this.ArabicBooks = res;
  //   });
  // }
  getCategoryBooks(chipName:string){
    console.log(chipName);
    if(chipName == "الكل") this.filterdBooksByCategory = this.ArabicBooks;
    else this.filterdBooksByCategory = this.ArabicBooks.filter((book:any) => book.categoryName == chipName );
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
      this.cartService.addToShoppingCart(cartData).subscribe(
        {
          next:(data)=>{
            console.log(`data${data}`);
            alert("successfully Added");
            this.cartService.getUserShoppingCart(userId).subscribe((response) => {
              if(response.length == 0){
              this.cartLenght =1;
              }
              else{
              this.cartLenght = response.length;
              } 
              this.sharedDataService.sharedValue.next(this.cartLenght);
        // this.sharedDataService.setData(this.cartLenght);
              console.log(`data from service in child ${ this.cartLenght}`);

      });

          },
          error:(error)=>{
            console.log(`data${error}`);
          }
        }

      );
    }
  })
  
}
}
