import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../services/account.service';

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

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService
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
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.loading = true;
    // Prepare payload
    const formValue = this.formGroup.getRawValue();
    const payload: any = {
      name: formValue.name,
      accType: formValue.accType,
      solde: formValue.solde,
      taux: formValue.accType?.code === 'CE' ? formValue.taux : null,
      decouverte: formValue.accType?.code === 'CC' ? formValue.decouverte : null
    };
    this.accountService.addAccount(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Account created successfully!'
        });
        this.formGroup.reset();
        // Optionally, reset accType to null
        this.formGroup.get('accType')?.setValue(null);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.message || 'Failed to create account.'
        });
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
