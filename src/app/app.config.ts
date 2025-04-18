import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { LoginComponent } from './pages/login.component';
import { SignupComponent } from './pages/signup.component';
import { ProductsComponent } from './pages/products.component';
import { AddProductComponent } from './pages/add-product.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] }, // Protect this route
  { path: 'add-product', component: AddProductComponent, canActivate: [authGuard] },
];

export const appConfig = provideRouter(routes);
