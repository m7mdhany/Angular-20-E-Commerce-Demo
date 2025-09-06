import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { API_URLS } from '../constants/api_urls';
import { Iproducts } from '../models/iproducts';

@Injectable({
  providedIn: 'root',
})
export class ProductsApi {
  constructor(private http: HttpClient) { }

  // get all Products
  getProducts(): Observable<any> {
    return this.http.get<Iproducts[]>(`${API_URLS.Products}`);
  }

  // get post by id
  getProductByID(id: number): Observable<any> {
    return this.http.get<Iproducts>(`${environment.Domain}products/${id}`);
  }

  // delete post
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.Domain}products/${id}`);
  }

  // search Products
  searchProducts(term: string): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products/search?q=${term}`);
  }

}