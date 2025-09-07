import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { Cart } from '../../services/cart';
@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  constructor(private router: Router, public authService: Auth, private cart: Cart) { }
  
  get cartCount() {
    return this.cart.getCartCount();
  }
}