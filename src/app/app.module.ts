import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthHeaderInterceptor } from './core/auth/auth-header.interceptor';
import { PrimeNGModule } from './UiLibraries/PrimeNG.module';
import { MaterialModule } from './UiLibraries/Material.module';
import { MessageService } from 'primeng/api';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { ToastComponent } from './sheared/toast/toast.component';
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HomeComponent,
    RegisterComponent,
    NotFound404Component,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PrimeNGModule,
    MaterialModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  },
  MessageService,
  ToastComponent],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
