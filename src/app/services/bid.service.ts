import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  url = environment.apiUrl;
  constructor(
    private httpClient:HttpClient
  ) { }

  getBid(){
    return this.httpClient.get(this.url + 
      "/task/getBid",{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  add(data:any){
    return this.httpClient.post(this.url + 
      "/task/addOffer",data,{
        headers: new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
      })
  }
  delete(id:number){
    return this.httpClient.put(this.url + 
      '/task/delete/'+id,id,{
        headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
      })
  }
  getBidById(id:number){
    return this.httpClient.get(this.url + 
      "/task/getTask/"+id,{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  changeTask(id:number){
    return this.httpClient.put(this.url + 
      '/task/changeToTask/'+id,id,{
        headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
      })
  }
  taskUpdate(data:any){
    return this.httpClient.put(this.url + 
      "/task/update",data,{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  getBidtoMusteriId(id:number){
    return this.httpClient.get(this.url +
      "/task/getBid/"+id,{
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
}
