import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../interface';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  products: Product[];
  totalPrice: number;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.productService
      .basket
      .subscribe((products: Product[]) => {
        this.products = products;
        this.countTotalPrice();
      });
    this.productService.getBasketProducts();
  }

  delete(id: number): void {
    this.productService.delete(id);
  }

  clearBasket(): void {
    this.productService.clear();
  }

  countTotalPrice(): void {
    this.totalPrice = 0;
    this.products.map(item => this.totalPrice += item.price);
  }
}
