import { Component, inject, OnInit } from '@angular/core';
import { ProductsApi } from '../../services/products-api';
import { Iproducts } from '../../models/iproducts';
import { ProductCard } from "../product-card/product-card";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [ProductCard, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  productServices = inject(ProductsApi);
  products: Iproducts[] = [];
  filteredProducts: Iproducts[] = [];
  categories: string[] = [];
  searchText: string = '';
  selectedCategory: string = '';
  loading = true;
  error: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;
  paginatedProducts: Iproducts[] = [];

  private searchTimeout: any; // للـ debounce

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.error = null;
    this.productServices.getProducts().subscribe({
      next: (data) => {
        this.products = data.products;
        this.filteredProducts = [...this.products];
        this.extractCategories();
        this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        this.updatePaginatedProducts();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
      }
    });
  }

  extractCategories() {
    const cats = this.products.map(p => p.category);
    this.categories = Array.from(new Set(cats));
  }

  filterProducts() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.filteredProducts = this.products.filter(p => {
        const matchesCategory = this.selectedCategory ? p.category === this.selectedCategory : true;
        const matchesSearch = p.title.toLowerCase().includes(this.searchText.toLowerCase());
        return matchesCategory && matchesSearch;
      });
      this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
      this.currentPage = 1;
      this.updatePaginatedProducts();
    }, 400); // 0.4 ثانية
  }

  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  get pagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

}
