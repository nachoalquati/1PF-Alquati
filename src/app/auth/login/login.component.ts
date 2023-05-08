import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService, UserAuth } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  passwordFormControl = new FormControl('', [Validators.required])
  loginForm : FormGroup
  user$:UserAuth[] = []

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ){
    this.loginForm = this.formBuilder.group({
      email: this.emailFormControl,
      password: this.passwordFormControl
    }
    )
  }

  ngOnInit(): void {
    
  }

  submit(){
    this.login()
  }

  login(){
    if(this.emailFormControl.invalid){
      this.emailFormControl.markAsTouched()
    }
    if(this.passwordFormControl.invalid){
      this.passwordFormControl.markAsTouched()
    }
    this.authService.getUser(this.loginForm.value).subscribe({
      next: (data: any)=>{
        console.log(data);
          this.user$ = data
            if(this.user$.length>0){
              localStorage.setItem('token', data[0].token),
              delete data[0].password
              localStorage.setItem('user', JSON.stringify(data[0]))
              this.router.navigate(['/layout/alumnos/list'])
            }
      }
    })
  }
}
