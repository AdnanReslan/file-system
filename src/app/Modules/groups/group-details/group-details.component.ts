import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/core/services/groups.services';
import { ToastComponent } from 'src/app/sheared/toast/toast.component';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { FilesService } from 'src/app/core/services/files.services';
import ls from 'localstorage-slim';
import { UsersService } from 'src/app/core/services/users.services';
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css'],
  providers: [ConfirmationService]
})
export class GroupDetailsComponent implements OnInit {

  loadGroup: boolean = false;
  group: any;
  groupId!: string;
  addedFileId!: string;
  deletedFileId!: string;
  fileIdDeleted!: string;
  fileFreeArray:any[]=[];
  displayUserModal:boolean = false
  displayLogFileModal:boolean = false
  displayEditFileModal:boolean = false
  userAvivableArray:any[]=[]
  userId!:any
  fileLogesArray:any[]=[]
  selectedFiles:any[]=[]
  contentFile:string=''
  fileIdEdit!:number;
  loadRequest:boolean=false
  loadUser:boolean=false;
  //
  constructor(private groupService: GroupsService,
    private fileServices: FilesService,
    private route: ActivatedRoute,
    private toast: ToastComponent,
    private confirmationService: ConfirmationService,
    private userServices : UsersService) {
    ls.config.encrypt = true;
    this.groupId = this.route.snapshot.params['id'];
    this.userId=ls.get('id')
  }


  //
  ngOnInit(): void {
    this.getGroup()
    this.getFiles()
  }


  //
  getGroup() {
    this.loadGroup = true
    this.groupService.getGroup(this.groupId).subscribe({
      next: (res: any) => {
        this.group = res.data
        this.loadGroup = false
      },
      error: (error: any) => {
        this.loadGroup = false
      }
    })
  }


  //
  getFileLoges(fileID : number){
    this.groupService.getGroup(this.groupId).subscribe({
      next: (res: any) => {
        for(let i=0 ; i<res.data.files.length ; i++){
          if(fileID==res.data.files[i].id){
            this.fileLogesArray= res.data.files[i].file_logs;
        }
        }
        this.displayLogFileModal=true
      },
      error: (error: any) => {
        this.loadGroup = false
      }
    })
  }


  getFiles() {
    let userId : any = ls.get('id')
    this.fileServices.getFreeFiles(userId).subscribe({
      next: (res: any) => {
         this.fileFreeArray=res.data.data
      },
      error: (error: any) => {

      }
    })
  }


  //
  confirmAddedFile(fileId : number) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to added this file to group?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.addFileToGroup(fileId.toString())
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
  addFileToGroup(fileId : string) {
    let data = new FormData()
    data.append('file_id', fileId)
    this.groupService.addFileToGroup(data, this.groupId).subscribe({
      next: (res: any) => {
        this.showSuccess('File added successfuly')
        this.getGroup()
        this.getFiles()
      },
      error: (res: any) => {
        this.showError('File not add successfuly')
      }

    })
  }


