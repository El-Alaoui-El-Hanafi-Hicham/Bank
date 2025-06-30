import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../auth/models/auth.models';
import { AddAccountComponent } from '../add-account/add-account.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accounts: Account[] = [];
  constructor(private accountService: AccountService) {

  }
  ngOnInit(): void {
    this.accountService.getUserAccounts().subscribe(accounts => {
      this.accounts = accounts;
      this.accounts = accounts.map(account =>( {...account,accountType:account?.taux?"CE":"CC",accountNumber:account.codeCompte, balance: account.solde}));
    })
  }
}
