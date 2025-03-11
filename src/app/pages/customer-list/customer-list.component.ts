import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-customer-list',
  imports: [ToolbarComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent implements OnInit {
  userName: string = '';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.getNameUser();
  }

  getNameUser(): void {
    this.userName = this.storageService.getItem('userName');
  }
}
