import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CustomerCreateDialogComponent } from '../../../pages/customer-list/customer-create-dialog/customer-create-dialog.component';
import { CustomerDeleteDialogComponent } from '../../../pages/customer-list/customer-delete-dialog/customer-delete-dialog.component';
import { Client } from '../../model/cliente';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  providers: [CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() client: Client = { id: 0, name: '', salary: 0, companyValuation: 0 };
  @Input() screen: string = '';
  @Output() atClose: EventEmitter<boolean> = new EventEmitter();
  @Output() atRemoveClient: EventEmitter<boolean> = new EventEmitter();

  constructor(private dialog: MatDialog, private clientService: ClientService) {}

  toggleSelecao(client: any): void {
    this.clientService.toggleSelectClient(client);
  }

  editClient(client: Client): void {
    const dialogRef = this.dialog.open(CustomerCreateDialogComponent, {
      disableClose: true,
      width: '400px',
      data: { client: client, title: 'Editar cliente:' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        this.atClose.emit(true);
      }
    });
  }

  deleteClient(client: Client): void {
    const dialogRef = this.dialog.open(CustomerDeleteDialogComponent, {
      disableClose: true,
      width: '450px',
      data: { client: client },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        this.atClose.emit(true);
      }
    });
  }

  removeClientSelected(client: Client): void {
    this.clientService.removerClienteSelecionado(client);
    this.atRemoveClient.emit(true);
  }
}
