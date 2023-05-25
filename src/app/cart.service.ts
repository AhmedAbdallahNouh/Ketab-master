import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];
  cartLength :any;
  private grandTotal =0;
  private dataToSend:any;
  private  cartItems:any[]= [];
  itemsarry =new BehaviorSubject(this.items)
  isDubblicated:boolean = false;
  

  constructor(private http:HttpClient) {
    let userId = localStorage.getItem("userId");
    this.getUserShoppingCart(userId).subscribe((response) => {
    this.items = response;
    this.cartLength = this.items.length;
      
      
    })
    // this.cartLength = this.items.length;
    console.log(this.items.length);
    console.log(this.cartLength);

  }

  addToShoppingCart(data:any):Observable<any>{
    return this.http.post(`https://localhost:7248/api/ShopingCart`, data)
  }

  updateShoppingCart(data:any):Observable<any>{
    return this.http.put(`https://localhost:7248/api/ShopingCart`,data);
  }

  getUserShoppingCart(id:any):Observable<any>{
    return this.http.get(`https://localhost:7248/api/ShopingCart?userId=${id}`)
  }

  DeleteShoppingCartItem(bookId:any, userId:any):Observable<any>{
    return this.http.delete(`https://localhost:7248/api/ShopingCart?bookId=${bookId}&userId=${userId}`)
  }
  DeleteAllItems(userId:any):Observable<any>{
    return this.http.delete(`https://localhost:7248/api/deleteAllShopingCart?userId=${userId}`)
  }

  addOrder(data:any):Observable<any>{
    return this.http.post(`https://localhost:7248/api/orderNow`, data)
  }

  // getCartTotal():number{
  //   let userId = localStorage.getItem("userId");
  //   let grandTotal = 0;
  //   this.getUserShoppingCart(userId).subscribe((response) => {
  //     this.items = response;
  //     this.items.map((t) => {
  //       grandTotal += t.price * t.amount;
  //       console.log(`INside GRAND : ${grandTotal}`);
  //     });
  //     console.log(`OUTside GRAND : ${grandTotal}`);

  //   });
     
  //     return grandTotal
  //   }

  getCartTotal(): Observable<number> {
    let userId = localStorage.getItem("userId");
    let grandTotal = 0;
    return this.getUserShoppingCart(userId).pipe(
      tap((response) => {
        this.items = response;
        this.items.map((t) => {
          grandTotal += t.price * t.amount;
          console.log(`INside GRAND : ${grandTotal}`);
        });
        console.log(`OUTside GRAND : ${grandTotal}`);
      }),
      map(() => grandTotal)
    );
  }   
}
