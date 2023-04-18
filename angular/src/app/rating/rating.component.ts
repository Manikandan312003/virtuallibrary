import { Component,ChangeDetectionStrategy ,EventEmitter,Input,OnInit, Output} from '@angular/core';
// import { GcPdfViewer } from '@grapecity/gcpdfviewer';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../service/api.service';
import { delay } from 'rxjs';

interface ResponseObject {
  rating: number;
  command: any;
  exist: string;
}


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RatingComponent implements OnInit {
  title = 'viewer-app';

  
  rating_op:number=0;
  command_op:any;
  exist:string=""
  commandfun(){
    this.http.post<ResponseObject[]>("http://127.0.0.1:5000//getcmd", JSON.stringify({"book": this.api.image})).subscribe(
  res => {
    console.log(res)
    this.rating_op = res[0].rating;
    this.command_op = res[0].command;
    this.exist = res[0].exist;
    console.log(this.rating_op)
  }
)
    // this.http.post(" http://127.0.0.1:5000//getcmd",JSON.stringify({"book":this.api.image})).subscribe(
    //   res=>{
    //     console.log(res)
    //     this.rating_op=res[0].rating;
    //     this.command_op=res[0].command;
    //     this.exist=res[0].exist;
        
    //     console.log(this.rating_op)
    //   })
      console.log("INSIDE COMMAND FUN")
      
    }
    ngAfterViewInit() {
      this.commandfun();
      
      
    }
    constructor(private http:HttpClient, private api:APIService){}
    onsubmit(){
      if(this.command!=""){
        this.http.post(" http://127.0.0.1:5000//setcmd",JSON.stringify({"book":this.api.image,"rating":this.SelectedStar,"command":this.command})).subscribe(
          res=>{
            console.log(res)
          }
          )
          
          console.log("IN ONSUBMIT")
      delay(100000000)
      this.commandfun();
      
  }
    else{
      alert("Enter command ")
      this.command_op[0]="HELLO";
      console.log(this.command_op)
    }
  }
  command:string=""
  @Input() maxRating=5
  maxRatingArr:any=[];
  @Output()
  onRating:EventEmitter<number>=new EventEmitter<number>();

@Input() SelectedStar=0;
previousSelection=0;
  HandleMouseEnter(index:number){
    this.SelectedStar=index+1;
  }
  HandleMouseLeave(){
    if(this.previousSelection!==0){
      this.SelectedStar=this.previousSelection;
    }
    else{
      this.SelectedStar=0
    }
  }
  Rating(index:number){
    this.SelectedStar=index+1;
    this.previousSelection=this.SelectedStar;
    this.onRating.emit(this.SelectedStar);
    console.log("YOUR ",this.SelectedStar)
    }
  ngOnInit(): void {
    this.maxRatingArr=Array(this.maxRating).fill(0);
  }

  
 

}