import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(){}
  script:any;
  ngOnInit(): void {
    this.script = document.createElement('script');
    this.script.setAttribute("id", "googleButtonScript");
    this.script.type = 'text/javascript';
    this.script.src = "../assets/js/material-dashboard.min.js";   
    document.getElementsByTagName('head')[0].appendChild(this.script);
  }
  

 
 
  
  title = 'bitirmeUIFull';
}
