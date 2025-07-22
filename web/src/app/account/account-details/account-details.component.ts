import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AccountActions from '../../store/account/account.actions';
import { AccountState } from '../../store/account/account.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
  standalone:false
})
export class AccountDetailsComponent implements OnInit {
  @Input() selectedAccount: any;

  accountDetails: any;
  page:number=1;
  size:number=10;
  transactions$: Observable<any[]> = this.store.select(
    state => (state.accounts.transactionsObj as { transactions?: any[] })?.transactions ?? []
  );
  transactionForm: FormGroup;
  withdrawalForm: FormGroup;

  constructor(
    private store: Store<{ accounts: AccountState }>,
    private fb: FormBuilder // <-- add FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      clientCode: ['', Validators.required],
      op: ['Virement', Validators.required]
    });
     this.withdrawalForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      op: ['withdrawal', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(){
    this.store.dispatch(AccountActions.loadTransactions({account: this.selectedAccount, page: this.page, size: this.size}));
  }

  onTransactionSubmit(type:String) {
    if (type === 'withdrawal') {
      if (this.withdrawalForm.valid) {
        const { amount, description } = this.withdrawalForm.value;
        this.store.dispatch(AccountActions.makeTransaction({ account: this.selectedAccount, transaction:this.transactionForm.getRawValue() }));
        console.log('Withdrawal:', { amount, description, account: this.selectedAccount });
        this.withdrawalForm.reset();
        this.withdrawalForm.addControl('op', this.fb.control('withdrawal', Validators.required
        ));
      }
      return;
    }else if (type === 'Virement') {

    if (this.transactionForm.valid) {
      const { amount, description } = this.transactionForm.value;
      // TODO: Dispatch an action or call a service to make the transaction
      this.store.dispatch(AccountActions.makeTransaction({account: this.selectedAccount, transaction:this.transactionForm.getRawValue()}))
      console.log('Transaction:', { amount, description, account: this.selectedAccount });
      this.transactionForm.reset();
      this.transactionForm.addControl('op', this.fb.control('Virement', Validators.required));
    }}
  }
}

