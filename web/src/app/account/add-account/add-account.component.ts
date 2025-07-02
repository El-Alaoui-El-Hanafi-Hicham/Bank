import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../services/account.service';
import { Store } from '@ngrx/store';
import * as AccountActions from '../../store/account/account.actions';
import { AccountState } from '../../store/account/account.reducer';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
  providers: [MessageService]
})
export class AddAccountComponent {
  formGroup: FormGroup;
  accType = [
    { name: 'Compte Courant', code: 'CC' },
    { name: 'Compte d\'epargne', code: 'CE' }
  ];
  loading:Boolean = false;
  private actionsSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService,
    private store: Store<{ accounts: AccountState }>,
    private actions$: Actions
  ) {
    const currentUser = JSON.parse(localStorage.getItem('current_user') ?? '{}');
    this.formGroup = this.fb.group({
      name: [{ value: currentUser?.username || '', disabled: true }, [Validators.required]],
      accType: [null, Validators.required],
      solde: [null, [Validators.required, Validators.min(0)]],
      taux: [null],
      decouverte: [null]
    });

    // Conditional validators
    this.formGroup.get('accType')?.valueChanges.subscribe((type) => {
      if (type?.code === 'CE') {
        this.formGroup.get('taux')?.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
        this.formGroup.get('decouverte')?.clearValidators();
        this.formGroup.get('decouverte')?.setValue(null);
      } else {
        this.formGroup.get('decouverte')?.setValidators([Validators.required, Validators.min(0)]);
        this.formGroup.get('taux')?.clearValidators();
        this.formGroup.get('taux')?.setValue(null);
      }
      this.formGroup.get('taux')?.updateValueAndValidity();
      this.formGroup.get('decouverte')?.updateValueAndValidity();
    });

        this.actionsSubscription = this.actions$.pipe(
      ofType(AccountActions.addNewAccountSuccess)
    ).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'ACCOUNT CREATED SUCCESSFULLY' });
      this.formGroup.reset();
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    // Remove manual loading management!
    const formValue = this.formGroup.getRawValue();
    const payload: any = {
      name: formValue.name,
      accType: formValue.accType,
      solde: formValue.solde,
      taux: formValue.accType?.code === 'CE' ? formValue.taux : null,
      decouverte: formValue.accType?.code === 'CC' ? formValue.decouverte : null
    };
    this.store.dispatch(AccountActions.addNewAccount({ account: payload }));
  }
}
