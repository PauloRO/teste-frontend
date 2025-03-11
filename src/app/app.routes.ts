import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';

export const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'customer-list',
      component: CustomerListComponent
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
  ];