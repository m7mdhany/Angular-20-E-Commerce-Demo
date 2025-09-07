import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Products } from './components/products/products';
import { Details } from './components/details/details';
import { isAuthenticatedGuard } from './guards/is-authenticated-guard-guard';
import { Er404 } from './components/er404/er404';
import { preventLoggingGuard } from './guards/prevent-logging-guard';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: Home },
  { path: "products", component: Products, canActivate: [isAuthenticatedGuard] },
  { path: "products/:id", component: Details, canActivate: [isAuthenticatedGuard] },
  { path: "cart", component: Cart, canActivate: [isAuthenticatedGuard] },
  { path: 'login', component: Login, canActivate: [preventLoggingGuard] },
  { path: 'register', component: Register, canActivate: [preventLoggingGuard] },
  { path: '**', component: Er404 }
];
