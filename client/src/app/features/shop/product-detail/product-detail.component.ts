import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatDivider } from '@angular/material/divider';
@Component({
  selector: 'app-product-detail',
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatDivider,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private shopService = inject(ShopService);
  product?: Product;

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
      this.shopService.getProduct(+id).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
