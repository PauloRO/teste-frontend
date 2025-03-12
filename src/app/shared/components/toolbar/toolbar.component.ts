import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTabsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Input() name: string = '';
  logo = '../../assets/images/logos/logo.png';
  @Output() openSidenav: EventEmitter<boolean> = new EventEmitter();
  showMenu = false;

  constructor(private router: Router, private storageService: StorageService) { }

  openMenu(): void {
    this.showMenu = !this.showMenu;
    this.openSidenav.emit(this.showMenu);
  }

  goToClients(): void {
    this.router.navigate([`/customer-list`]);
  }

  goToSelectedList(): void {
    this.router.navigate([`/customer-selecteds`]);
  }

  logout(): void { 
    this.storageService.removeItem('userName');
    this.router.navigate([`/`]); 
  }
}
