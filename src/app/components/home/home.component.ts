import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { HomeService } from 'src/app/services/home.service';
import { GlobalConstants } from 'src/app/util/constants';
import { BidComponent } from '../bid/bid.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  displayedColumns : string[]=['aciklama','adres','firma','firma_email','firma_telefon', 'il','ilce','musteri_kodu','tckn_vergi_no','vergi_dairesi','yetkili_ad_soyad',
  'yetkili_email','yetkili_telefon','duzenle'];

customerAddForm:any=FormGroup;
dataSource:any;
responseMessage:any;
total:any;
stat:boolean=true;
temp:any;
@ViewChild('paginator') paginator: MatPaginator;
@ViewChild('empSort') empSort = new MatSort();

  constructor(
    private router:Router,
    private homeService:HomeService,
    private ngxService:NgxUiLoaderService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private route:ActivatedRoute

  ) { }
 
  ngOnInit(): void {
    
    this.customerAddForm = this.formBuilder.group({
      aciklama:"",
      adres:"",
      firma:"",
      firmaEmail:"",
      firmaTelefon:"",
      il:"",
      ilce:"",
      musteriKodu:"",
      tcknVergiNo:"",
      vergiDairesi:"",
      yetkiliAdSoyad:"",
      yetkiliEmail:"",
      yetkiliTelefon:""
    })
      this.ngxService.start();
      this.tableData();
      this.dataClear();
      this.ngxService.stop();
  }
  
  tableData(){
    this.homeService.getMusteri().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.empSort;

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
    var formData = this.customerAddForm.value;
    var data = {
        id:this.temp,
        aciklama:formData.aciklama,
        adres:formData.adres,
        firma:formData.firma,
        firmaEmail:formData.firmaEmail,
        firmaTelefon:formData.firma_telefon,
        il:formData.il,
        ilce:formData.ilce,
        musteriKodu:formData.musteri_kodu,
        tcknVergiNo:formData.tckn_vergi_no,
        vergiDairesi:formData.vergi_dairesi,
        yetkiliAdSoyad:formData.yetkili_ad_soyad,
        yetkiliEmail:formData.yetkili_email,
        yetkiliTelefon:formData.yetkili_telefon
    }
    if(this.stat==true){
      this.homeService.add(data).subscribe((response:any)=>{
        this.tableData();
        this.dataClear();
        this.toastr.success('Müşteri Eklendi.')
        this.responseMessage=response?.message;
        document.querySelectorAll('#rightSidebar div').forEach(function (div){
          div.classList.remove('is-focused')
        })
        const myEl = <HTMLButtonElement>document.getElementById("btnAdd");
        if(myEl.textContent!=="add_circleEkle"){
          myEl.textContent = "Ekle";
          
        }
        console.log(myEl.textContent)
        this.ngxService.stop();
        console.log(this.responseMessage,"success");
      },(error)=>{
        console.log(error);
        this.toastr.error('Müşteri Eklenemedi.')
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
      console.log("data in else")
      this.homeService.customerUpdate(data).subscribe((response:any)=>{
        this.tableData();
        this.dataClear();
        this.toastr.success('Müşteri Güncellendi.')
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
        if(myHead!==null){
          myHead.innerHTML = "&emsp;Müşteri Ekle";
        }
        console.log(myEl.textContent)
        this.stat=true;
        this.ngxService.stop();
        console.log(this.responseMessage,"success");
      },(error)=>{
        console.log(error);
        this.toastr.error('Müşteri Güncellenemedi.')
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
  dataClear(){
    this.customerAddForm = this.formBuilder.group({
      aciklama:[null],
      adres:[null],
      firma:[null],
      firmaEmail:[null],
      firma_telefon:[null],
      il:[null],
      ilce:[null],
      musteri_kodu:[null],
      tckn_vergi_no:[null],
      vergi_dairesi:[null],
      yetkili_ad_soyad:[null],
      yetkili_email:[null],
      yetkili_telefon:[null]
    })  
    document.querySelectorAll('#rightSidebar div').forEach(function (div){
      div.classList.remove('is-filled')
    })
  }
  deleteSubmit(values:any){
    this.ngxService.start();
      this.homeService.delete(values.id).subscribe((response:any)=>{
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
    this.temp = values.id;
    this.homeService.getMusteriById(values.id).subscribe((response:any)=>{
      this.responseMessage=response?.message;
      console.log(this.responseMessage,"success");
      const myEl = <HTMLButtonElement>document.getElementById("btnAdd");
      if(myEl!==null){
        myEl.textContent = "Güncelle";
        myEl.disabled=false;
      }
      document.querySelectorAll('#rightSidebar div').forEach(function (div){
        div.classList.add('is-focused')
      })
      //formHead
      const myHead = document.getElementById("formHead");
      if(myHead!==null){
        myHead.innerHTML = "&emsp;Müşteri Güncelle";
      }
      this.stat=false;
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
  
    
  }
  addSubmit(values:any){
    //this.router.navigate(['/customer/customerId/bids'],{queryParams:{customerId:values.firma}});
    console.log("home:" + values.firma)
    }

  dataUpdate(val:any){
    var formData = val;
    this.customerAddForm = this.formBuilder.group({
      aciklama:[formData.aciklama],
      adres:[formData.adres],
      firma:[formData.firma],
      firmaEmail:[formData.firmaEmail],
      firma_telefon:[formData.firmaTelefon],
      il:[formData.il],
      ilce:[formData.ilce],
      musteri_kodu:[formData.musteriKodu],
      tckn_vergi_no:[formData.tcknVergiNo],
      vergi_dairesi:[formData.vergiDairesi],
      yetkili_ad_soyad:[formData.yetkiliAdSoyad],
      yetkili_email:[formData.yetkiliEmail],
      yetkili_telefon:[formData.yetkiliTelefon]
    })  
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
  status10:boolean=false;
  status11:boolean=false;
  status12:boolean=false;
  status13:boolean=false;
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
  clickEv10(event:any){
    this.status10=!this.status10;
  }
  clickEv11(event:any){
    this.status11=!this.status11;
  }
  clickEv12(event:any){
    this.status12=!this.status12;
  }
  clickEv13(event:any){
    this.status13=!this.status13;
  }
}

