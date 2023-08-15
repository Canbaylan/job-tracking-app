
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TaskService } from 'src/app/services/task.service';
import { GlobalConstants } from 'src/app/util/constants';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';




@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{
  displayedColumns : string[]=['adet','birim_fiyat','boy','durum',
  'en', 'firma','is_icerigi','siparis_tarihi','tutar','duzenle'];
  taskAddForm:any=FormGroup;
  dataSource:any;
  responseMessage:any;
  total:any;
  stat:boolean=true;
  constructor(
    private router:Router,
    private taskService:TaskService,
    private ngxService:NgxUiLoaderService,
    private formBuilder:FormBuilder,
   
    private toastr:ToastrService
    //@Inject(DOCUMENT) private doc:any
    
  ) { }
  public loadScript() {
    const node = document.createElement('script');
    node.src = '../../../assets/js/material-dashboard.min.js'; // put there your js file location
    node.type = 'text/javascript';
    node.async = true;
    
   document.getElementsByTagName('head')[0].appendChild(node);
   
  }
  ngOnInit(): void {
    let elScript = document.getElementById("googleButtonScript")
    

    //<script src="./assets/js/material-dashboard.min.js?v=3.0.5"></script>

    this.taskAddForm = this.formBuilder.group({
      adet:"",
          birimFiyat:"",
          boy:"",
          durum:"",
          en:"",
          firma:"",
          isIcerigi:"",
          siparisTarihi:"",
          tutar:"",
          taskId:""
    })
    this.ngxService.start();
    this.tableData();
    
    //this.dataClear();
    }
    
  tableData(){
    this.taskService.getTask().subscribe((response:any)=>{
        this.dataSource = new MatTableDataSource(response);
        this.total = response.length;
        this.ngxService.stop();
      },(error:any)=>{
        this.ngxService.stop();
        console.log(error.error?.message);
        if(error.error?.message){
          this.responseMessage=error.error?.message;
        }
        else{
          this.responseMessage=GlobalConstants.genericError;
        }
      })
    }
    handleSubmit(){
      this.ngxService.start();
      var formData = this.taskAddForm.value;
      var data = {
          adet:formData.adet,
          birimFiyat:formData.birimFiyat,
          boy:formData.boy,
          durum:formData.durum,
          en:formData.en,
          firma:formData.firma,
          isIcerigi:formData.isIcerigi,
          siparisTarihi:formData.siparisTarihi,
          tutar:formData.tutar
        
      }
   
        this.taskService.add(data).subscribe((response:any)=>{
          this.tableData();
          this.dataClear();
          this.toastr.success('İş Eklendi.')
          this.responseMessage=response?.message;
          document.querySelectorAll('#rightSidebar div').forEach(function (div){
            div.classList.remove('is-focused')
          })
          const myEl = <HTMLButtonElement>document.getElementById("btnAdd2");
          if(myEl.textContent!=="add_circleEkle"){
            myEl.textContent = "Ekle";
            myEl.disabled=true;
          }
          console.log(myEl.textContent)
          
          this.ngxService.stop();
          console.log(this.responseMessage,"success");
        },(error)=>{
          console.log(error);
          this.toastr.error('İş Eklenemedi.')
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

    addSubmit(values:any){
      console.log("addsubmit"+values.id)
      this.router.navigate(['/finance'],{queryParams:{title:values.id}});
      //href="task/element.id/finance"
    }

    deleteSubmit(values:any){
      this.ngxService.start();
      this.taskService.delete(values.id).subscribe((response:any)=>{
        this.tableData();
        this.responseMessage=response?.message;
        this.ngxService.stop();
        console.log(this.responseMessage,"success");
      },(error:any)=>{
        this.ngxService.stop();
        console.log(error);
        if(error.error?.message){
          this.responseMessage=error.error?.message;
        }
        else{
          this.responseMessage=GlobalConstants.genericError;
        }
      })
      console.log('val:'+values.id);
    }
    updateSubmit(values:any){
      this.ngxService.start();
      this.taskService.getTaskById(values.id).subscribe((response:any)=>{
        this.responseMessage=response?.message;
        console.log(this.responseMessage,"success");
        const myEl = <HTMLButtonElement>document.getElementById("btnAdd2");
        if(myEl!==null){
          myEl.textContent = "Güncelle";
          myEl.disabled=false;
        }
       
        document.querySelectorAll('#rightSidebar div').forEach(function (div){
          div.classList.add('is-focused')
        })
        this.stat=false;
        //this.deleteSubmit(values);
        this.tableData();
        this.ngxService.stop();
        console.log(response);
        this.dataUpdate(response);
      },(error:any)=>{
        this.ngxService.stop();
        console.log(error);
        if(error.error?.message){
          this.responseMessage=error.error?.message;
        }
        else{
          this.responseMessage=GlobalConstants.genericError;
        }
      })
      console.log('val:'+values.id);
      
    }
    moveSubmit(values:any){
      this.ngxService.start();
      this.taskService.taskToBid(values.id).subscribe((response:any)=>{
        this.tableData();
        this.responseMessage=response?.message;
        this.toastr.success('Seçilen iş Teklif tablosuna eklendi.')
        this.ngxService.stop();
        console.log(this.responseMessage,"success");
      },(error:any)=>{
        this.ngxService.stop();
        this.toastr.error('Seçilen iş Teklif tablosuna eklenemedi.')
        console.log(error);
        if(error.error?.message){
          this.responseMessage=error.error?.message;
        }
        else{
          this.responseMessage=GlobalConstants.genericError;
        }
      })
      console.log('val:'+values.id);
    }
    dataClear(){
      this.taskAddForm = this.formBuilder.group({
        adet:[null],
        birimFiyat:[null],
        boy:[null],
        durum:[null],
        en:[null],
        firma:[null],
        isIcerigi:[null],
        siparisTarihi:[null],
        tutar:[null]
      })  
      document.querySelectorAll('#rightSidebar div').forEach(function (div){
        div.classList.remove('is-filled')
      })
    }
    dataUpdate(val:any){
      var formData = val;
      this.taskAddForm = this.formBuilder.group({
        adet:[formData.adet],
        birimFiyat:[formData.birimFiyat],
        boy:[formData.boy],
        durum:[formData.durum],
        en:[formData.en],
        firma:[formData.firma],
        ilce:[formData.ilce],
        isIcerigi:[formData.isIcerigi],
        siparisTarihi:[formData.siparisTarihi],
        tutar:[formData.tutar],
        yetkili_ad_soyad:[formData.yetkiliAdSoyad],
        yetkili_email:[formData.yetkiliEmail],
        yetkili_telefon:[formData.yetkiliTelefon]
      })  
    }
    
    }
  


