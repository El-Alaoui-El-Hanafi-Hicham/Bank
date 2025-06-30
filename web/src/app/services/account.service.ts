import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account, User } from '../auth/models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API_URL = 'http://localhost:8080/api/accounts';
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_KEY = 'current_user';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {

   }

   getUserAccounts(): Observable<any[]> {
    return this.http.get<Account[]>(`${this.API_URL}`);
  }

  addAccount(account: any): Observable<any> {
    let payload={
    "userType":account?.accType.code,
 "Solde":account.solde,
 "TOD":account.decouverte??account.taux
}
    return this.http.post<Account>(`${this.API_URL}`, payload,{
      headers: {
        'Content-Type': 'application/json'
      }
    },);
  }

}
