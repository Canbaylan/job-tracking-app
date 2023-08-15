import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FinanceService } from 'src/app/services/finance.service';
import { GlobalConstants } from 'src/app/util/constants';
import { FinanceComponent } from '../finance/finance.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  financeAddForm:any;
  responseMessage:any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{firma:any,tutar:any,odemeAlan:any,
    odemeYapan:any,sonOdemeTarihi:any,toplamAlacak:any,toplamOdenen:any,id:any},
    private matDialogRef: MatDialogRef<DialogComponent>,
    private formBuilder:FormBuilder,
    private ngxService:NgxUiLoaderService,
    private financeService:FinanceService

    ){}
ngOnInit(): void {
  this.financeAddForm = this.formBuilder.group({
    id:this.data.id,
    firma:this.data.firma,
    odemeAlan:this.data.odemeAlan,
    odemeYapan:this.data.odemeYapan,
    sonOdemeTarihi:this.data.sonOdemeTarihi,
    toplamAlacak:this.data.toplamAlacak,
    toplamOdenen:this.data.toplamOdenen
})
}
ngOnDestroy():void{
  this.matDialogRef.close(this.data)
}

handleSubmit(){
  
  var formData = this.financeAddForm.value;
  var data = {
        id:formData.id,
        firma:formData.firma,
        odemeAlan:formData.odemeAlan,
        odemeYapan:formData.odemeYapan,
        sonOdemeTarihi:formData.sonOdemeTarihi,
        toplamAlacak:formData.toplamAlacak,
        toplamOdenen:formData.toplamOdenen,
    }
    //this.deleteSubmit(data.id);
    this.financeService.update(data).subscribe((response:any)=>{
      //this.toastr.success('Durum Güncellendi.')

      this.matDialogRef.close();
      this.ngxService.stop();
    },(error)=>{
      console.log(error);
      //this.toastr.error('Durum Güncellenemedi..')
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
    this.financeService.delete(values).subscribe((response:any)=>{
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
  /*
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
        this.deleteSubmit(values);
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
  */
}
