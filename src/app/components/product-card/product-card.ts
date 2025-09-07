import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Iproducts } from '../../models/iproducts';
import { RouterLink } from '@angular/router';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, NgClass, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input() product!: Iproducts;

  Math = Math;

  constructor(private cart: Cart) { }

  addToCart() {
    this.cart.addToCart(this.product);
  }
}
