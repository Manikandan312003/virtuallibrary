import { Component } from '@angular/core';
import { Directive, Input, ViewChild} from '@angular/core';


import {Router} from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {APIService} from '../service/api.service'




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // @ViewChild('container') userNameId: ElementRef;

  constructor(private router: Router,private api:APIService){}
  signInBtn: any;
  signUpBtn: any;
  container: any;

  ngOnInit() {
    this.signInBtn = document.querySelector("#sign-in-btn");
    this.signUpBtn = document.querySelector("#sign-up-btn");
    this.container = document.querySelector(".container");

    this.signUpBtn.addEventListener('click', () =>{
      this.container.classList.add("sign-up-mode");
    });
    

    this.signInBtn.addEventListener('click', () =>{
      this.container.classList.remove("sign-up-mode");
    });

    
  }
  title='Reactive Form';
    login=new FormGroup({
      name:new FormControl("",Validators.required),
      password:new FormControl(),
    });

    title_login='Reactive Form';
    register=new FormGroup({
      name:new FormControl("",Validators.required),
      password:new FormControl(),
      email:new FormControl(),
    });
    sign_in:any;
    status="";
    signin()
    {
      console.log(this.login)
      if((""+this.login.get('name')?.value==="admin") &&( ""+this.login.get("password")?.value==="admin")){
        this.router.navigateByUrl("admin")
        return 
      }
      this.api.send_post_request(this.login,"\\login").subscribe(result=>{
        console.log(result)
        this.status=result+""
        if (result==='login'){
          localStorage.setItem("signed_user",JSON.stringify(this.login.get('name')?.value))
          console.log(this.login.get('name')?.value+"HELLO")
          this.api.signed_user=""+this.login.get('name')?.value;
          this.router.navigateByUrl('home')
          console.log("HELLO")
        }
      })

      console.log(typeof (this.status+'') )
      console.log(this.status+'')
      

    }
    signup()
    {
      console.log(this.register)
      this.api.send_post_request(this.register,"\\signup").subscribe(result=>{
        console.log(result)
        alert(result)
        this.status=result+""
      })
    
      
    }
    get rname(){
      return this.register.get("name")
    }

    get rpassword(){
      return this.register.get("password")
    }
    get remail(){
      return this.register.get("email")
    }
    get lname(){
      return this.login.get("name")
    }

    get lpassword(){
      return this.login.get("password")
    }
  

}
