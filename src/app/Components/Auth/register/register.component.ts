import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  sniper:any = "hidden";
  constructor(private auth:AuthService,private router:Router){}

    registerForm :FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.minLength(3), Validators.required, Validators.pattern('^[A-Z][a-z]+')]),
    lastName : new FormControl(null,[Validators.minLength(3), Validators.required, Validators.pattern('^[A-Z][a-z]+')]),
    userName : new FormControl(null,[Validators.required]),
    phoneNumber : new FormControl(null,[Validators.required,Validators.pattern('^01[0125][0-9]{8}$')]),
    address : new FormControl(null,[Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')]),
    confirmPassword: new FormControl(null,[Validators.required]),
  });
  sniperDisable(){
    this.sniper = "disable";
    console.log( this.sniper);
  };

  submitForm(formData:any){
    if(formData.valid){
      this.auth.register(formData.value).subscribe((res) =>{
        console.log(res);
        this.router.navigate(['/login']);
      })
    }
    this.clearForm();
  }

  clearForm(){
    this.registerForm.reset();
  }
}
