import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StorageService } from '../../shared/services/storage.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule ,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  name: string = '';

  constructor(private storageService: StorageService, private router:Router) {}

  saveName() {
    if (this.name != '') {
      this.storageService.setItem('userName', this.name);
      this.router.navigate([`/customer-list`]);
    }
  }
}
