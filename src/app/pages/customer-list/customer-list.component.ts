import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { SidenavComponent } from '../../shared/components/sidenav/sidenav.component';
import { ClientService } from '../../shared/services/client.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Client } from '../../shared/model/cliente';
import { CardComponent } from '../../shared/components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CustomerCreateDialogComponent } from './customer-create-dialog/customer-create-dialog.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  imports: [ToolbarComponent, CommonModule, HttpClientModule, MatPaginatorModule, CardComponent, MatButtonModule],
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
  totalPages: number = 0;

  constructor(private storageService: StorageService, private clientService: ClientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getNameUser();
    this.findUsers(0, 10);
  }

  findUsers(pageIndex:number, pageSize:number) {
    this.clientService.clients$.subscribe({
      next: (res) => {
        this.clients = res;
        this.totalElements = this.clientService.getTotalElements();
        this.currentPage = this.clientService.getCurrentPage();
        this.totalPages = this.clientService.getTotalPages();
        
      },
      error: (err) => {},
    });

    this.clientService.carregarUsuarios(0, 10);
  }

 

  getNameUser(): void {
    this.userName = this.storageService.getItem('userName');
  }

  openMenu(event: any) {
    this.showMenu = event;
    this.atOpenMenu.emit(this.showMenu);
  }

  handlePageEvent(e: PageEvent) {
    console.log(e)
    this.findUsers(e.pageIndex , e.pageSize)
  }

  newClient(): void {
    const dialogRef = this.dialog.open(CustomerCreateDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed new');
      console.log(result)
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
