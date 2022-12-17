import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';
@Injectable({
  providedIn: 'root'
})

export class TokenAuthService {


  //
  constructor(private router:Router) {
    ls.config.encrypt = true;
   }


  // set token
  setTokenStorage(token:any){
    ls.set('token', token);
  }


  // set user data
  setUserData(name:string,id:string,email:string,role:string){
    ls.set('name',name)
    ls.set('id',id)
    ls.set('email',email)
    ls.set('role',role)
  }


  // get token
  getJwtToken(){
    return ls.get('token'); 
  }


  // Remove token from local storage
  destroyToken(){
    localStorage.clear()
  }

}