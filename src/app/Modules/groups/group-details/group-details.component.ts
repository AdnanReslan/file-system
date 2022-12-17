import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/core/services/groups.services';
import { ToastComponent } from 'src/app/sheared/toast/toast.component';
import {ConfirmationService, ConfirmEventType} from 'primeng/api';
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css'],
  providers: [ConfirmationService]
})
export class GroupDetailsComponent implements OnInit {

  loadGroup: boolean = false;
  group:any;
  groupId!:string;
  addedFileId!:string;
  deletedFileId!:string;
  fileIdDeleted!: string

  //
  constructor(private groupService : GroupsService,
              private route : ActivatedRoute,
              private toast: ToastComponent,
              private confirmationService: ConfirmationService){
    this.groupId = this.route.snapshot.params['id'];
  }


  //
  ngOnInit(): void {
     this.getGroup()
  }


  //
  getGroup(){
    this.loadGroup=true
    this.groupService.getGroup(this.groupId).subscribe({
      next:(res : any)=>{
        this.group=res.data
        this.loadGroup=false
      },
      error:(error : any)=>{
        this.loadGroup=false
      }
    })
  }


  getFiles(){

  }


  //
  addFileToGroup(){
    let data = new FormData()
    data.append('file_id',this.addedFileId)
      this.groupService.addFileToGroup(data,this.groupId).subscribe({
      next:(res : any)=>{
        this.showSuccess('File added successfuly')
        this.getGroup()
      },
      error:(res : any)=>{
        this.showError('File not add successfuly')
      }

      })
  }


  //
  confirmDeleted(fileId : number) {
    console.log(fileId);
    this.confirmationService.confirm({
        message: 'Do you want to delete this file?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.fileIdDeleted=fileId.toString()
          this.deleteFileFromGroup(fileId.toString());
        },
        reject: (type : any) => {
            switch(type) {
                case ConfirmEventType.REJECT:

                break;
                case ConfirmEventType.CANCEL:

                break;
            }
        }
    });
}



  //
  deleteFileFromGroup(fileId : string){
    let data = new FormData()
    data.append('file_id',fileId)
    this.groupService.deleteFileFromGroup(data,this.groupId).subscribe({
      next:(res : any)=>{
        this.showSuccess('File deleted successfuly')
        this.getGroup()
      },
      error:(res : any)=>{
        this.showError('File not delete successfuly')
      }

      })
  }

//
  showSuccess(message : string) {
    this.toast.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }



  showError(message : string) {
    this.toast.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



  onConfirm() {
    this.toast.messageService.clear('c');
  }

  onReject() {
    this.toast.messageService.clear('c');
  }

  clear() {
    this.toast.messageService.clear();
  }


}
