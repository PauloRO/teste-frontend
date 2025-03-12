import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerSelectedsListComponent } from './pages/customer-selecteds-list/customer-selecteds-list.component';

export const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'customer-list',
      component: CustomerListComponent
    },
    {
      path: 'customer-selecteds',
      component: CustomerSelectedsListComponent
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
  ];