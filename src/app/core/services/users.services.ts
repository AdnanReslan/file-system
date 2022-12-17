import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(private http : HttpClient) {}


    //
    addUserToGroup(data : any,groupId : string){
        return this.http.post(environment.urlAPI+'group/'+groupId+'/add-user',data)
    }


    //
    deleteUserFromGroup(data : any,groupId : string){
        return this.http.post(environment.urlAPI+'group/'+groupId+'/delete-user',data)
    }


    //
    getAvivableUser(groupId : string , search : string){
        return this.http.get<any>(environment.urlAPI+'users?group_id='+groupId+'&search='+search)
    }

}