import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminService } from 'src/app/core/auth/auth.admin.service';
import { AllGroupsComponent } from './all-groups/all-groups.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { ViewGroupsComponent } from './view-groups/view-groups.component';

const routes: Routes = [
  {path:'',component:ViewGroupsComponent},
  {path:'all',component:AllGroupsComponent,canActivate:[AuthAdminService]},
  {path:'details/:id',component:GroupDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
