import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/Core/Services/book.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { SharedDataService } from 'src/app/Core/Services/shared-data.service';

@Component({
  selector: 'app-children-arabic-books',
  templateUrl: './children-arabic-books.component.html',
  styleUrls: ['./children-arabic-books.component.css']
})
export class ChildrenArabicBooksComponent implements  OnInit {
  isLogged:boolean = false;
  term: string = '';
  childernArabicBooks: any[] = [];
  filterdBooksByCategory: any[] = [];
  chips:string[]=['ALL'];

  cartLenght:number =0;


  constructor(private bookService: BookService,
    private authService:AuthService, 
    private cartService:CartService, 
    private router:Router,
    private sharedDataService:SharedDataService) {
    
  }
  ngOnInit(): void {
    this.bookService.getAllArabicChildEBooks().subscribe((res) =>{
      console.log("res",res);
      this.childernArabicBooks = res;
      this.filterdBooksByCategory = this.childernArabicBooks;
      this.childernArabicBooks.forEach(book => {
        if(!this.chips.includes(book.categoryName)) this.chips.push(book.categoryName);    
      });
    });  
  }

  getCategoryBooks(chipName:string){
    if(chipName == "ALL") this.filterdBooksByCategory = this.childernArabicBooks;
    else this.filterdBooksByCategory = this.childernArabicBooks.filter((book:any) => book.categoryName == chipName );
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
              console.log(`data from service in child ${ this.cartLenght}`);

      });

          },
          error:(error)=>{
            console.log(`data${error}`);
          }
        }

      )
        
    }
  })
  
}


}
