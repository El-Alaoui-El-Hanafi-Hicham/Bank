import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { AddAccountComponent } from '../add-account/add-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AccountsComponent,
    AddAccountComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TreeSelectModule,
    InputTextModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    RouterModule.forChild([
      { path: '', component: AccountsComponent }
    ])
  ]
})
export class AccountsModule { }
