import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountState } from '../../store/account/account.reducer';
import * as AccountActions from '../../store/account/account.actions';
import { Account } from '../../auth/models/auth.models';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  loading$: Observable<boolean> = this.store.select(state => state.accounts.loading);
  accounts$: Observable<Account[]> = this.store.select(state => state.accounts.accounts);
  selectedAccount!:Account;

  constructor(private store: Store<{ accounts: AccountState }>) {}

  ngOnInit(): void {
    this.store.dispatch(AccountActions.loadAccounts());
  }
}
