import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { TokenAuthService } from 'src/app/core/auth/token.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})


export class RegisterComponent {

  registerForm!: FormGroup;
  registerErrorMessage = '';
  registerLoad: boolean = false;
  hidePassword = true;
  hidePasswordConfi = true;
  constructor(private http: HttpClient,
    private router: Router,
    private tokenAuthService: TokenAuthService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {

  }

  //  
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required,]),
      'passwordConfirmation': new FormControl(null, [Validators.required,]),
    })
  }


  
  //
  onSubmit() {


    if (this.registerForm.invalid || this.registerForm.value.password!=this.registerForm.value.passwordConfirmation) {
      Object.keys(this.registerForm.controls).forEach((controlName) =>
        this.registerForm.controls[controlName].markAsTouched()
      );
      return;
    }
    this.registerLoad = true;
    let registerData = new FormData();
    registerData.append('name',this.registerForm.value.name);
    registerData.append('email',this.registerForm.value.email);
    registerData.append('password',this.registerForm.value.password);
   registerData.append('password_confirmation',this.registerForm.value.passwordConfirmation);
    this.http.post(environment.urlAPI+'register',registerData)
      .subscribe({
        next: (res: any) => {
          this.registerLoad = false
          this.tokenAuthService.setTokenStorage(res)
          this.showSuccess(res.message)
          this.registerForm.reset()
        }, error: (error : any) => {
          console.log(error);
          this.registerLoad = false
          this.showError(error.message)
        }
      })
  }



  showResponse(response : any) {
    //call to a backend to verify against recaptcha with private key
}




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
