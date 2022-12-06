import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLogInService } from './core/auth/auth-login.service';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login',component:LogInComponent},
  {path:'register',component:RegisterComponent},
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthLogInService],// <---- connected Route with guard
    children: [
      {
        path: "profile",
        loadChildren: () =>
          import("./Modules/profile/profile.module").then((m) => m.ProfileModule),
      },
      {
        path: "groups",
        loadChildren: () =>
          import("./Modules/groups/groups.module").then((m) => m.GroupsModule),
      },
    ],
  },
  {path:'**',redirectTo:'not-found'},
  {path:'not-found',component:NotFound404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
