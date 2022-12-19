import { Component,OnInit } from '@angular/core';
import { GroupsService } from 'src/app/core/services/groups.services';
import { ToastComponent } from 'src/app/sheared/toast/toast.component';
@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.css']
})
export class AllGroupsComponent implements OnInit  {

  allGroupsArray:any[]=[]
  loadGroups:boolean=false
  skeltonLoderArray=[1,1,1]


  //
  constructor(private groupServices : GroupsService,
    private toast: ToastComponent,){}


  //
  ngOnInit(): void {
    this.getAllGroups()
  }


  //
  getAllGroups(){
    this.loadGroups=true
    this.groupServices.getAllGroups().subscribe({
      next:(res : any)=>{
             this.allGroupsArray=res.data
             this.loadGroups=false
      },
      error:(error : any)=>{
        this.showError(error.error.message)
        this.loadGroups=false
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
