import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { CardComponent } from '../../shared/components/card/card.component';
import { Client } from '../../shared/model/cliente';
import { ClientService } from '../../shared/services/client.service';
import { StorageService } from '../../shared/services/storage.service';
import { CustomerCreateDialogComponent } from './customer-create-dialog/customer-create-dialog.component';

@Component({
  selector: 'app-customer-list',
  imports: [
    CommonModule,
    HttpClientModule,
    MatPaginatorModule,
    CardComponent,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
  providers: [ClientService],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent implements OnInit {
  @Output() atOpenMenu: EventEmitter<boolean> = new EventEmitter();

  userName: string = '';
  showMenu: boolean = false;
  clients: Client[] = [];
  totalElements: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  pages: any[] = [];

  opcoes = [5, 10, 20, 25, 50];

  constructor(
    private storageService: StorageService,
    private clientService: ClientService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getNameUser();
    this.findUsers(this.currentPage, this.pageSize);
  }

  findUsers(pageIndex: number, pageSize: number) {
    this.clientService.clients$.subscribe({
      next: (res) => {
        this.clients = res;
        this.totalElements = this.clientService.getTotalElements();
        this.currentPage = this.clientService.getCurrentPage();
        this.totalPages = this.clientService.getTotalPages();
        this.pages = [...Array(this.totalPages)].map((_, i) => this.totalPages - i).sort((a, b) => a - b);
      },
      error: (err) => {},
    });

    this.clientService.findUsers(pageIndex, pageSize);
  }

  pagination(page: number) {
    this.currentPage = page;
    this.findUsers(this.currentPage, this.pageSize);
  }

  paginationPageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pagination(this.currentPage);
  }

  getNameUser(): void {
    this.userName = this.storageService.getItem('userName');
  }

  openMenu(event: any) {
    this.showMenu = event;
    this.atOpenMenu.emit(this.showMenu);
  }

  handlePageEvent(e: PageEvent) {
    this.findUsers(e.pageIndex, e.pageSize);
  }

  newClient(): void {
    const dialogRef = this.dialog.open(CustomerCreateDialogComponent, {
      width: '400px',
      data: { title: 'Criar cliente:' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        this.findUsers(0, 10);
      }
    });
  }

  atDialogClosed(event: any): void {
    if (event) {
      this.findUsers(0, 10);
    }
  }
}
