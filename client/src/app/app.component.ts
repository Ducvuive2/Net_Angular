import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  baseURL = 'http://localhost:5165';
  private http = inject(HttpClient);
  title = 'client';
  products: Product[] = [];

  ngOnInit() {
    this.http
      .get<Pagination<Product>>(`${this.baseURL}/api/products`)
      .subscribe({
        next: (response) => {
          this.products = response.data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
}
