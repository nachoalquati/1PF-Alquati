import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

const token = 'askjhdaksjhkahj1234k1241k2h54g67k1'

@Injectable({
  providedIn: 'root'
})



export class AuthGuard implements CanActivate {
  checked: boolean = false
  constructor(private router: Router, private authService: AuthService){}

  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      return this.checkToken()

  }
  
  checkToken(){
    if(localStorage.getItem('token')=== token){
      return true
     }else{
      return this.router.createUrlTree(['auth', 'login'])
     }

    // this.authService.checkToken(localStorage.getItem('token')).subscribe({
    //   next:(data)=>{
    //     if(data.token){
    //       this.checked = true
    //     }else{
    //       this.checked = false
    //     }
    //   }
    // })
    // return this.checked
  }

}
