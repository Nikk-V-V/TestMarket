import {Component, OnInit} from '@angular/core';
import {ProductService} from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TestMarket';
  count: number;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.basket.subscribe(b => b.length ? this.count = b.length : this.count = null);
    this.productService.getBasketProducts();
  }
}
