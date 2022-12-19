import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ViewFilesComponent } from './view-files/view-files.component';
import { PrimeNGModule } from 'src/app/UiLibraries/PrimeNG.module';
import { MaterialModule } from 'src/app/UiLibraries/Material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllFilesComponent } from './all-files/all-files.component';


@NgModule({
  declarations: [
    ViewFilesComponent,
    AllFilesComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PrimeNGModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
