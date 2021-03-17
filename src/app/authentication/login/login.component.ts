import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main.service';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public fb: FormBuilder, private authService: AuthServiceService,private router:Router,
    private mainService: MainService) { }
  ngOnInit(): void {
    this.loginReactiveForm();
    this.mainService.checkIfUserLoggedIn();
  }

  loginReactiveForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  loginMethod() {
    console.log(this.loginForm.value);
    let payload = this.loginForm.value;

    this.authService.loginUser(payload).subscribe(res => {
      if (res.status) {
        console.log('User login successfully!!!');
        console.log(res);
        localStorage.setItem('userData',JSON.stringify(res.data));
        localStorage.setItem('token',JSON.stringify(res.data.token));
        
        this.router.navigate(['/dashboard/main']);
      }
    }, err => {
      return console.log(err);
    });

  }
}

