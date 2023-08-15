import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FinanceService } from 'src/app/services/finance.service';
import { GlobalConstants } from 'src/app/util/constants';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit{
  displayedColumns : string[]=['aciklama','odemeAlan','odeyenTelefon','tutar',
  'odeyen', 'tip','createDateTime','duzenle'];
  finAddForm:any=FormGroup;
  dataSource:any;
  responseMessage:any;
  total:any;
  tas:any;
  temp:any;
  stat:boolean = true;
  gider:number;
  gelir:number;
  
  constructor(
    private financeService:FinanceService,
    private ngxService:NgxUiLoaderService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    //private matDialog : MatDialog,
    private activatedRoute: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.tas = this.activatedRoute.snapshot.params['id'];
    this.finAddForm = this.formBuilder.group({
          odemeAlan:"",
          aciklama:"",
          odeyenTelefon:"",
          tutar:0,
          odeyen:"",
          tip:"",
          taskId:"0"
      
    })
    this.ngxService.start();
    this.dataClear();
    
    console.log('finance task id:' +this.tas);
    this.tableData();
   
    }
    tableData(){
      if(this.tas==null){
        this.financeService.getFinance().subscribe((response:any)=>{
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
        const el=<HTMLDivElement>document.querySelector('#rightSide3');
        if(el!=null){
          el.style.display = "none";
        }
        const elem=<HTMLDivElement>document.querySelector('#rowGelir');
        if(elem!=null){
          elem.style.display = "none";
        }
        this.getGelir(this.tas);
        this.getGider(this.tas);
        this.getTask(this.tas);
      }
      else{
        this.financeService.getFinanceforTask(this.tas).subscribe((response:any)=>{
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
        this.getGelir(this.tas);
        this.getGider(this.tas);
        this.getTask(this.tas);

        
      }
      }
  
      getTask(id:number){
        this.financeService.getTaskbyId(id).subscribe((response:any)=>{
          this.ngxService.stop();
          var task = response;
          const taskInfo = document.getElementById("finansalTitle")
          if(taskInfo != null){
            taskInfo.textContent = "" +  task.firma + " Firmasının, "+task.isIcerigi + " İşinin Finansal Kayıtları";
          }
          const gelirInfo = document.getElementById("gelirToplam");
          if(gelirInfo != null){
            gelirInfo.textContent = this.gelir + " / " + task.tutar + " ₺"
          }
          
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
      getGelir(id:number){
        this.financeService.getGelir(id).subscribe((response:any)=>{
          this.ngxService.stop();
          console.log("gelir: "+ response)
          if(response ==null)
          {
            this.gelir = 0
          }
          else{
            this.gelir = response;
          }
          
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
      getGider(id:number){
        this.financeService.getGider(id).subscribe((response:any)=>{
          this.ngxService.stop();
          console.log("gider: "+ response)
          if(response==null)
            this.gider = 0
          else 
            this.gider = response;
          
       
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
        var formData = this.finAddForm.value;
        var data = {
          id:this.temp,
          odemeAlan:formData.odemeAlan,
          aciklama:formData.aciklama,
          odeyenTelefon:formData.odeyenTelefon,
          tutar:formData.tutar,
          odeyen:formData.odeyen,
          tip:formData.tip,
          taskId:this.tas | 0,
        }
        if(this.stat==true)
        {
          this.financeService.add(data).subscribe((response:any)=>{
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
            //this.toastr.success('Gider Eklendi.')
            this.ngxService.stop();
            console.log(this.responseMessage,"success");
          },(error)=>{
            console.log(error);
            //this.toastr.error('Gider Eklenemedi.')
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
        else{
          console.log('data:'+ data)
          this.financeService.update(data).subscribe((response:any)=>{
            this.tableData();
            this.dataClear();
            this.toastr.success('Finans Kaydı Güncellendi.')
            this.responseMessage=response?.message;
            document.querySelectorAll('#rightSidebar div').forEach(function (div){
              div.classList.remove('is-focused')
            })
            const myEl = <HTMLButtonElement>document.getElementById("btnAdd");
            if(myEl.textContent!=="add_circleEkle"){
              myEl.textContent = "Ekle";
              myEl.disabled=true;
            }
            const myHead = document.getElementById("formHead");
              if(myHead!=null){
               myHead.innerHTML= "&emsp;Finansal Kayıt Ekle";
              }
            this.stat=true;
            this.ngxService.stop();
            console.log(this.responseMessage,"success");
          },(error)=>{
            console.log(error);
            this.toastr.error('Finans Kaydı Güncellenemedi.')
            this.stat=true;
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
        
      }
      radioButtonChange(data: MatRadioChange){
        return data.value;
      }
      deleteSubmit(values:any){
        this.ngxService.start();
        this.financeService.delete(values.id).subscribe((response:any)=>{
          this.tableData();
          this.responseMessage=response?.message;
          //this.toastr.success("Gider Silindi.");
          this.ngxService.stop();
          console.log(this.responseMessage,"success");
        },(error:any)=>{
          this.ngxService.stop();
          console.log(error);
         // this.toastr.error("Gider Silinemedi.");
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
         /*this.matDialog.open(DialogComponent,{
           data:{
              id:values.id,
              firma : values.firma,
              odemeAlan: values.odemeAlan,
              odemeYapan : values.odemeYapan,
              sonOdemeTarihi: values.sonOdemeTarihi,
              toplamAlacak : values.toplamAlacak,
              toplamOdenen: values.toplamOdenen

          },width:"400px"}).afterClosed().subscribe(res =>{
              this.tableData();
              console.log('refresh success'+ res)
          })*/
          this.ngxService.start();
          this.temp = values.id;
          this.stat=false;
          console.log("temp: " +this.temp)
          this.financeService.getFinancebyId(values.id).subscribe((response:any)=>{
            this.responseMessage=response?.message;
            
            const myEl = <HTMLButtonElement>document.getElementById("btnAdd");
            if(myEl!==null){
              myEl.textContent = "Güncelle";
              myEl.disabled=false;
            }
            const myHead = document.getElementById("formHead");
            if(myHead!=null){
                myHead.innerHTML= "&emsp;Finansal Kayıt Güncelle";
            }
            document.querySelectorAll('#rightSidebar div').forEach(function (div){
              div.classList.add('is-focused')
            })
            
           
            this.ngxService.stop();
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
                
     
      }
      dataClear(){
        this.finAddForm = this.formBuilder.group({
          odemeAlan:[null],
          aciklama:[null],
          odeyenTelefon:[null],
          tutar:[null],
          odeyen:[null],
          tip:[null]
        })  
        document.querySelectorAll('#rightSidebar div').forEach(function (div){
          div.classList.remove('is-filled')
        })
      }
      dataUpdate(val:any){
        var formDat = val;
        this.finAddForm = this.formBuilder.group({
          aciklama:[formDat.aciklama],
          odemeAlan:[formDat.odemeAlan],
          odeyenTelefon:[formDat.odeyenTelefon],
          tutar:[formDat.tutar],
          odeyen:[formDat.odeyen],
          tip:[formDat.tip],
        
        })  
      }
      //Dom Property
      status1:boolean=false;
      status2:boolean=false;
      status3:boolean=false;
      status4:boolean=false;
      status5:boolean=false;
      clickEv1(event:any){
        this.status1=!this.status1;
      }
      clickEv2(event:any){
        this.status2=!this.status2;
      }
      clickEv3(event:any){
        this.status3=!this.status3;
      }
      clickEv4(event:any){
        this.status4=!this.status4;
      }
      clickEv5(event:any){
        this.status5=!this.status5;
      }
}
