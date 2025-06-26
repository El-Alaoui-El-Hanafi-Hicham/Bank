import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsModule } from '../account/accounts/accounts.module';
import { AccountsComponent } from '../account/accounts/accounts.component';
import { MainComponent } from './main/main/main.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from '../app.routes';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    HttpClientModule,
    AccountsModule,
    ButtonModule,
    RouterLink
  ]
})
export class DashboardModule { }
