import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  url = environment.apiUrl;
  constructor(
    private httpClient:HttpClient
  ) { }

  getFinance(){
    return this.httpClient.get(this.url + 
      "/finance/getFinance",{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  getFinanceforTask(id:number){
    return this.httpClient.get(this.url + 
      '/finance/getFinanceforTask/'+id,{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }

  add(data:any){
    return this.httpClient.post(this.url + 
      "/finance/add",data,{
        headers: new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
      })
  }
  delete(id:number){
    return this.httpClient.put(this.url + 
      '/finance/delete/'+id,id,{
        headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
      })
  }
  getTaskbyId(id:number){
    return this.httpClient.get(this.url + 
      "/task/getTask/"+id,{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  getFinancebyId(id:number){
    return this.httpClient.get(this.url + 
      "/finance/getFinance/"+id,{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  update(data:any){
    return this.httpClient.put(this.url + 
      "/finance/update",data,{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  getGelir(id:number){
    return this.httpClient.get(this.url + 
      "/finance/getGelir/"+id,{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  getGider(id:number){
    return this.httpClient.get(this.url + 
      "/finance/getGider/"+id,{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }

}
