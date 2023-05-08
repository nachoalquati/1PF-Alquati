import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface UserAuth{
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: boolean = false
  user$ =  new BehaviorSubject< UserAuth | null | any>(null)

  constructor(private httpClient: HttpClient) { }

  getUser(user: UserAuth){
    this.httpClient.get(`http://localhost:3000/users?email=${user.email}&password=${user.password}`).subscribe({
      next: (data)=>{
        this.user$.next(data)
      }
    })
    return this.user$
  }

  checkToken(token:string | null){
    this.httpClient.get(`http://localhost:3000/users?token=${token}`).subscribe({
      next: (data)=>{
        this.user$.next(data)
      }
    })
    return(this.user$)
  }
}
