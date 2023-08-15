import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ExpensService } from 'src/app/services/expens.service';
import { GlobalConstants } from 'src/app/util/constants';

@Component({
  selector: 'app-expens',
  templateUrl: './expens.component.html',
  styleUrls: ['./expens.component.scss']
})
export class ExpensComponent implements OnInit{
  displayedColumns : string[]=['tarih','tur','tutar','odemeyapan',
  'gidericerik', 'firma','duzenle'];
  expAddForm:any=FormGroup;
  dataSource:any;
  responseMessage:any;
  total:any;
  constructor(
    private router:Router,
    private expensService:ExpensService,
    private ngxService:NgxUiLoaderService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService
  ){}
  ngOnInit(): void {
    
    this.expAddForm = this.formBuilder.group({
          tarih:"",
          tur:"",
          tutar:"",
          odemeyapan:"",
          gidericerik:"",
          firma:""
    })
    this.ngxService.start();
    this.tableData();
    this.dataClear();
    }
    tableData(){
      this.expensService.getExp().subscribe((response:any)=>{
          this.ngxService.stop();
          this.dataSource = new MatTableDataSource(response);
          this.total = response.length;
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
        var formData = this.expAddForm.value;
        var data = {
            tarih:formData.tarih,
            tur:formData.tur,
            tutar:formData.tutar,
            odemeyapan:formData.odemeyapan,
            gidericerik:formData.gidericerik,
            firma:formData.firma
        }
        this.expensService.add(data).subscribe((response:any)=>{
          this.tableData();
          this.dataClear();
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
          this.toastr.success('Gider Eklendi.')
          this.ngxService.stop();
          console.log(this.responseMessage,"success");
        },(error)=>{
          console.log(error);
          this.toastr.error('Gider Eklenemedi.')
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
      deleteSubmit(values:any){
        this.ngxService.start();
        this.expensService.delete(values.id).subscribe((response:any)=>{
          this.tableData();
          this.responseMessage=response?.message;
          this.toastr.success("Gider Silindi.");
          this.ngxService.stop();
          console.log(this.responseMessage,"success");
        },(error:any)=>{
          this.ngxService.stop();
          console.log(error);
          this.toastr.error("Gider Silinemedi.");
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
        this.expAddForm = this.formBuilder.group({
          tarih:[null],
          tur:[null],
          tutar:[null],
          odemeyapan:[null],
          gidericerik:[null],
          firma:[null]
        })  
        document.querySelectorAll('#rightSidebar div').forEach(function (div){
          div.classList.remove('is-filled')
        })
      }
}
