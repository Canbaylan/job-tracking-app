import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/util/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  oldPassword = true;
  newPassword = true;
  confirmPassword = true;
  token:any;
  changePasswordForm:any = FormGroup;
  responseMessage:any;

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private ngxService:NgxUiLoaderService,
    private toastr:ToastrService
  ){}
  ngOnInit(): void {
      this.changePasswordForm = this.formBuilder.group({
        oldPassword:[null,Validators.required],
        newPassword:[null,Validators.required],
        confirmPassword:[null,Validators.required]
      })
    }
    validateSubmit(){
      if(this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value){
        return true;
      }
      else
        return false;
    }

    handlePasswordChangeSubmit(){
      this.ngxService.start();
      var formData = this.changePasswordForm.value;
      var data ={
        oldPassword:formData.oldPassword,
        newPassword:formData.newPassword,
        token:localStorage.getItem('token')
      }
      this.userService.changePassword(data).subscribe((response:any)=>{
        this.ngxService.stop();
        this.responseMessage=response?.message;
        this.toastr.success('Şifre değiştirildi.')
        console.log(this.responseMessage,"success");
      },(error)=>{
        console.log(error);
        this.toastr.error('Şifre değiştirilemedi.')
        this.ngxService.stop();
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage=GlobalConstants.genericError;
        }
        console.log(this.responseMessage);
      })
    }
    //Dom Property
  status1:boolean=false;
  status2:boolean=false;
  status3:boolean=false;
  clickEv1(event:any){
    this.status1=!this.status1;
  }
  clickEv2(event:any){
    this.status2=!this.status2;
  }
  clickEv3(event:any){
    this.status3=!this.status3;
  }
  
}
