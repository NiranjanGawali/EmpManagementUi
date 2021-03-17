import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private router: Router) { }

  checkIfUserLoggedIn() {
    console.log('CHECK IF TOKEN IS PRESENT OR NOT!!!');
    
    if(localStorage.getItem('token')) {
      this.router.navigate(['/dashboard/main']);
    } else {
      this.router.navigate(['/auth/login'])
    }
  }

}
