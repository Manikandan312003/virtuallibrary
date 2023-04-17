import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  title='star'
  Handle(event:number){
    // console.log(event)
    
  }
  command:any;

}
