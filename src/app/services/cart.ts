import { Injectable } from '@angular/core';
import { Iproducts } from '../models/iproducts';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class Cart {
  private cartKey = 'cartItems';
  private cart: { product: Iproducts, quantity: number }[] = [];

  constructor(private toastr: ToastrService) {
    this.loadCart();
  }

  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  private loadCart() {
    const saved = localStorage.getItem(this.cartKey);
    if (saved) {
      this.cart = JSON.parse(saved);
    }
  }

  getCart() {
    return this.cart;
  }

  addToCart(product: Iproducts) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
      this.toastr.success(`${product.title} quantity increased`, 'Success');

    } else {
      this.cart.push({ product, quantity: 1 });
      this.toastr.success(`${product.title} added to cart`, 'Success');

    }
    this.saveCart();
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find(item => item.product.id === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getTotalPrice() {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getTotalItems() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  getCartCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
}
