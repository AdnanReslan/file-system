import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { ViewGroupsComponent } from './view-groups/view-groups.component';
import { MaterialModule } from 'src/app/UiLibraries/Material.module';
import { PrimeNGModule } from 'src/app/UiLibraries/PrimeNG.module';
import {MenuItem} from 'primeng/api';

@NgModule({
  declarations: [
    ViewGroupsComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    PrimeNGModule,
    MaterialModule,
  ]
})
export class GroupsModule { }
