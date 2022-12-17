import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class FilesService {

    constructor(private http : HttpClient) {}


    //
    getAllFiles(userId:string){
        return this.http.get<any>(environment.urlAPI+'file?user_id='+userId)
    }


    //
    getFreeFiles(userId:string){
        return this.http.get<any>(environment.urlAPI+'file?user_id='+userId+'&group_id')
    }


    //
    uploadFile(data : any){
        return this.http.post(environment.urlAPI+'file',data)
    }


    //
    deleteFile(fileId : string){
        return this.http.delete(environment.urlAPI+'file/'+fileId)
    }

}