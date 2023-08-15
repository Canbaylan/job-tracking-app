import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/util/constants';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  password = true;
  confirmPassword=true;
  signupForm:any = FormGroup;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder, 
              private router:Router,
              private userService:UserService,
              private toastr:ToastrService,
              private ngxService:NgxUiLoaderService
    ){}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      //name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      //contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]
      
    })
  }
  validateSubmit(){
    if((this.signupForm.controls['password'].value == this.signupForm.controls['confirmPassword'].value) && (this.signupForm.controls['email'].value !=null) &&
    (this.signupForm.controls['password'].value != null) && !(this.signupForm.controls['email'].invalid)){
      return false;
    }
    else {
      return true;
    }
  }
  validatePassword(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value)
      return true;
    else
      return false;
  }

  handleSubmit(){
    this.ngxService.start();
    var formData= this.signupForm.value;
    var data ={
     // name : formData.name,
      email : formData.email,
     // contactNumber : formData.contactNumber,
      password : formData.password
    }
    this.userService.signup(data).subscribe((response:any)=> {  
      this.ngxService.stop();
      this.toastr.success('Kayıt olundu.')
      this.responseMessage= response?.message;
      console.log(this.responseMessage);
      this.router.navigate(['/']);
    },(error)=>{
      this.ngxService.stop();
      this.toastr.error('Kayıt olunamadı.')
      if(error.error?.message){
        this.responseMessage= error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      console.log(this.responseMessage,GlobalConstants.error);
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
