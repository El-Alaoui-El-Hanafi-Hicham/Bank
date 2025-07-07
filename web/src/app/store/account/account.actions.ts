import { createAction, props } from '@ngrx/store';
import { Account } from '../../auth/models/auth.models';

export const loadAccounts = createAction('[Account] Load Accounts');
export const loadAccountsSuccess = createAction(
  '[Account] Load Accounts Success',
  props<{ accounts: Object,page:number,size:number}>()
);
export const loadAccountsFailure = createAction(
  '[Account] Load Accounts Failure',
  props<{ error: any }>()
);
export const addNewAccount = createAction(
  '[Account] Add Account ',
  props<{ account: Account }>()
);
export const addNewAccountSuccess = createAction(
  '[Account] Add Account Success'
);
export const loadTransactions = createAction(
  "[Account] Get Transactions",
  props<{ account: Account , page: number, size: number}>()
)
export const loadTransactionsSuccess = createAction(
  "[Account] Get Transactions",
  props<{transactions: Object,page:number,size:number} >()
)
export const loadTransactionsFailure = createAction(
  "[Account] Get Transactions Failure",
  props<{ error: any }>()
)
export const makeTransaction = createAction(
  "[Account] Make Transaction",
  props<{ account: Account,transaction: Object }>()
)
