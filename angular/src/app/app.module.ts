import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, NgModel,ReactiveFormsModule} from '@angular/forms'
import {MatIconModule} from '@angular/material/icon';
// import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIcon } from '@angular/material/icon';
import { HttpClientModule } from  '@angular/common/http';
import { CommonModule } from '@angular/common';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatListModule} from '@angular/material/list';


import { RoadmapComponent } from './roadmap/roadmap.component';
import { LoginComponent } from './login/login.component';
import { AllbookComponent } from './allbook/allbook.component';
import { SearchComponent } from './search/search.component';
import { PdfContentComponent } from './pdf-content/pdf-content.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { RatingComponent } from './rating/rating.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { BookComponent } from './book/book.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll'




@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RoadmapComponent,
    LoginComponent,
    AllbookComponent,
    SearchComponent,
    PdfContentComponent,
    AdminhomeComponent,
    RatingComponent,
    SearchpageComponent,
    BookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,
    BrowserAnimationsModule,MatIconModule,MatToolbarModule,MatSidenavModule,MatListModule,CommonModule,InfiniteScrollModule
  ],
  providers: [AllbookComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
