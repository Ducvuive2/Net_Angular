import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Pagination } from '../../shared/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseURL = 'http://localhost:5165';
  private http = inject(HttpClient);
  brands: string[] = [];
  types: string[] = [];
  getProducts(brands?: string[], types?: string[], sort?: string) {
    let params = new HttpParams();
    if (brands && brands.length > 0) {
      params = params.append('brands', brands.join(','));
    }
    if (types && types.length > 0) {
      params = params.append('types', types.join(','));
    }

    if (sort) {
      params = params.append('sort', sort);
    }

    params = params.append('pageSize', 20);

    return this.http.get<Pagination<Product>>(
      `${this.baseURL}/api/products?${params}`
    );
  }
  getBrands() {
    return this.http
      .get<string[]>(`${this.baseURL}/api/products/brands`)
      .subscribe({
        next: (response) => (this.brands = response),
      });
  }
  getTypes() {
    return this.http
      .get<string[]>(`${this.baseURL}/api/products/types`)
      .subscribe({
        next: (response) => (this.types = response),
      });
  }
}
