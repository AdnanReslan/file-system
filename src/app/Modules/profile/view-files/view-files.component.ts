import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/core/services/files.services';
import { ToastComponent } from 'src/app/sheared/toast/toast.component';
import {ConfirmationService, ConfirmEventType} from 'primeng/api';
import ls from 'localstorage-slim';
@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css'],
  providers: [ConfirmationService]
})
export class ViewFilesComponent implements OnInit {

  position!: string;
  uploadedFiles: any[] = [];
  uploadfile: any;
  fileName!: string
  filesArray: any[] = []
  fileIdDeleted!: string


  //
  constructor(private toast: ToastComponent,
    private fileServices: FilesService,
    private confirmationService: ConfirmationService,) {

  }


  //
  ngOnInit(): void {
    this.getFiles()
  }


  //
  getFiles() {
    let userId: any = ls.get('id')
    this.fileServices.getAllFiles(userId).subscribe({
      next: (res: any) => {
        this.filesArray = res.data.data
      },
      error: (error: any) => {

      }
    })
  }


  confirmDeleted(fileId : number) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this file?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.fileIdDeleted=fileId.toString()
          this.deleteFile()
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
  deleteFile() {
    this.fileServices.deleteFile(this.fileIdDeleted).subscribe({
      next: (res: any) => {
        this.showSuccess('File deleted successfuly')
        this.getFiles()
      },
      error: (error: any) => {
        this.showError('File not delete successfuly')
      }
    })
  }


  //
  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.showSuccess('File Uploaded')

  }


  //
  sendToServer() {
    let data = new FormData()
    data.append('file', this.uploadfile)
    data.append('name', this.fileName)
    this.fileServices.uploadFile(data).subscribe({
      next: (res: any) => {
        this.showSuccess('File Uploaded')
        this.getFiles()
      },
      error: (res: any) => {
        this.showError('File not Uploade')
      }
    })
  }


  //
  onSelectEvent(event: any) {
    this.uploadfile = event.files[0]
    this.fileName = event.files[0].name
  }


  //
  showSuccess(message: string) {
    this.toast.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }


  //
  showError(message: string) {
    this.toast.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


  //
  onConfirm() {
    this.toast.messageService.clear('c');
  }


  //
  onReject() {
    this.toast.messageService.clear('c');
  }


  //
  clear() {
    this.toast.messageService.clear();
  }



}
