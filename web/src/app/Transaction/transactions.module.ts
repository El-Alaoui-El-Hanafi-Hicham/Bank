import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { MainComponent as MaintTransactions } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';


@NgModule({
  declarations: [
    TransactionHistoryComponent,
    MaintTransactions,
  ],
  imports: [
        CommonModule,
        TableModule,
        SelectButtonModule,
        DropdownModule,
        ButtonModule,
        IconFieldModule, InputTextModule, InputIconModule,
        FormsModule,
        TagModule,
        ReactiveFormsModule,
        RouterModule.forChild([
      { path: '',
              children:[
              // { path: '', component: MainComponent },
              { path: 'history/:idp', component: TransactionHistoryComponent },
            ] },
    ])
  ]
})
export class TransactionsModule { }
