import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService, PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit,AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  loadLogout : boolean = false;
  constructor(private observer: BreakpointObserver, 
              private router: Router,
              private http : HttpClient,
              private messageService: MessageService,
    private primengConfig: PrimeNGConfig) {}


  //
  ngOnInit(){
    this.primengConfig.ripple = true;
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
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }



  showError(message : string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}
