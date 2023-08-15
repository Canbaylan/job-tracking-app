import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensService {
  url = environment.apiUrl;
  constructor(
    private httpClient:HttpClient
  ) { }
  getExp(){
    return this.httpClient.get(this.url + 
      "/gider/getGider",{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  add(data:any){
    return this.httpClient.post(this.url + 
      "/gider/add",data,{
        headers: new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
      })
  }
  delete(id:number){
    return this.httpClient.put(this.url + 
      '/gider/delete/'+id,id,{
        headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
      })
  }
  
}
