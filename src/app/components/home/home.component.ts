import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import {untilDestroyed } from '@ngneat/until-destroy';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastComponent } from 'src/app/sheared/toast/toast.component';
import ls from 'localstorage-slim';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  loadLogout : boolean = false;
  url!:string;
  userName!:any
  constructor(private observer: BreakpointObserver, 
              private router: Router,
              private http : HttpClient,
              private toast: ToastComponent,
              ) {
                router.events
                .pipe(filter((event) => event instanceof NavigationEnd))
                .subscribe((event: any) => {
                  this.url = event.url.toString();
                  if(this.url=='/home'){
                    this.router.navigate(['/home/profile'])
                  }
                
                });
              
                if(this.router.url=='/home'){
                  this.router.navigate(['/home/profile'])
                }
                
                ls.config.encrypt = true;
              }


  //
  ngOnInit(){
       this.userName=ls.get('name')
  }


  //
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)'])
    .subscribe((res : any) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

  this.router.events
    .pipe(
      untilDestroyed(this),
      filter((e) => e instanceof NavigationEnd)
    )
    .subscribe(() => {
      if (this.sidenav.mode === 'over') {
        this.sidenav.close();
      }
    });
  }


  //
  logout(){
   this.loadLogout=true
  this.http.post(environment.urlAPI+'logout',null).subscribe({
    next:((res : any)=>{
      localStorage.clear();
      this.router.navigate(['/login'])
      this.showSuccess(res.message)
      this.loadLogout=false
    }),
    error:((error : any)=>{
      this.showError(error.message)
      this.loadLogout=false
    })
  })
   
  }


  //
  showSuccess(message : string) {
    this.toast.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }



  showError(message : string) {
    this.toast.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



  onConfirm() {
    this.toast.messageService.clear('c');
  }

  onReject() {
    this.toast.messageService.clear('c');
  }

  clear() {
    this.toast.messageService.clear();
  }
}
