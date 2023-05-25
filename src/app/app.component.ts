import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AdminRoleService } from './Core/Services/admin-role.service';
import { AuthService } from './Core/Services/auth.service';
import { SharedDataService } from './Core/Services/shared-data.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnChanges, AfterViewInit {
  title = 'Ketab';
  faCoffee = faCoffee;
  isNotAdmin:boolean = true;
  cartLenght:any;

  constructor(public authService:AuthService, private adminRoleService:AdminRoleService,private sharedDataService:SharedDataService){
    adminRoleService.currentUserData.subscribe(() =>{
      if (adminRoleService.currentUserData.getValue() !== null) {

        adminRoleService.currentUserRole.subscribe(()=>{
          let currentRole = adminRoleService.currentUserRole.getValue();
          if (currentRole == "ADMIN") {
            this.isNotAdmin= false;
            console.log("is admin");
          }else{
            this.isNotAdmin = true;
          }
        })
      }else{
        this.isNotAdmin = true;
      }
    });
    
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.sharedDataService.sharedValue.subscribe((sharedValue:any) => {
      console.log(`shared value${sharedValue}`); 
      this.cartLenght = sharedValue;
    });

    console.log(`from On Init${this.cartLenght}`); 
  }
  

  
}
