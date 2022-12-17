import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { ViewGroupsComponent } from './view-groups/view-groups.component';
import { MaterialModule } from 'src/app/UiLibraries/Material.module';
import { PrimeNGModule } from 'src/app/UiLibraries/PrimeNG.module';
import {MenuItem} from 'primeng/api';
import { AddGroupComponent } from './add-group/add-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupDetailsComponent } from './group-details/group-details.component';
@NgModule({
    declarations: [
        ViewGroupsComponent,
        AddGroupComponent,
        GroupDetailsComponent
    ],
    imports: [
        CommonModule,
        GroupsRoutingModule,
        PrimeNGModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        
    ]
})
export class GroupsModule { }
