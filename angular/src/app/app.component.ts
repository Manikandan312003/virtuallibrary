import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from './service/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'd';
  constructor(private router:Router,private api:APIService){
    if(this.api.signed_user===""){
      this.router.navigateByUrl("login")
    }
    else{
    
    this.router.navigateByUrl("home")}
    console.log(this.api.signed_user)
  }
  
}
