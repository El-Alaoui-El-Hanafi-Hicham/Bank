import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main/main.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from '../app.routes';
import { AddAccountComponent } from '../account/add-account/add-account.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TreeSelectModule } from 'primeng/treeselect';

@NgModule({
  declarations: [DashboardComponent, AddAccountComponent, MainComponent],
  imports: [
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    HttpClientModule,
    ButtonModule,
    RouterLink,
    CardModule,
    InputTextModule,
    PasswordModule,
    InputNumberModule,
    DropdownModule,
    ToastModule,
    SkeletonModule,
    SkeletonModule,
        TreeSelectModule,
        TableModule,
        FormsModule,
        PanelModule,
  ],
})
export class DashboardModule {}
