import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class GroupsService {
    constructor(private http : HttpClient) {}


    //
    getGroups(userId : string){
        return this.http.get<any>(environment.urlAPI)
    }


    //
    getGroup(groupId : string){
       return this.http.get<any>(environment.urlAPI+'group'+'/'+groupId)
    }


    //
    addGroup(data : any){
        return this.http.post(environment.urlAPI+'group',data)
    }


    //
    addFileToGroup(data : any , groupId : string){
        return this.http.post(environment.urlAPI+'group/'+groupId+'/add-file',data)
    }


    //
    deleteFileFromGroup(data : any , groupId : string){
        return this.http.post(environment.urlAPI+'group/'+groupId+'/delete-file',data)
    }
}