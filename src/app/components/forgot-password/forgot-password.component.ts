import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/util/constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  forgotPasswordForm:any = FormGroup;
  responseMessage:any;

  constructor(
      private userService:UserService,
      private ngxService:NgxUiLoaderService,
      private formBuilder:FormBuilder,
      private toastr:ToastrService
  ){

  }
  ngOnInit(): void {
      this.forgotPasswordForm = this.formBuilder.group({
        email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]
      });
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.forgotPasswordForm.value;
    var data = {
      email:formData.email
    }
    this.userService.forgotPassword(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage=response?.message;
      this.toastr.success('Email adresine şifre yollandı.')
    },(error) => {
      this.ngxService.stop();
      this.toastr.error('Email adresine şifre yollanamadı.')
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
    }
    )

  }
     //Dom Property
     status1:boolean=false;
  
     clickEv1(event:any){
       this.status1=!this.status1;
     }
   

}
