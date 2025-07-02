import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AccountActions from '../../store/account/account.actions';
import { AccountState } from '../../store/account/account.reducer';
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  @Input() selectedAccount: any;

  accountDetails: any;
  page:number=1;
  size:number=10;
  transactions$: Observable<any[]> = this.store.select(
    state => (state.accounts.transactionsObj as { transactions?: any[] })?.transactions ?? []
  );
  ngOnInit(): void {
    this.getTransactions();
  }
  constructor(private store: Store<{ accounts: AccountState }>) {

  }

  getTransactions(){
    this.store.dispatch(AccountActions.loadTransactions({account: this.selectedAccount, page: this.page, size: this.size}));
  }

}

