import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import {APIService} from '../service/api.service'
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent {
  constructor(private router: Router,private api:APIService,private http:HttpClient){}
  selectedFile: File | undefined;
  uploadfile: File | undefined;
  pdfphoto: File | undefined;


  title_login='Reactive Form';
  books=new FormGroup({
    bookname:new FormControl("",Validators.required),
    authorname:new FormControl(),
    category:new FormControl(),
    uploadbook:new FormControl(),
    bookfront:new FormControl(),
    contentst:new FormControl(),
    contentend:new FormControl(),
  });
  bookname:string=""
  authorname:string=""
  category:string="ECE"
  uploadbook:File|undefined
  bookfront:File|undefined
  contentst:string=""
  contentend:string=""
  formsubmit(){
    if(!this.selectedFile){
      console.log("NO FILE SELECTED");
      return
    }
    const fd = new FormData();
fd.append('bookname', this.bookname);
fd.append('authorname', this.authorname);
fd.append('category', this.category);
if (this.uploadbook) {
  fd.append('uploadbook', this.uploadbook);
  
}
if (this.bookfront) {
  fd.append('bookfront', this.bookfront);
  
}
fd.append('contentst', this.contentst);
fd.append('contentend', this.contentend);
console.log(fd)

    this.http.post('http://127.0.0.1:5000/upload', fd).subscribe((res) => {
      console.log(res);})
    
    console.log(this.books)
    // const formData = new FormData();
    // formData.append('file',this.books.get('uploadbook').value);
    // const formData = new FormData();
    

    // this.api.send_post_request(this.books,"//addbook",).subscribe(result=>{
    //   console.log(result)
    // })

    
  }

onFileSelected(event:any) {
  this.uploadfile = event.target.files[0];
}
photo(event:any) {
  this.pdfphoto = event.target.files[0];
}

onUpload() {
  if (!this.uploadfile) {
    console.log('Upload No file selected');
    return;
  }
  if (!this.pdfphoto) {
    console.log('No file selected');
    return;
  }
  console.log(this.bookname,this.authorname,this.category,this.contentst,this.contentend)
  const fd = new FormData();
  fd.append('bookname', this.bookname);
  fd.append('authorname', this.authorname);
  fd.append('category', this.category);
  fd.append('contentst', this.contentst);
  fd.append('contentend', this.contentend);
  

  fd.append('upload', this.uploadfile, this.uploadfile.name);
  fd.append('pdfphoto', this.pdfphoto, this.pdfphoto.name);
  this.http.post('http://127.0.0.1:5000//upload', fd).subscribe((res) => {
    console.log(res);
  });
  }
}
