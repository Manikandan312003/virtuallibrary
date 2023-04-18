import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {APIService} from '../service/api.service'
import{Router} from "@angular/router"
import { AllbookComponent } from '../allbook/allbook.component';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private api:APIService,private http:HttpClient,private router:Router,private allbook:AllbookComponent){
    this.api.getdata("\\getallnames").subscribe(result=>{
      console.log(result)
      this.names=result as string[]
      console.log("name",this.names)
    })
    
  }


  images = [  
    { img: "../assets/images/11.jpg" },  
    { img: "../assets/images/22.jpg" },  
    { img: "../assets/images/33.jpg" },  
    //{ img: "../assets/images/4.jpg" },  
    // { img: "../assets/images/5.jpg" },  
    // { img: "../assets/images/6.jpg" },  
    // { img: "../assets/images/7.jpg" },  
    // { img: "../assets/images/8.jpg" },  
    // { img: "../assets/images/9.jpg" },  
  ];
  slideConfig = {  
    "slidesToShow": 3,  
    "slidesToScroll": 3,  
    "dots": true,  
    "infinite": true  
  };  

    counter = 1;
  interval = 5000;

  ngOnInit() {
    this.api.getdata("\\getallnames").subscribe(result=>{
      console.log(result)
      this.names=result as string[]
      console.log("name",this.names)
this.sortedNames = this.names.sort();
  this.inputValue = "";
  
    })
    setInterval(() => {
      const images = document.querySelector(".slider-images") as HTMLElement;
      images.style.transform = `translateX(-${this.counter * 33.33}%)`;
      this.counter++;
      if (this.counter > 2) {
        this.counter = 0;
      }
    }, this.interval);
  }

  names = ["John", "Mary", "David", "Sarah", "James", "Emma"];
  
  sortedNames = this.names.sort();
  inputValue = "";
  matchedNames: string[] = []; // add type annotation here

  onInputChange() {
    console.log(this.sortedNames)
    console.log(this.matchedNames)
    this.matchedNames = [];
    for (let i of this.sortedNames) {
      if (i.toLowerCase().includes(this.inputValue.toLowerCase()) && this.inputValue !== "") {
        this.matchedNames.push(i);
      }
    }
  }

  // onNameClick(name: string) {
  //   this.inputValue = name;
  //   this.matchedNames = [];
  // }
  onenter(){
    this.inputValue
    this.http.post("http://127.0.0.1:5000//getvalue/",JSON.stringify(this.inputValue)).subscribe(result=>{
      this.api.value_searched=result;
      this.router.navigate(["pdf"],{state:{"input":this.inputValue}});
    })
    
  }
  onNameClick(name:string){
    this.inputValue=name
    this.http.post("http://127.0.0.1:5000//getvalue/",JSON.stringify(name)).subscribe(result=>{
      this.api.value_searched=result;
      this.router.navigate(["pdf"],{state:{"input":this.inputValue}});
    })


}
}