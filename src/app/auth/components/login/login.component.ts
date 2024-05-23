import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service'
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isspinning: boolean = false;
  loginForm!: FormGroup;

   constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private router:Router,
    private message:NzMessageService){}

   ngOnInit(){
    this.loginForm = this.fb.group({
      email:[null,[Validators.email,Validators.required]],
      password: [null, [Validators.required]]
    })
   }
   login(){
    console.log(this.loginForm.value);
    this.authservice.login(this.loginForm.value).subscribe((res) => {
    console.log(res);
    if (res.userId !=null) {
      const user = {
        id: res.userId,
        role:res.userRole
      }
      StorageService.saveUser(user);
      StorageService.saveToken(res.jwt);
      if(StorageService.isAdminLoggedIn()){
      this.router.navigateByUrl("/admin/dashboard");
      }else if(StorageService.isAdminLoggedIn()){
        this.router.navigateByUrl("/customer/dashboard");
      }else {
        this.message.error("Bad credentials",{nzDuration: 50000});
      }
    }
    })
   }

}


