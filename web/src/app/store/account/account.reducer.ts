import { createReducer, on } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';
import { loadTransactions, loadTransactionsSuccess } from './account.actions';

export interface AccountState {
  accounts: any[];
  loading: boolean;
  error?: any; // Optional: to store error info
  transactionsObj:Object;
}

export const initialState: AccountState = {
  accounts: [],
  loading: false,
  error: null,
  transactionsObj:{
    transactions:[],
    page:1,
    size:10,
    loading:false
  }
};

// Actions
export const loadAccounts = createAction('[Account] Load Accounts');
export const loadAccountsSuccess = createAction(
  '[Account] Load Accounts Success',
  props<{ accounts: any[],page:number,size:number }>()
);
export const loadAccountsFailure = createAction(
  '[Account] Load Accounts Failure',
  props<{ error: any }>()
);

// Reducer
export const accountReducer = createReducer(
  initialState,
  on(loadAccounts, state => ({ ...state, loading: true, error: null })),
  on(loadAccountsSuccess, (state,  actions ) =>{
      const {accounts,page,size}=actions;
    console.log(accounts.map(account => ({...account,accountType:account?.taux?"CE":"CC",accountNumber:account.codeCompte, balance: account.solde})));;
    return {
    ...state,
    accounts: accounts.map(account => ({...account,accountType:account?.taux?"CE":"CC",accountNumber:account.codeCompte, balance: account.solde})),
    loading: false,
    error: null
  }}),
   on(loadTransactions, state => ({ ...state, loading: true, error: null })),
   on(loadTransactionsSuccess, (state, actions ) =>{
    const {transactions,page,size}=actions;
    return {
    ...state,
    transactionsObj: {transactions: transactions, page: page, size:size, loading: false},
    loading: false,
    error: null
  }}),
  on(loadAccountsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
