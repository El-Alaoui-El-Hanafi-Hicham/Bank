import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MainComponent } from "../main/main.component";
import { Store } from '@ngrx/store';
import { AccountState } from '../../store/account/account.reducer';
import  * as AccountActions from '../../store/account/account.actions';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../../auth/models/auth.models';

interface Transaction {
  id: number;
  dateOperation: string;
  montant: number;
  status: string;
  description: string;
}

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  standalone: false,
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit,OnChanges {
  accountDetails!: Account;
  activeAccoutId: any;
  selectedAccount$ = this.store.select(state => state.accounts.selectedAccount);
transactions$: Observable<Transaction[]> = this.store.select(
  state => (state.accounts.transactionsObj as { transactions?: Transaction[] })?.transactions ?? []
);
statuses = [
  { value: 'Pending' },
  { value: 'Completed' },
  { value: 'Rejected' },
];
statusFilterValue: any;

  loading$: Observable<boolean> = this.store.select(state => state.accounts.loading);
applyFilters() {
throw new Error('Method not implemented.');
}
onSortChange() {
throw new Error('Method not implemented.');
}


  sizes = [
    { name: 'Small', value: 'small' },
    { name: 'Normal', value: 'normal' },
    { name: 'Large', value: 'large' }
  ];
  selectedSize: string | null = null;

  selectedSort: string | null = null;
  sortOptions = [
    { label: 'Date Asc', value: 'dateAsc' },
    { label: 'Date Desc', value: 'dateDesc' },
    { label: 'Amount Asc', value: 'amountAsc' },
    { label: 'Amount Desc', value: 'amountDesc' }
  ];

  filteredTransactions: Transaction[] = [];

  statusOptions = [
    { label: 'All', value: null },
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' }
  ];
  selectedStatus: string | null = null;

  amountRangeOptions = [
    { label: 'All', value: null },
    { label: 'Less than 300', value: 'lt300' },
    { label: '300 to 700', value: '300to700' },
    { label: 'More than 700', value: 'gt700' }
  ];
  selectedAmountRange: string | null = null;

  dateRangeOptions = [
    { label: 'All', value: null },
    { label: 'Last 7 Days', value: 'last7' },
    { label: 'Last 30 Days', value: 'last30' }
  ];
  selectedDateRange: string | null = null;

  constructor(
      private store: Store<{ accounts: AccountState }>,private route:ActivatedRoute,
    ) {
    // this.loadTransactions();

    }

  ngOnInit() {
      this.route.params.subscribe(params => {
        this.activeAccoutId = params['id'];
      })
      this.getAccount()

    }

ngOnChanges(changes: SimpleChanges) {
    console.log('myVar changed:',changes);
}
    getAccount(){
      this.store.dispatch(AccountActions.getAccount({id: Number(this.activeAccoutId)}));
      this.selectedAccount$.subscribe(account => {
        console.log(account)
        if(account){
          this.accountDetails = account;
    this.loadTransactions();

        }else{

        }
      })
    }

  loadTransactions() {
    let account =
    this.store.dispatch(AccountActions.loadTransactions({ account: this.accountDetails, page: 1, size: 10 }));
  }

  getSeverity(status: string) {
    switch (status) {
      case 'RET':
        return 'danger';
      case 'VER':
        return 'success';
      default:
        return 'info';
    }
  }

  onSort(event: any) {
    const field = event.field as keyof Transaction;
    const order = event.order;
    this.filteredTransactions.sort((a, b) => {
      let value1 = a[field];
      let value2 = b[field];
      if (field === 'dateOperation') {
        value1 = new Date(value1).getTime();
        value2 = new Date(value2).getTime();
      }
      let result = 0;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (value1 < value2) result = -1;
      else if (value1 > value2) result = 1;
      else result = 0;
      return order * result;
    });
  }
}
