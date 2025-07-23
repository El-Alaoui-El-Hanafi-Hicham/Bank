import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountState } from '../../store/account/account.reducer';
import * as AccountActions from '../../store/account/account.actions';
import { Account } from '../../auth/models/auth.models';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  standalone:false
})
export class AccountsComponent implements OnInit {
  loading$: Observable<boolean> = this.store.select(state => state.accounts.loading);
  accounts$: Observable<Account[]> = this.store.select(state => state.accounts.accounts);
  selectedAccount!:Account;
  accountId!: string;
  accountType: string | undefined;
  constructor(private store: Store<{ accounts: AccountState }>,private route :ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('id')!;
    // Fetch account type for the current accountId
    this.accounts$.subscribe(accounts => {
      const acc = accounts.find(a => a.id === Number(this.accountId));
      this.accountType = acc?.accountType;
    });
  }
  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


}
