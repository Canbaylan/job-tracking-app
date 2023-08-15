import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = environment.apiUrl;
  constructor(
    private httpClient:HttpClient
  ) { }

  getTask(){
    return this.httpClient.get(this.url + 
      "/task/getTask",{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  add(data:any){
    return this.httpClient.post(this.url + 
      "/task/add",data,{
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
  getTaskById(id:number){
    return this.httpClient.get(this.url + 
      "/task/getTask/"+id,{
        headers:new HttpHeaders()
        .set('Content-type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
        
      });
  }
  taskToFinance(id:number){
    return this.httpClient.put(this.url + 
      "/task/completedTask/"+id,id,{
        headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('token'))
      })
  }
  taskToBid(id:number){
    return this.httpClient.put(this.url + 
      "/task/changeToBid/"+id,id,{
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
}
