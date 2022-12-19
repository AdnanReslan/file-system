import { Component,OnInit } from '@angular/core';
import { FilesService } from 'src/app/core/services/files.services';
import { ToastComponent } from 'src/app/sheared/toast/toast.component';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit{

  allFilesArray:any[]=[]

  //
  constructor(private filesService:FilesService,
    private toast: ToastComponent,){

  }


  //
  ngOnInit(): void {
    this.getAllFilesAdmin()
  }


  //
  getAllFilesAdmin(){
    this.filesService.getAllFilesAdmin().subscribe({
      next:(res : any)=>{
       this.allFilesArray=res.data.data
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
