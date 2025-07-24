import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// App Components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Services & Guards
import { AuthService } from './auth/services/auth.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';

// Routes
import { routes } from './app.routes';
import { DashboardModule } from './dashboard/dashboard.module';
import { MainComponent } from './dashboard/main/main/main.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { accountReducer } from './store/account/account.reducer';
import { AccountEffects } from './store/account/account.effects';
import { TransactionHistoryComponent } from './Transaction/transaction-history/transaction-history.component';
import { MainComponent as MaintTransactions } from './Transaction/main/main.component';
import { TransactionsModule } from './Transaction/transactions.module';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    // PrimeNG Modules
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    CarouselModule, ButtonModule, TagModule,
    RouterLink,
    DashboardModule,
    TransactionsModule,
    StoreModule.forRoot({ accounts: accountReducer }),
    EffectsModule.forRoot([AccountEffects]), // or forFeature if in a feature module
  ],
  providers: [
    MessageService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
