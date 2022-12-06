import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewGroupsComponent } from './view-groups/view-groups.component';

const routes: Routes = [
  {path:'',component:ViewGroupsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
