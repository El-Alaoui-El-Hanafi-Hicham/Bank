import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AccountsComponent } from './account/accounts/accounts.component';
import { MainComponent } from './dashboard/main/main/main.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'accounts', loadChildren: () =>
        import('./account/accounts/accounts.module').then(m => m.AccountsModule) },
      // { path: 'settings', component: SettingsComponent }
        { path: '**', component: MainComponent  },
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
