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
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import {  TableModule } from 'primeng/table';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { CardModule } from 'primeng/card';
import { SettingsComponent } from '../../settings/settings.component';

@NgModule({
  declarations: [
    AccountsComponent,
    AccountDetailsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkeletonModule,
    TreeSelectModule,
    InputTextModule,
    TableModule,
    FormsModule,
    CardModule,
    PanelModule,
    ButtonModule,
    DropdownModule,
    ToggleButtonModule,
    InputNumberModule,
    RouterModule.forChild([
      { path: '', component: AccountsComponent },
      { path: 'settings/:id', component: SettingsComponent }
    ])
  ]
})
export class AccountsModule { }
