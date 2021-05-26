import { Injectable } from '@angular/core';
import {Product} from '../interface';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    {id: 1, name: 'article 1', label : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: 25},
    {id: 2, name: 'article 2', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: 35},
    {id : 3, name: 'article 3', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: 45}
  ];

  basket = new Subject<Product[]>();

  constructor() { }

  getAll(): Product[] {
    return this.products;
  }

  addToBasket(id: number): void {
    const basketProducts = JSON.parse(localStorage.getItem('products'));
    if (basketProducts) {
      let product = basketProducts.filter(i => i.id === id);
      if (!product.length) {
        product = this.products.filter((item) => item.id === id)[0];
        basketProducts.push(product);
        localStorage.setItem('products', JSON.stringify(basketProducts));
        this.basket.next(basketProducts);
      }
    } else {
      const products = this.products.filter(i => i.id === id);
      localStorage.setItem('products', JSON.stringify(products));
      this.basket.next(products);
    }
  }

  getBasketProducts(): void {
    const basketProducts: Product[] = JSON.parse(localStorage.getItem('products'));
    basketProducts ? this.basket.next(basketProducts) : this.basket.next([]);
  }

  delete(id: number): void {
    let basketProducts: Product[] = JSON.parse(localStorage.getItem('products'));
    basketProducts = basketProducts.filter(item => item.id !== id);
    localStorage.setItem('products', JSON.stringify(basketProducts));
    this.basket.next(basketProducts);
  }

  clear(): void {
    localStorage.clear();
    this.basket.next([]);
  }
}
