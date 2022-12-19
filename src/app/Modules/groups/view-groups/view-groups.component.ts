import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { GroupsService } from 'src/app/core/services/groups.services';
import ls from 'localstorage-slim';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupComponent } from '../add-group/add-group.component';
import { ToastComponent } from 'src/app/sheared/toast/toast.component';
@Component({
  selector: 'app-view-groups',
  templateUrl: './view-groups.component.html',
  styleUrls: ['./view-groups.component.css']
})

export class ViewGroupsComponent implements OnInit {

  skeltonLoderArray=[1,1,1]
  items!: MenuItem[];
  loadGroups: boolean = false
  groupsArray:any[]=[]


  //
  constructor(private groupService : GroupsService,
    private dialog: MatDialog,
    private toast: ToastComponent,){
    ls.config.encrypt = true;
  }


  //
  ngOnInit() {
      this.items = [
          {
              label:'New',
              icon:'pi pi-fw pi-plus',
              command:()=> this.addGroup(-1),
          },
      ];

      this.getGroups()
  }


  //
  addGroup(index : number){
    var data;
    if(index==-1){
      var data = null
    }
    // else{
    //   var data : any = this.PatientsArray.find(item => item.PatID == index.toString());
    // }

    this.dialog.open(AddGroupComponent,{data :{ courier: data },width:'400px'}).afterClosed()
    .subscribe((val) => {
      if (!val ) {
        return;
      }
      if (val["isUpdated"]) {
        this.getGroups()

      }
      else if(val["isAdded"]){
        this.getGroups()
      }
    });
  }


  //
  getGroups(){
    this.loadGroups=true
    let userId : any = ls.get('id')
    this.groupService.getGroups(userId).subscribe({
      next:(res : any)=>{
        this.groupsArray=res.data.data;
        console.log(this.groupsArray)
        this.loadGroups=false
      },
      error:(error : any)=>{
        this.loadGroups=false
      }
    })
  }


  deletedGroup(groupId : number){
    this.groupService.deleteGroup(groupId.toString()).subscribe({
      next:(res : any)=>{
        this.showSuccess("Group deleted successfuly")
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
