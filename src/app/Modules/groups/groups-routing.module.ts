import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { ViewGroupsComponent } from './view-groups/view-groups.component';

const routes: Routes = [
  {path:'',component:ViewGroupsComponent},
  {path:'details/:id',component:GroupDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
