import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter-comp',
  templateUrl: './starter-comp.component.html',
  styleUrls: ['./starter-comp.component.scss']
})
export class StarterCompComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToAuthentication(routeComonent): void {
    try {
      console.log(routeComonent);
      if(routeComonent == 'login') {
        this.router.navigate(['auth/login'])
      } else {
        this.router.navigate(['auth/signup'])
      }
    } catch (err) {
      return console.log(err);
      
    }
  }

}
