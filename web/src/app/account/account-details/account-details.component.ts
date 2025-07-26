import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AccountActions from '../../store/account/account.actions';
import { AccountState } from '../../store/account/account.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { MessageService } from 'primeng/api';

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
  chartData: any;
  chartOptions: any;

  constructor(
    private store: Store<{ accounts: AccountState }>,
    private fb: FormBuilder, // <-- add FormBuilder,
    private transactionService: AccountService,
    private messageService: MessageService
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

  ngOnInit(): void {
    this.getTransactions();
       this.chartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [
        {
          label: 'Withdrawals',
          backgroundColor: '#EC407A',
          data: [40, 30, 60, 35]
        },
        {
          label: 'Transactions',
          backgroundColor: '#42A5F5',
          data: [60, 70, 50, 80]
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#333',
            font: {
              weight: 'bold'
            }
          }
        }
      },
      scales: {
        x: {
          stacked: false,
          ticks: { color: '#333' },
          grid: { color: '#eee' }
        },
        y: {
          stacked: false,
          beginAtZero: true,
          ticks: { color: '#333' },
          grid: { color: '#eee' }
        }
      }
    };
  }

  getTransactions(){
    this.store.dispatch(AccountActions.loadTransactions({account: this.selectedAccount, page: this.page, size: this.size}));
  }

  onTransactionSubmit(type: 'withdrawal' | 'Transaction') {
    if (type === 'withdrawal' && this.withdrawalForm.valid) {
      const { amount, description } = this.withdrawalForm.value;
      this.transactionService.makeTransaction(this.selectedAccount, this.withdrawalForm.getRawValue()).subscribe({
        next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transaction successful!' }),
        error: (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message || 'Transaction failed. Please try again.' })
      });
      this.withdrawalForm.reset();
      this.withdrawalForm.addControl('op', this.fb.control('withdrawal', Validators.required));
    } else if (type === 'Transaction' && this.transactionForm.valid) {
      const { amount, description } = this.transactionForm.value;
       this.transactionService.makeTransaction(this.selectedAccount, this.withdrawalForm.getRawValue()).subscribe({
        next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transaction successful!' }),
        error: (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message || 'Transaction failed. Please try again.' })
      });
      this.transactionForm.reset();
      this.transactionForm.addControl('op', this.fb.control('Transaction', Validators.required));
    }
  }
}

