import { Component } from '@angular/core';
import { Cart as CartService } from '../../services/cart';
import { Iproducts } from '../../models/iproducts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  constructor(private cart: CartService) { }

  get items() {
    return this.cart.getCart();
  }

  get totalPrice() {
    return parseFloat(this.cart.getTotalPrice().toFixed(2));
  }

  increaseQuantity(productId: number) {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      this.cart.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.items.find(i => i.product.id === productId);
    if (item && item.quantity > 1) {
      this.cart.updateQuantity(productId, item.quantity - 1);
    }
  }

  removeItem(productId: number) {
    this.cart.removeFromCart(productId);
  }

  clearCart() {
    this.cart.clearCart();
  }
  placeOrder() {
    this.cart.placeOrder();
  }
}
