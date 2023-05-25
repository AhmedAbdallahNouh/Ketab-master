import { Component, AfterViewInit, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { BookService } from 'src/app/Core/Services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as $ from 'jquery';
import { SharedDataService } from 'src/app/Core/Services/shared-data.service';

@Component({
  selector: 'app-english-books',
  templateUrl: './english-books.component.html',
  styleUrls: ['./english-books.component.css']
})
export class EnglishBooksComponent  implements AfterViewInit, OnInit {
  term: string = '';
  isLogged:boolean = false;
  EnglishBooks: any[] = [];
  filterdBooksByCategory: any[] = [];
  chips:string[]=['ALL'];

  cartLenght:number =0;



  constructor(
    private bookService: BookService,
    private authService:AuthService, 
    private cartService:CartService, 
    private router:Router,
    private elementRef: ElementRef,
    private sharedDataService:SharedDataService )
    {
     
  
  }
  ngOnInit(): void {
    this.bookService.getAllEnglishBooks().subscribe((res) =>{
      console.log("res",res);
      this.EnglishBooks = res;
      this.filterdBooksByCategory = this.EnglishBooks;
      this.EnglishBooks.forEach(book => {
        if(!this.chips.includes(book.categoryName)) this.chips.push(book.categoryName);    
      });
    });
  }
  ngAfterViewInit(): void {
    $(function() {
      $('.btn').click(function() {
        $(this).css('background-color', 'red');
      });
    });
  }

  getCategoryBooks(chipName:string){
    if(chipName == "ALL") this.filterdBooksByCategory = this.EnglishBooks;
    else this.filterdBooksByCategory = this.EnglishBooks.filter((book:any) => book.categoryName == chipName );
  }

  addToCart(bookId:any, book:any){
    this.authService.currentUserData.subscribe(() =>{
      if(this.authService.currentUserData.getValue() == null){
        this.isLogged = false;
        this.router.navigate(['/login'])
      }else{
        this.isLogged = true;
        // this.cartService.cartLength++
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

        )
          
       


        // this.cartService.addToShoppingCart(cartData).subscribe((res)=>{
        //   alert("successfully Added");
        // });

        // this.cartService.getUserShoppingCart(userId).subscribe((response) => {
        //   if(response.length == 0){
        //     this.cartLenght =1;
        //   }
        //   else{
        //    this.cartLenght = response.length;
        //   } 
        //   this.sharedDataService.sharedValue.next(this.cartLenght);
        //   // this.sharedDataService.setData(this.cartLenght);
        //   console.log(`data from service in child ${ this.cartLenght}`);

        // });


      }
    })
    
  }


}
