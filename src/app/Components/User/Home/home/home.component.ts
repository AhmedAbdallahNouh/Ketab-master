import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { AuthService } from 'src/app/Core/Services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLogged:boolean = false;
  constructor(
    private authService:AuthService, 
    private cartService:CartService, 
    private router:Router)
    {}

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
