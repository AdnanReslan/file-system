import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminService } from 'src/app/core/auth/auth.admin.service';
import { AllFilesComponent } from './all-files/all-files.component';
import { ViewFilesComponent } from './view-files/view-files.component';

const routes: Routes = [
  {path:'',component:ViewFilesComponent},
  {path:'all',component:AllFilesComponent,canActivate:[AuthAdminService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
