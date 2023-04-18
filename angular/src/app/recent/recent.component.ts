import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent {
  uploadfile: File | undefined;
  pdfphoto: File | undefined;



  uploadForm: FormGroup = new FormGroup({
    file: new FormControl('')
  });


  constructor(private formBuilder: FormBuilder, private http:HttpClient) {}


  onFileSelected(event) {
    this.uploadfile = event.target.files[0];
  }
  photo(event) {
    this.pdfphoto = event.target.files[0];
  }

  onUpload() {
    if (!this.uploadfile) {
      console.log('No file selected');
      return;
    }
    if (!this.pdfphoto) {
      console.log('No file selected');
      return;
    }
    const fd = new FormData();
    fd.append('upload', this.uploadfile, this.uploadfile.name);
    fd.append('pdfphoto', this.pdfphoto, this.pdfphoto.name);
    this.http.post('http://127.0.0.1:5000//upload', fd).subscribe((res) => {
      console.log(res);
    });
    }
}
