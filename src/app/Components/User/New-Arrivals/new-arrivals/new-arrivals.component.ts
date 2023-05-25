import { Component } from '@angular/core';
import { BookService } from 'src/app/Core/Services/book.service';
import {  Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { SharedDataService } from 'src/app/Core/Services/shared-data.service';


@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.css']
})
export class NewArrivalsComponent {

  newArrivals:any[] = [];
  isLogged:boolean = false;

  constructor(private bookService:BookService,
    private router:Router,
    public authService:AuthService,
    private cartService:CartService,
    private sharedDataService: SharedDataService)
    {
    bookService.getNewArrivalBooks().subscribe((res) => {
      this.newArrivals = res.slice(0,16);
      console.log(res);
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
        });

        this.cartService.getUserShoppingCart(userId).subscribe((response) => {
        this.sharedDataService.setData(response.length);
        console.log(`shoping Cart Lenght : ${this.sharedDataService.getData()}`);     
           });
        
      }
    })
  }

}






  

  
  




