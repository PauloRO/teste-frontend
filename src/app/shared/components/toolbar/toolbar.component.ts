import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTabsModule, CommonModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit,OnChanges {
  @Input() name: string = '';
  logo = '../../assets/images/logos/logo.png';
  @Output() openSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() atRota: EventEmitter<boolean> = new EventEmitter();
  showMenu = false;
  display = false;

  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit() {
    this.getNameUser();
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects.includes('/home')) {
        this.display = true;
      } else {
        this.display = false;
      }
      this.atRota.emit(this.display); // A URL correta antes de navegação // A URL correta após navegação
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  openMenu(): void {
    this.showMenu = !this.showMenu;
    this.openSidenav.emit(this.showMenu);
  }

  getNameUser(): void {
    
    this.name = this.storageService.getItem('userName');
  }

  logout(): void {
    this.storageService.removeItem('clientesSelecionados');
    this.storageService.removeItem('userName');
    this.router.navigate([`/`]);
  }
}
