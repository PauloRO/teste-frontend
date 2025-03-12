import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Client, getClientFormGroup } from '../../../shared/model/cliente';
import { ClientService } from '../../../shared/services/client.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

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
    MatIcon
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
      error: (err) => {
        console.log(err);
      },
    });
  }

  closeDialog(value: any) {
    console.log(value);
    this.dialogRef.close(value);
  }

  hasValidationError(errorCode: string, controlName: string): boolean {
    return (
      this.formGroup.get(controlName)?.errors?.[errorCode] &&
      (this.formGroup.get(controlName).dirty || this.formGroup.get(controlName).touched)
    );
  }
}
