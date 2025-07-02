import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account, User } from '../auth/models/auth.models';
import { Store } from '@ngrx/store';
import { AccountState } from '../store/account/account.reducer';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API_URL = 'http://localhost:8080/api/accounts';
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_KEY = 'current_user';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  constructor(private http: HttpClient, private store:Store<{ accounts: AccountState }>) {}

  getUserAccounts(): Observable<any> {
    return this.http.get<Account[]>(`${this.API_URL}`);
  }

  addAccount(account: any): Observable<any> {
    let payload = {
      "userType": account?.accType.code,
      "Solde": account.solde,
      "TOD": account.decouverte ?? account.taux
    };
    return this.http.post(`${this.API_URL}`, payload, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' // <-- Add this line
    });
  }

  getTransactions(account: Account, page: number = 1, size: number = 10): Observable<any> {
    let payload = {
      "code": account?.accountNumber,
      "page": page,
      "size": size
    };
    return this.http.get(`${this.API_URL}/${account?.accountNumber}/operations`,  {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    });
  }
}
