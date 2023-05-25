import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let role:any = localStorage.getItem("currentRole");
      if(role !== 'ADMIN'){
        localStorage.removeItem("currentUser"); 
        localStorage.removeItem("currentRole");
        localStorage.removeItem("userId");

        this.router.navigate(['/login']);
        return false;
      }else{
        return true;
      }
  }
  
}
