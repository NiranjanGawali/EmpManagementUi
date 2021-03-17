import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;

  constructor(public fb: FormBuilder,private authService: AuthServiceService,private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(4)]],
      confirmPassword: ['',[Validators.required,Validators.minLength(4)]]     
    });
  }


  submitForm() {
    console.log(this.myForm.value);
    let payload = this.myForm.value;
    if(payload.password != payload.confirmPassword) {
      this.toastr.warning('Password and Confirm password fiedls should be same!!!!');
      //  alert('Password and Confirm password fiedls should be same!!!!');
      // return this.myForm.reset();
    }

    this.authService.signupUser(payload).subscribe(res => {
      console.log('RESULT..........');
      
      console.log(res);
      if(res.status) {
        console.log('User Signup successfully!!!');     
        // this.myForm.reset();
        this.toastr.success('User Registered Successfully!!!');
        setTimeout(() => {
          this.router.navigate(['auth/login'])
        }, 1500);

      } 
    }, err => {
      console.log('ERROR LOGGG');      
      // this.myForm.reset();
      console.log(err);
    });

  }

  gotoSignupPage() {
    this.router.navigate(['/auth/login']);
  }

}
