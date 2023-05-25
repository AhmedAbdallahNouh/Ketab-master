import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { ResetPassword } from 'src/app/Models/reset-password.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnChanges {

  sniper:any = "hidden";
  resetPasswordObj: ResetPassword = new ResetPassword();


    ResetPasswordForm :FormGroup = new FormGroup({     
    password: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')]),
    confirmPassword: new FormControl(null,[Validators.required]),
  });

  constructor(private auth:AuthService,private router:Router, private myActivatedRoute: ActivatedRoute )
  {
    this.resetPasswordObj.email = myActivatedRoute.snapshot.queryParams["email"];
    this.resetPasswordObj.emailToken = myActivatedRoute.snapshot.queryParams["code"];
    this.resetPasswordObj.emailToken= this.resetPasswordObj.emailToken.replaceAll(' ','+');
        console.log(this.resetPasswordObj.emailToken);

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.resetPasswordObj);
  }

  ngOnInit(): void {

  };

  resetSubmit(resetPasswordForm:any){ 

    this.resetPasswordObj.newPassword = resetPasswordForm.controls.password.value;
    this.resetPasswordObj.confirmNewPassword = resetPasswordForm.controls.confirmPassword.value;
    console.log(this.resetPasswordObj.emailToken);

    console.log(this.resetPasswordObj);

    if(resetPasswordForm.valid)
    {
      this.auth.resetPassword(this.resetPasswordObj).subscribe(
        {
          next:(data)=>
          {
            console.log(`next data: ${data}`);
            this.router.navigate(['/login']);

          },

          error:(err)=>
          {
            console.log(err);
            this.router.navigate(['/**']);

          }           
        }
      );
    }

    
  };

  sniperDisable(){
    this.sniper = "disable";
    console.log( this.sniper);
  };
}
