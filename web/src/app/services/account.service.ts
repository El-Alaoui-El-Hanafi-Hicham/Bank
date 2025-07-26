import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account, User } from '../auth/models/auth.models';
import { Store } from '@ngrx/store';
import { AccountState } from '../store/account/account.reducer';
import { EnvService } from './env.service';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {



  private readonly API_URL = `${environment.apiUrl}/api/accounts`;
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_KEY = 'current_user';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  constructor(private http: HttpClient, private store:Store<{ accounts: AccountState }>,private env: EnvService) {}

    /**
     * @param code The account code to retrieve
     * @returns The requested account
     */
    getAccount(code: number): Observable<any> {
        return this.http.get<Account>(`${this.API_URL}/${code}`);
    }

  getUserAccounts(): Observable<any> {
    return this.http.get<Account[]>(`${this.API_URL}`,{
      headers: {
        'Content-Type': 'application/json'
      },});
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
      "code": account?.id,
      "page": page,
      "size": size
    };
    console.log("the account is -----> ",account)
    return this.http.get(`${this.API_URL}/${account?.id}/operations`,  {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    });
  }
    makeTransaction(account: Account, transaction: any): Observable<any> {
      const payload = {
        ...transaction,
        montant: transaction?.amount ?? 1,
        clientCode: Number(transaction.clientCode)
      };
      console.log(payload)
        return this.http.post(`${this.API_URL}/${account?.id}/operations`, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'text'
      });
    }

}
