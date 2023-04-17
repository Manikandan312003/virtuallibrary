import { Component } from '@angular/core';
import { APIService } from '../service/api.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  images: any;
  name: any;
  cpath = "";
  fpath="";
  path: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');


  constructor(private api: APIService, private http: HttpClient, private sanitizer: DomSanitizer,private router:Router) { }

  ngOnInit() {
    this.name = this.api.image;
    console.log(this.api.image);

    this.http.post("http://127.0.0.1:5000//getsource", JSON.stringify({ "name": this.name })).subscribe(result => {
      this.images = result;
      this.cpath = this.images[0].cpath;
      this.fpath = this.images[0].path;
      console.log("image", this.images);
      console.log(result);

      // Set the path variable once you have the correct URL for the PDF file
      this.path = this.sanitizer.bypassSecurityTrustResourceUrl("assets/pdf/content/"+this.cpath+".pdf");
    });
  }
  readbook()
  {
    console.log("HELLO")
    // this.http.post("http://127.0.0.1:5000//addrecent", JSON.stringify({ "name": this.name }))
    console.log({"name":this.api.signed_user,"recent":""+this.images[0].name})
    this.http.post("http://127.0.0.1:5000//addrecent",JSON.stringify({"name":this.api.signed_user,"recent":""+this.images[0].name})).subscribe(
      res=>{
        console.log(res)
      }
    )
    console.log("HELLO")
    this.router.navigate(["show"],{state:{"path":this.fpath}})
  }
}
