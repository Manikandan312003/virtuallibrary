import { Component } from '@angular/core';
import {APIService} from '../service/api.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent {
  inputValue=""
  getinput:any
  names=["john"];
  constructor(private api:APIService ,private router:Router,private http:HttpClient){
     this.getinput=this.router.getCurrentNavigation()?.extras.state
    this.names=[]
    for(let index of this.api.value_searched)
    {
      this.names.push(index.name)
    }
          // this.names=this.api.value_searched as string[]
      console.log("name",this.names)
  }
  images:any;
  length:any;
  dupimages:any;

  rout(data:any){
    this.api.image=data;
    console.log(data)
    this.router.navigateByUrl("search")
  }
  slideConfig = {  
    "slidesToShow": 3,  
    "slidesToScroll": 3,  
    "dots": true,  
    "infinite": true  
  };  
  counter = 1;
  interval = 5000;
  ngOnInit(){

    this.images=this.api.value_searched;
    this.length=this.images.length;
    console.log(this.api.value_searched)
    this.names=[]
    for(let index of this.api.value_searched)
    {
      this.names.push(index.name)
    }
    // this.names= this.api.value_searched as string[]
    console.log("name",this.names)
this.sortedNames = this.names.sort();
this.inputValue = "";

setInterval(() => {
  const images = document.querySelector(".slider-images") as HTMLElement;
  images.style.transform = `translateX(-${this.counter * 33.33}%)`;
  this.counter++;
  if (this.counter > 2) {
    this.counter = 0;
  }
}, this.interval);
  }
  

    matchedNames: string[] = []; // add type annotation her

      sortedNames = this.names.sort();
  onInputChange() {
    
    this.matchedNames = [];
    console.log(this.sortedNames)
    console.log(this.matchedNames)
    console.log(this.inputValue)
    for (let i of this.sortedNames) {
      if (i.toLowerCase().includes(this.inputValue.toLowerCase()) && this.inputValue !== "") {
        this.matchedNames.push(i);
      }
    }
  }

  addwish(recent:string){
    this.http.post("http://127.0.0.1:5000//addwish",JSON.stringify({"name":this.api.signed_user,"wish":""+recent})).subscribe(
      res=>{
        console.log(res)
      })}

        onenter(){
    
    // this.http.post("http://127.0.0.1:5000//getvalue/",JSON.stringify(this.inputValue)).subscribe(result=>{
    //   this.api.value_searched=result;
    //   this.router.navigate(["pdf"],{state:{"input":this.inputValue}});
    // })
    this.dupimages=this.images
    this.images=[]
    for(var index of this.dupimages)
    {
      console.log(index.name)
      if(this.matchedNames.indexOf(index.name)>-1)
      {
        this.images.push(index)
      }
    }
    console.log(this.images)
    this.api.value_searched=this.dupimages
    
    // this.router.navigate(["pdf"],{state:{"input":this.inputValue}});
    
    // this.images=this.matchedNames
    
  }
  onNameClick(name:string){
    // this.inputValue=name
    // this.http.post("http://127.0.0.1:5000//getvalue/",JSON.stringify(name)).subscribe(result=>{
    //   this.api.value_searched=result;
    //   this.router.navigate(["pdf"],{state:{"input":this.inputValue}});
    // })
    // console.log(this.matchedNames)
    // this.images=this.matchedNames
    this.dupimages=this.images
    this.images=[]
    console.log("HELLO",name)
    console.log(this.dupimages)
    for(var index of this.dupimages){
      if (index.name===name){
        this.images.push(index)
      }
    }
    console.log(this.images)
    this.api.value_searched=this.dupimages
    this.names=[]
    for(let index of this.images)
    {
      this.names.push(index.name)
    }
    this.sortedNames=this.names.sort()
    this.matchedNames=this.names.sort()
    

}}
