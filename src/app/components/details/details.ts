import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Iproducts } from '../../models/iproducts';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsApi } from '../../services/products-api';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-details',
  imports: [FormsModule, CurrencyPipe, CommonModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
  prd!: Iproducts;
  loading = true;
  error: string | null = null;
  Math = Math;

  constructor(private activatedRoute: ActivatedRoute, private products: ProductsApi, private cart: Cart) { }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loading = true;
    this.error = null;

    this.products.getProductByID(id).subscribe({
      next: (product: Iproducts) => {
        this.prd = product;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load product';
        this.loading = false;
      }
    });
  }

  addToCart() {
    this.cart.addToCart(this.prd);
  }

}
