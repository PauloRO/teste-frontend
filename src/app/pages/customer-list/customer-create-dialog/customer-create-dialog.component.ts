import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Client, getClientFormGroup } from '../../../shared/model/cliente';
import { ClientService } from '../../../shared/services/client.service';

@Component({
  selector: 'app-customer-create-dialog',
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIcon,
  ],
  providers: [ClientService],
  templateUrl: './customer-create-dialog.component.html',
  styleUrl: './customer-create-dialog.component.scss',
})
export class CustomerCreateDialogComponent {
  formGroup: any;
  client: Client | null = null;
  title = '';

  readonly dialogRef = inject(MatDialogRef<CustomerCreateDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) {
    this.formGroup = getClientFormGroup(this.formBuilder);

    if (this.data.client) {
      this.client = { ...this.data.client };

      this.formGroup.patchValue(this.client);
    }

    if (this.data.title) this.title = this.data.title;
  }

  createClient() {
    const client = this.formGroup.value;
    this.clientService.save(client).subscribe({
      next: (res) => {
        this.closeDialog(res);
      },
      error: (err) => {},
    });
  }

  closeDialog(value: any) {
    this.dialogRef.close(value);
  }

  hasValidationError(errorCode: string, controlName: string): boolean {
    return (
      this.formGroup.get(controlName)?.errors?.[errorCode] &&
      (this.formGroup.get(controlName).dirty || this.formGroup.get(controlName).touched)
    );
  }
}
