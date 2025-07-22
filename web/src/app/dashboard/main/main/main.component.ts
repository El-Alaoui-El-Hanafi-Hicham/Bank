import { Component, OnInit } from '@angular/core';
import { Account, User } from '../../../auth/models/auth.models';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AccountState } from '../../../store/account/account.reducer';
import { Observable } from 'rxjs';
import * as AccountActions from '../../../store/account/account.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone:false,
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  currentUser: User | null = null;
loading$: Observable<boolean> = this.store.select(state => state.accounts.loading);
  accounts$: Observable<Account[]> = this.store.select(state => state.accounts.accounts);
  selectedAccount!:Account;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ accounts: AccountState }>
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/auth/login']);
    }
    this.store.dispatch(AccountActions.loadAccounts());

  }


}
