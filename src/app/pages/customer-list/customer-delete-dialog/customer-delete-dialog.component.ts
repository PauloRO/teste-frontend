import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientService } from '../../../shared/services/client.service';
import { Client } from '../../../shared/model/cliente';

@Component({
  selector: 'app-customer-delete-dialog',
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatDialogModule, ReactiveFormsModule, HttpClientModule],
  providers: [ClientService],
  templateUrl: './customer-delete-dialog.component.html',
  styleUrl: './customer-delete-dialog.component.scss',
})
export class CustomerDeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CustomerDeleteDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  client: Client | null = null;

  constructor(private clientService: ClientService) {
    if (this.data.client) {
      this.client = { ...this.data.client };
    }
  }

  deleteClient() {
    const id = this.client?.id as number;
    this.clientService.delete(id).subscribe({
      next: () => {
        this.closeDialog(this.client);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  closeDialog(value: any) { 
    console.log(value)
    this.dialogRef.close(value);
  }
}
