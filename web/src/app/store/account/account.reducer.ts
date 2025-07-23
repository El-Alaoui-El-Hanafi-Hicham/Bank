import { createReducer, on } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';
import { clearError, getAccount, getAccountFailure, getAccountSuccess, loadTransactions, loadTransactionsSuccess } from './account.actions';
import { Account } from '../../auth/models/auth.models';

export interface AccountState {
  accounts: any[];
  loading: boolean;
  error?: any; // Optional: to store error info
  transactionsObj:Object;
  selectedAccount:Account | undefined;
}

export const initialState: AccountState = {
  accounts: [],
  loading: false,
  error: null,
  selectedAccount:undefined ,
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
    return {
    ...state,
    accounts: accounts.map(account => ({accountType:account?.taux?"CE":"CC", balance: account.solde,id:account.codeCompte})),
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
  })),
  on(getAccount, (state ,actions)=> ({ ...state, loading: true, error: null})),

  on(getAccountSuccess, (state ,actions)=> {
    return { ...state, loading: false, error: null, selectedAccount:{accountType:actions.obj.taux?"CE":"CC", balance: actions.obj.solde,id:actions.obj.codeCompte,timeStamp:actions.obj.dateCreation}}}),
  on(getAccountFailure, (state ,actions)=> ({ ...state, loading: false, error: actions})),
  on(clearError, (state )=> ({ ...state, loading: false, error: null}))
);
