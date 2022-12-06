import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class GroupsService {
    constructor(private http : HttpClient) {

    }


    //
    getGroups(){
       return this.http.get<any>(environment.urlAPI+'group')
    }


    //
    addGroup(data : any){
        return this.http.post(environment.urlAPI+'group',data)
    }
}