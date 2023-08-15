import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as cors from 'cors';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url = environment.apiUrl;
  /*options: cors.CorsOptions={
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Access-Control-Allow-Origin'
    ],
    credentials:true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: this.url,
  preflightContinue: false,
  }*/
  

  
  constructor(
    private httpClient:HttpClient
  ) { }

  getMusteri(){
    return this.httpClient.get(this.url + 
      "/musteri/getMusteri",{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  getMusteriById(id:number){
    return this.httpClient.get(this.url + 
      "/musteri/getMusteri/"+id,{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  add(data:any){
    return this.httpClient.post(this.url + 
      "/musteri/add",data,{
        headers: new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
      })
  }
  delete(id:number){
    return this.httpClient.put(this.url + 
      '/musteri/delete/'+id,id,{
        headers: new HttpHeaders()
       /* .set("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE,OPTIONS")
        .set('Access-Control-Allow-Origin','*')
        .set('X-Content-Type-Options','nosniff')
        //.set('origin','*')
        .set('allowedHeaders','*')
        //.set('Access-Control-Allow-Headers', 'content-type-options')
        .set('Access-Control-Allow-Origin','*')*/
      
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
        
      })
  }
  customerUpdate(data:any){
    return this.httpClient.put(this.url + 
      "/musteri/update",data,{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  /*delete(id:any){
    return this.httpClient.post(this.url + 
      "/musteri/delete/"+ parseInt(id),{
        //params:new HttpParams().set('id',id),
        headers: new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
      })
  }*/
  
}
