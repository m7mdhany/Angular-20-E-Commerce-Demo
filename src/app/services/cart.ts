import { Injectable } from '@angular/core';
import { Iproducts } from '../models/iproducts';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private cart: { product: Iproducts, quantity: number }[] = [];

  getCart() {
    return this.cart;
  }

  addToCart(product: Iproducts) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find(item => item.product.id === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
    }
  }

  clearCart() {
    this.cart = [];
  }

  getTotalPrice() {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getTotalItems() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }
}
