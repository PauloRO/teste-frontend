import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIcon,
    ToolbarComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'teste-frontend';
  showMenu: boolean = false;

  userName: string = '';

  constructor(private storageService: StorageService) {
    this.getNameUser();
  }

  openMenu(event: any) {
    this.showMenu = event;
  }

  getNameUser(): void {
    this.userName = this.storageService.getItem('userName');
  }
}
