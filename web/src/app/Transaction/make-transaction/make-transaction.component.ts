import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AccountState } from '../../store/account/account.reducer';
import * as AccountActions from '../../store/account/account.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../auth/models/auth.models';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-make-transaction',
  standalone: false,
  templateUrl: './make-transaction.component.html',
  styleUrl: './make-transaction.component.css'
})
export class MakeTransactionComponent implements OnInit,OnChanges {
  accountDetails: any;
  activeAccoutId: any;
  transactionForm: FormGroup;
  withdrawalForm: FormGroup;
  error$ = this.store.select(state => state.accounts.error);
  selectedAccount$ = this.store.select(state => state.accounts.selectedAccount);
  transactionError: string | undefined = undefined;
  transactionSuccess: string | undefined = undefined;
  withdrawalError: string | undefined = undefined;
  withdrawalSuccess: string | undefined = undefined;
  clientNotFound: boolean | undefined = false;
  constructor(
    private store: Store<{ accounts: AccountState }>,
    private fb: FormBuilder, // <-- add FormBuilder,
    private route: ActivatedRoute,
    private transactionService: AccountService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      clientCode: ['', Validators.required],
      op: ['Transaction', Validators.required]
    });
     this.withdrawalForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      op: ['withdrawal', Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.activeAccoutId = params['id'];
    })
    this.getAccount();

  this.transactionForm.valueChanges.subscribe({
    next: (val) => {

    if(val.clientCode !== '') {
      this.checkIfAccountExist(val.clientCode)
    }else{
      this.clientNotFound = false
    }

    },
    error: (error) => {
      console.log(error)
      this.clientNotFound = true
    }
  });
  }

  getAccount(){
    this.store.dispatch(AccountActions.getAccount({id: Number(this.activeAccoutId)}));
    this.selectedAccount$.subscribe(account => {
      this.accountDetails = account
    })
  }
  checkIfAccountExist(val:number){
    this.transactionService.getAccount(val).subscribe({
    next: (val) => {
      this.clientNotFound = false
    },
    error: (error) => {
      console.log(error)
      this.clientNotFound = true
    }
  })
  }

  goBack() {
    this.router.navigate(['../../accounts',this.activeAccoutId], { relativeTo: this.route });
  }

  onTransactionSubmit(type: 'withdrawal' | 'Transaction') {
    this.transactionError = undefined;
    this.transactionSuccess = undefined;
    this.withdrawalError = undefined;
    this.withdrawalSuccess = undefined;
    if (type === 'withdrawal' && this.withdrawalForm.valid) {
      this.transactionService.makeTransaction(this.accountDetails, this.withdrawalForm.getRawValue()).subscribe({
        next: (val) => {
          this.withdrawalSuccess = val || 'Transaction successful!';
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.withdrawalSuccess });
          this.getAccount();
        },
        error: (error) => {
          this.withdrawalError = error.error || 'Transaction failed. Please try again.';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.withdrawalError });
        }
      });
      this.withdrawalForm.reset();
      this.withdrawalForm.addControl('op', this.fb.control('withdrawal', Validators.required));
    } else if (type === 'Transaction' && this.transactionForm.valid) {
      this.transactionService.makeTransaction(this.accountDetails, this.transactionForm.getRawValue()).subscribe({
        next: (val) => {
          this.transactionSuccess = val || 'Transaction successful!';
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.transactionSuccess });
          this.getAccount();
        },
        error: (error) => {
          this.transactionError = error.error || 'Transaction failed. Please try again.';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.transactionError });
        }
      });
      this.transactionForm = this.fb.group({
        amount: [null, [Validators.required, Validators.min(1)]],
        description: ['', Validators.required],
        clientCode: ['', Validators.required],
        op: ['Transaction', Validators.required]
      });
    }
  }
}
