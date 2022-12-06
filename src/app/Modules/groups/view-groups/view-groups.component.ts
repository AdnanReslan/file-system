import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { GroupsService } from 'src/app/core/services/groups.services';
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
  constructor(private groupService : GroupsService){

  }


  //
  ngOnInit() {
      this.items = [
          {
              label:'New',
              icon:'pi pi-fw pi-plus',
              command:()=> this.addGroup(),
          },
      ];

      this.getGroups()
  }   
  
  
  //
  addGroup(){
    alert(1)
  }


  //
  getGroups(){
    this.loadGroups=true
    this.groupService.getGroups().subscribe({
      next:(res : any)=>{
        this.groupsArray=res
        this.loadGroups=false
      },
      error:(error : any)=>{
        this.loadGroups=false
      }
    })
  }
}
