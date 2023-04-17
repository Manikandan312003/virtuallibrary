import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http:HttpClient) {
    this.signed_user=JSON.stringify(localStorage.getItem("signed_user"));
    this.signed_user=this.signed_user.slice(3,-3)
    console.log("HELLO  ",this.signed_user)
   }
   sign_in="Not Signed"
   signed_user:string=""
   
   server_address="http://127.0.0.1:5000";
   a:any;
   image:any;
   logged_in:any

   send_post_request(data:any,address:any)
   {
    console.log(data);
    this.a=this.server_address+address;
    console.log(this.a);
    return this.http.post(this.server_address+address,JSON.stringify(data.getRawValue()),{responseType:'text'})
   }
   send_post_json(data:any,address:any)
   {
    console.log(data);
    this.a=this.server_address+address;
    console.log(this.a);
    return this.http.post(this.server_address+address,JSON.stringify(data.getRawValue()))
   }
   getdata(data:any)
   {
    return this.http.get(this.server_address+data);
   }
   value_searched:any;
   
}
