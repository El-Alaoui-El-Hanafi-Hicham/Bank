import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountService } from '../../services/account.service';
import * as AccountActions from './account.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AccountEffects {
  loadAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.loadAccounts),
      switchMap(() =>
        this.accountService.getUserAccounts().pipe(
          map(accounts =>  AccountActions.loadAccountsSuccess({ accounts: accounts.content, page: accounts.page, size: accounts.size  })),
          catchError(error => of(AccountActions.loadAccountsFailure({ error })))
        )
      )
    )
  );
    addNewAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.addNewAccount),
      switchMap(action =>
        this.accountService.addAccount(action.account).pipe(
          map((v) => {
            console.log(v)
            return AccountActions.loadAccounts()}),
          catchError(error => of(AccountActions.loadAccountsFailure({ error })))
        )
      )
    )
  );
  getTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.loadTransactions),
      switchMap(action =>
        this.accountService.getTransactions(action.account, action.page, action.size).pipe(
              map(transactions =>  AccountActions.loadTransactionsSuccess({ transactions: transactions.content, page: transactions.page, size: transactions.size })),
          catchError(error => of(AccountActions.loadAccountsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService
  ) {}
}
