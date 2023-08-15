import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/util/constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
hide = true;
loginForm:any = FormGroup;
responseMessage:any;
  

constructor(private formBuilder:FormBuilder,
  private userService:UserService,
  private ngxService:NgxUiLoaderService,
  private router:Router,
  private toastr:ToastrService
  ){}

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
        password:[null,[Validators.required]]
      })  
  }
  handleSubmit(){
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email:formData.email,
      password:formData.password
    }
    this.userService.login(data).subscribe((response:any)=>{
      this.userService.checkToken();
      this.toastr.success('Giriş Yapıldı.')
      this.ngxService.stop();
      localStorage.setItem('token',response.token);
      this.router.navigate(['/customers']);
    },(error)=>{
      this.toastr.error('Giriş Yapılamadı.')
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }
      else{
        this.responseMessage=GlobalConstants.genericError;
      }
      console.log(this.responseMessage+'/er: '+GlobalConstants.error);
    })
  }
     //Dom Property
     status1:boolean=false;
     status2:boolean=false;

     clickEv1(event:any){
       this.status1=!this.status1;
     }
     clickEv2(event:any){
       this.status2=!this.status2;
     }
   
}
