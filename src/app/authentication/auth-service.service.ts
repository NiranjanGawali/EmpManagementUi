import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public headers: any;
  public data: any;

  constructor(private httpClient: HttpClient) { }

  public signupUser(data: any): Observable<any> {
    return this.httpClient.post(environment.localPortal+'user/signup',data);
  }

  public loginUser(data: any): Observable<any> {
    return this.httpClient.post(environment.localPortal+'user/login',data);
  }

}
