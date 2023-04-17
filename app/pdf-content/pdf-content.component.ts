import { Component } from '@angular/core';
// import {GcPdfViewer} from'@grapecity/gcpdfviewer'
import {APIService} from '../service/api.service'

import { Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pdf-content',
  templateUrl: './pdf-content.component.html',
  styleUrls: ['./pdf-content.component.css']
})
export class PdfContentComponent {
  path_dic:any;
  path: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  constructor(private api:APIService,private http:HttpClient,private route:Router,private sanitizer: DomSanitizer){
    console.log(this.route.getCurrentNavigation()?.extras.state)
    this.path_dic=this.route.getCurrentNavigation()?.extras.state

this.path = this.sanitizer.bypassSecurityTrustResourceUrl("assets/pdf/"+this.path_dic["path"]+".pdf");
  }
  title = 'viewer-app';


}
