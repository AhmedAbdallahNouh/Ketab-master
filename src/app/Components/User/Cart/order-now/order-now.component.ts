import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/cart.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';




@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.css']
})
export class OrderNowComponent {
  order:any[ ]= [];
  Total!:any;
  subTotal!:any;
  shipping:number= 0;
  
  date:any = new Date();
  arraivDate:any = new Date();
  shippingArival:any;



constructor(private cartService:CartService, private datePipe :DatePipe , private router:Router){

  let userId = localStorage.getItem("userId");
    cartService.getUserShoppingCart(userId).subscribe((response) => {
      this.order = response;
      this.Total = cartService.getCartTotal();
      this.subTotal = cartService.getCartTotal();
      console.log("res get all from cart", response);
    });
}

checkoutForm :FormGroup = new FormGroup({
  firstName: new FormControl(null, [Validators.minLength(3), Validators.required, Validators.pattern('^[A-Z][a-z]+')]),
  lastName : new FormControl(null,[Validators.minLength(3), Validators.required, Validators.pattern('^[A-Z][a-z]+')]),
  phoneNumber : new FormControl(null,[Validators.required,Validators.pattern('^01[0125][0-9]{8}$')]),
  city : new FormControl(null,[Validators.required]),
  street : new FormControl(null,[Validators.required]),
  state : new FormControl(null),
  extra : new FormControl(null)
});

  onChangeA(e:any){
    this.shipping = 100;
    this.shippingArival =this.arraivDate.setDate(this.arraivDate.getDate()+ 1)
    this.Total =this.subTotal
    if(e.target.value === 'overnight'){
      this.Total += 100;
    }
    
  }
  onChangeB(e:any){
    this.shipping = 50;
    this.shippingArival =this.arraivDate.setDate(this.arraivDate.getDate()+ 2)
    this.Total =this.subTotal
    if(e.target.value === '2Days'){
      this.Total += 50;
    }
    
  }

  OnOrderNow(){
    let userId = localStorage.getItem("userId");
    let descount = 0;
    let shippingDate = this.datePipe.transform(this.date,"yyyy-MM-dd");
    let arraivDate = this.datePipe.transform(this.shippingArival,"yyyy-MM-dd");

    let orderData = {
      userId:userId,
      discount:descount,
      shopingcost:this.shipping,
      shopingDate:shippingDate,
      arrivalDate:arraivDate
    }
    console.log("order info",orderData);
    this.cartService.addOrder(orderData).subscribe();
    this.router.navigate(['/checkout'])

  }
}
