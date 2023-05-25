import { Component } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { BookService } from 'src/app/Core/Services/book.service';
import { SharedDataService } from 'src/app/Core/Services/shared-data.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{
  cartItems:any[]= [];
  Total:number=0;

  items:any[]=[];
  quantity:any;
  totalItem:number=0;

  cartLenght:number =0;

  
  constructor(private cartService:CartService, private bookService:BookService, private sharedDataService:SharedDataService){
    let userId = localStorage.getItem("userId");
    cartService.getUserShoppingCart(userId).subscribe((response) => {
      this.cartItems = response;
      console.log("cart items", this.cartItems);

      this.cartItems.forEach(item=>{
        console.log(`price : ${item.price}, amount : ${item.amount}`);

        this.Total += item.price * item.amount; 
      });
      // this.Total = cartService.getCartTotal();
      console.log("res get all from cart", response);
      console.log("res lengh", cartService.cartLength);
    });

}


  clearCart(){
    let userId = localStorage.getItem("userId");
    this.cartService.DeleteAllItems(userId).subscribe();
    this.cartItems = [];
    this.Total =0;
    alert("Cleared");

    //Set CartLenght In
    this.sharedDataService.sharedValue.next(this.cartLenght =0);
          console.log(`data from service in child ${ this.cartLenght}`);
  }

  deletItem(index:any, bookId:any){
    let userId = localStorage.getItem("userId");
    
    this.cartService.DeleteShoppingCartItem(bookId,userId).subscribe();
    this.cartService.getUserShoppingCart(userId).subscribe((response) => {
      this.cartLenght = response.length-1;
      this.sharedDataService.sharedValue.next(this.cartLenght);

      console.log(`cart lenght ctor${this.cartLenght}`); 
  
      });
    this.cartItems.splice(index,1);

    this.cartService.getCartTotal().subscribe((grandTotal) => {
      this.Total = grandTotal;
    });
    alert("Deleted");

    // this.cartService.DeleteShoppingCartItem(bookId,userId).subscribe()
    // this.cartItems.splice(index,1);
    // alert("Deleted");
   
  }

  
  getQuantityValue(bookId:any ,value:any){
    this.quantity = value;
    let userId = localStorage.getItem("userId");
        let cartData = {
          userId:userId,
          bookId:bookId,
          amount:value
        }
        this.cartService.updateShoppingCart(cartData).subscribe((res)=>{
          console.log("response",res);
          this.cartService.getCartTotal().subscribe((grandTotal) => {
            this.Total = grandTotal;
          });
          console.log("total", this.Total);


          
        });
        
  }


}
