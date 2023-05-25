import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { SharedDataService } from 'src/app/Core/Services/shared-data.service';



@Component({
  selector: 'app-navbare',
  templateUrl: './navbare.component.html',
  styleUrls: ['./navbare.component.css']
})
export class NavbareComponent implements OnInit {

  isLogged:boolean = false;
  navBarCartLength:any;
  
  constructor(public authService:AuthService, private router:Router, public cartService:CartService, private sharedDataService: SharedDataService){

    authService.currentUserData.subscribe(() =>{
      if(authService.currentUserData.getValue() == null){
        this.isLogged = false;
        console.log("is not loged");

      }else{
        this.isLogged = true;
        console.log("is loged");
      
      }
     
    });
    
    
    
  }
  
  
  ngOnInit(): void {
    let userId = localStorage.getItem("userId");
    console.log(`shared value${userId}`); 

    this.cartService.getUserShoppingCart(userId).subscribe((response) => {
    this.navBarCartLength = response.length;
    console.log(`cart lenght ctor${this.navBarCartLength}`); 

    });

    
    this.sharedDataService.sharedValue.subscribe((sharedValue:any) => {
      console.log(`shared value${sharedValue}`); 
      this.navBarCartLength = sharedValue;
  
    });

    
  }
  

logout(){
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentRole");
  localStorage.removeItem("userId");
  this.router.navigate(['/login'])
}
}


