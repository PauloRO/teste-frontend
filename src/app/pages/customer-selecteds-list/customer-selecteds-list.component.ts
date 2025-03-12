import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../shared/services/storage.service';
import { ClientService } from '../../shared/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from '../../shared/components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '../../shared/model/cliente';

@Component({
  selector: 'app-customer-selecteds-list',
  imports: [ToolbarComponent, CommonModule, HttpClientModule, CardComponent, MatButtonModule],
  providers: [ClientService],
  templateUrl: './customer-selecteds-list.component.html',
  styleUrl: './customer-selecteds-list.component.scss',
})
export class CustomerSelectedsListComponent implements OnInit {
  @Output() atOpenMenu: EventEmitter<boolean> = new EventEmitter();

  userName: string = '';
  showMenu: boolean = false;
  clients: Client[] = [];

  constructor(
    private storageService: StorageService,
    private clientService: ClientService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getNameUser();
    this.clients = this.clientService.getClientesSelecionados();
  }

  updateClients(event: any): void {
    if (event) {
      this.clients = this.clientService.getClientesSelecionados();
    }
  }

  openMenu(event: any) {
    this.showMenu = event;
    this.atOpenMenu.emit(this.showMenu);
  }

  getNameUser(): void {
    this.userName = this.storageService.getItem('userName');
  }

  atDialogClosed(event: any): void {
    if (event) {
    }
  }
}