  //
  confirmDeletedFile(fileId: number) {
    console.log(fileId);
    this.confirmationService.confirm({
      message: 'Do you want to delete this file?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.fileIdDeleted = fileId.toString()
        this.deleteFileFromGroup(fileId.toString());
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:

            break;
          case ConfirmEventType.CANCEL:

            break;
        }
      }
    });
  }



  //
  deleteFileFromGroup(fileId: string) {
    let data = new FormData()
    data.append('file_id', fileId)
    this.groupService.deleteFileFromGroup(data, this.groupId).subscribe({
      next: (res: any) => {
        this.showSuccess('File deleted successfuly')
        this.getGroup()
        this.getFiles()
      },
      error: (res: any) => {
        this.showError(res.error.message)
      }

    })
  }



  //
  showUserAvivableDialog(){
    this.displayUserModal=true
    this.getAvivableUserToAdd('')
  }


  //
  getAvivableUserToAdd(search : string){
    this.userServices.getAvivableUser(this.groupId,search).subscribe({
      next:(res : any)=>{
        this.userAvivableArray=res.data.data
        this.loadUser=false
      },
      error:(error : any)=>{
        this.loadUser=false
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.getAvivableUserToAdd(filterValue)
  }


  //
  addUserToGroup(userId : string){
    this.loadUser=true
    let data = new FormData()
    data.append('user_id',userId)
    this.userServices.addUserToGroup(data,this.groupId).subscribe({
      next:(res : any)=>{
        this.getGroup()
        this.getAvivableUserToAdd('')
        this.showSuccess('User Added successfuly to group')
      },
      error:(error : any)=>{
        this.showError(error.error.message)
        this.loadUser=false
      }
    })
  }



  //
  confirmDeletedUser(userId: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this User from group?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteUserFromGroup(userId.toString());
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:

            break;
          case ConfirmEventType.CANCEL:

            break;
        }
      }
    });
  }


  //
  deleteUserFromGroup(userId : string){
    let data = new FormData()
    data.append('user_id',userId)
    this.userServices.deleteUserFromGroup(data,this.groupId).subscribe({
      next:(res : any)=>{
        this.getGroup()
        this.showSuccess('User deleted successfuly to group')
      },
      error:(error : any)=>{
        this.showError(error.error.message)
      }
    })
  }


  //
  checkIn(fileId : number){
    this.loadRequest=true
    let data = new FormData();
    data.append('files[0]',fileId.toString())
    this.fileServices.checkIn(data).subscribe({
      next:(res : any)=>{
         this.showSuccess('File has been check in successfuly')
         this.getGroup()
         this.loadRequest=false
      },
      error:(error : any)=>{
        this.showError(error.error.message)
        this.loadRequest=false
      }
    })
  }


  //
  checkOut(fileId : number){
    this.loadRequest=true
    let data = new FormData();
    data.append('files[0]',fileId.toString())
    this.fileServices.checkOut(data).subscribe({
      next:(res : any)=>{
        this.showSuccess('File has been check out successfuly')
        this.getGroup()
        this.loadRequest=false
      },
      error:(error : any)=>{
        this.showError(error.error.message)
        this.loadRequest=false
      }
    })
  }


  editCheckArray(fileId : number){
    if(this.selectedFiles.indexOf(fileId) == -1){
      this.selectedFiles.push(fileId)
    }
    else{
      const index = this.selectedFiles.indexOf(fileId)
      this.selectedFiles.splice(index, 1)
    }
  }


  //
  checkInAll(){
    this.loadRequest=true
    let data = new FormData();
    for(let i=0 ; i<this.selectedFiles.length;i++){
      data.append('files['+i.toString()+']',this.selectedFiles[i])
    }
    this.fileServices.checkIn(data).subscribe({
      next:(res : any)=>{
         this.showSuccess('Files has been check in successfuly')
         this.getGroup()
         this.loadRequest=false
      },
      error:(error : any)=>{
        this.showError(error.error.message)
        this.loadRequest=false
      }
    })
  }


  //
  checkOutAll(){
    this.loadRequest=true
    let data = new FormData();
    for(let i=0 ; i<this.selectedFiles.length;i++){
      data.append('files['+i.toString()+']',this.selectedFiles[i])
    }
    this.fileServices.checkOut(data).subscribe({
      next:(res : any)=>{
        this.showSuccess('Files has been check out successfuly')
        this.getGroup()
        this.loadRequest=false
      },
      error:(error : any)=>{
        this.showError(error.error.message)
        this.loadRequest=false
      }
    })
  }


  //
  getFileContent(fileID : number){
    this.fileIdEdit=fileID
    this.loadRequest=true
    this.fileServices.getFileContent(fileID.toString()).subscribe({
      next:(res : any)=>{
        this.contentFile=res.data.content
        this.displayEditFileModal=true
        this.loadGroup=false
        this.loadRequest=false
      },
      error:(error : any)=>{
        this.showError(error.error.message)
        this.loadGroup=false
        this.loadRequest=false
      }
    })
  }


  //
  updateFileContent(){
    let data = new FormData()
    data.append('content',this.contentFile)
    data.append('_method',"PUT")
    this.fileServices.updateFileContent(this.fileIdEdit.toString(),data).subscribe({
      next:(res : any)=>{
        this.showSuccess('File Update Successfuly')
        this.displayEditFileModal=false
      },
      error:(error : any)=>{
        this.showError(error.error.message)
      }
    })
  }

  //
  showSuccess(message: string) {
    this.toast.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }



  showError(message: string) {
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
