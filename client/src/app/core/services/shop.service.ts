import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Pagination } from '../../shared/models/pagination';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseURL = 'http://localhost:5165';
  private http = inject(HttpClient);
  brands: string[] = [];
  types: string[] = [];
  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.brands.length > 0) {
      params = params.append('brands', shopParams.brands.join(','));
    }
    if (shopParams.types.length > 0) {
      params = params.append('types', shopParams.types.join(','));
    }

    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('pageSize', shopParams.pageSize);
    params = params.append('pageIndex', shopParams.pageNumber);

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
