import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BidService } from 'src/app/services/bid.service';
import { HomeService } from 'src/app/services/home.service';
import { GlobalConstants } from 'src/app/util/constants';


@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent  implements OnInit{
  displayedColumns : string[]=['adet','birim_fiyat','boy','durum',
  'en', 'firma','is_icerigi','siparis_tarihi','tutar','duzenle'];
  bidAddForm:any=FormGroup;
  dataSource:any;
  responseMessage:any;
  total:any;
  firm:any;
  stat:boolean=true;
  temp:any;
  constructor(
    private router:Router,
    private bidService:BidService,
    private ngxService:NgxUiLoaderService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private activatedRoute: ActivatedRoute

  ) { 
    
  }
  ngOnInit(): void {
    console.log("route:"+this.activatedRoute.snapshot.params['id']);
    this.firm = this.activatedRoute.snapshot.params['id'];
    this.bidAddForm = this.formBuilder.group({
      adet:"",
          birimFiyat:"",
          boy:"",
          durum:"",
          en:"",
          firma:"",
          isIcerigi:"",
          siparisTarihi:"",
          tutar:"",
          musteriId:"0"
          
    })
    this.ngxService.start();
    this.tableData();
    this.dataClear();

    

    if(this.firm==null){
      console.log("firm:"+this.firm);
    }
    else{
      /*document.querySelectorAll('#btnFirm').forEach(function (div){
        div.classList.add('is-focused')
        div.setAttribute('readOnly','')
        //myEl.disabled=true;
      
      })*/
    
     /* const firmaInput = document.getElementById("inpFirm");
      if(firmaInput!= null){
        firmaInput.setAttribute('readonly','false');
        firmaInput.removeAttribute('readonly');
        console.log(firmaInput)
      }*/

    }
    }

  tableData(){
    if(this.firm==null)
    {
      this.bidService.getBid().subscribe((response:any)=>{
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
    else{
      this.bidService.getBidtoMusteriId(this.firm).subscribe((response:any)=>{
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
      this.tableDatatoMusteriId(this.firm);

    }
    
    }
    tableDatatoMusteriId(id:any){
        this.bidService.getMusteriById(id).subscribe((response:any)=>{
          var musteri = response;
        
          const musteriInfo = document.getElementById("musteriInfo");
          if(musteriInfo!=null){
            musteriInfo.textContent=musteri.yetkiliAdSoyad+' adında, '+ musteri.firma+
             ' firmalı müşteriye iletilen teklifler '
            
          }
        })
       
        
    }
    handleSubmit(){
      this.ngxService.start();
      var formData = this.bidAddForm.value;
      var data = {
          id:this.temp,
          adet:formData.adet,
          birimFiyat:formData.birimFiyat,
          boy:formData.boy,
          durum:formData.durum,
          en:formData.en,
          firma:formData.firma,
          isIcerigi:formData.isIcerigi,
          siparisTarihi:formData.siparisTarihi,
          tutar:formData.tutar,
          musteriId:this.firm|0,
      }
      if(this.stat==true){
        this.bidService.add(data).subscribe((response:any)=>{
          this.tableData();
          this.dataClear();
          this.responseMessage=response?.message;
          this.toastr.success('Teklif Eklendi.')
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
          this.ngxService.stop();
          this.toastr.error('Teklif Eklenemedi.')
          if(error.error?.message){
            this.responseMessage = error.error?.message;
          }
          else{
            this.responseMessage=GlobalConstants.genericError;
          }
          console.log(this.responseMessage);
        })
      }
      else {
        console.log("data in else"+data.firma)
        this.bidService.taskUpdate(data).subscribe((response:any)=>{
          this.tableData();
          this.dataClear();
          this.toastr.success('Teklif Güncellendi.')
          this.responseMessage=response?.message;
          document.querySelectorAll('#rightSidebar div').forEach(function (div){
            div.classList.remove('is-focused')
          })
          const myEl = <HTMLButtonElement>document.getElementById("btnAdd2");
          if(myEl.textContent!=="add_circleEkle"){
            myEl.textContent = "Ekle";
            myEl.disabled=true;
          }
          const myHead = document.getElementById("formHead");
          if(myHead!=null){
          myHead.innerHTML= "&emsp;Teklif Ekle";
          }
          console.log(myEl.textContent)
          this.stat=true;
          this.ngxService.stop();
          console.log(this.responseMessage,"success");
        },(error)=>{
          console.log(error);
          this.toastr.error('Teklif Güncellenemedi..')
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
  
   
    
    deleteSubmit(values:any){
      this.ngxService.start();
      this.bidService.delete(values.id).subscribe((response:any)=>{
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
   
    inpFocused(){
        //document.querySelector('#rightSidebar div div')?.classList.toggle('is-focused')
          //div.classList.add('is-focused')
        
    }
    updateSubmit(values:any){
      this.ngxService.start();
      this.stat=false;
      this.temp = values.id;
      this.bidService.getBidById(values.id).subscribe((response:any)=>{
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
        const myHead = document.getElementById("formHead");
        if(myHead!=null){
          myHead.innerHTML= "&emsp;Teklif Güncelle";
        }
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
    changeSubmit(values:any){
      this.ngxService.start();
      this.bidService.changeTask(values.id).subscribe((response:any)=>{
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

    dataClear(){
      this.bidAddForm = this.formBuilder.group({
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
      this.bidAddForm = this.formBuilder.group({
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
      })  
    }
    dataFilled(val:any){
        
    }
    //Dom Property
  status1:boolean=false;
  status2:boolean=false;
  status3:boolean=false;
  status4:boolean=false;
  status5:boolean=false;
  status6:boolean=false;
  status7:boolean=false;
  status8:boolean=false;
  status9:boolean=false;
  
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
  clickEv6(event:any){
    this.status6=!this.status6;
  }
  clickEv7(event:any){
    this.status7=!this.status7;
  }
  clickEv8(event:any){
    this.status8=!this.status8;
  }
  clickEv9(event:any){
    this.status9=!this.status9;
  }
  
    
}
