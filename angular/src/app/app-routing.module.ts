import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { LoginComponent } from './login/login.component';
import { AllbookComponent } from './allbook/allbook.component';
import { SearchComponent } from './search/search.component';
import { PdfContentComponent } from './pdf-content/pdf-content.component';
import { RatingComponent } from './rating/rating.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { BookComponent } from './book/book.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';


const routes: Routes = [
  {path:"home",component:HomepageComponent ,
  children:[{path:"wish",component:AllbookComponent,data:{"name":"wish"}},
  {path:"book",component:AllbookComponent,data:{"name":"book"}},
  {path:"recent",component:AllbookComponent,data:{"name":"recent"}},
  {path:"roadmap",component:RoadmapComponent},
  
  {path:"search",component:SearchpageComponent},
]
  },
  {path:"roadmap",component:RoadmapComponent},
  {path:"admin",component:AdminhomeComponent},{path:"cat",component:SearchComponent},
  {path:"login",component:LoginComponent},{path:"pdf",component:SearchpageComponent},{path:"search",component:BookComponent},{path:"show",component:PdfContentComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
