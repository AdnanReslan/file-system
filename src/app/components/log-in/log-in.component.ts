import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { TokenAuthService } from 'src/app/core/auth/token.service';
import { ToastComponent } from 'src/app/sheared/toast/toast.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  loginErrorMessage = '';
  loginLoad: boolean = false;
  hide = true;
  constructor(private http: HttpClient,
    private router: Router,
    private tokenAuthService: TokenAuthService,
    private toast: ToastComponent,
  ) {

  }


  //  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required,]),
    })
  }


  //
  onSubmit() {


    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((controlName) =>
        this.loginForm.controls[controlName].markAsTouched()
      );
      return;
    }
    this.loginLoad = true;
    // { userName: this.loginForm.value.email, passWord: this.loginForm.value.password }, { responseType: 'text' }
    let loginData = new FormData()
    loginData.append('email',this.loginForm.value.email);
    loginData.append('password',this.loginForm.value.password);
    this.http.post(environment.urlAPI + 'login', loginData)
      .subscribe({
        next: (res: any) => {
          this.loginLoad = false
          this.tokenAuthService.setTokenStorage(res.data.token)
          this.tokenAuthService.setUserData(res.data.name,res.data.id,res.data.email,res.data.role)
          this.showSuccess(res.message)
          this.router.navigate(['/home'])
        }, error: (error : any) => {
          console.log(error);
          this.loginLoad = false
          this.showError(error.message)
        }
      })
  }








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
