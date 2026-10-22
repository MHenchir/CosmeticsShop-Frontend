import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products$: Observable<Product[]> = this.productService.search();

  constructor(private productService: ProductService) {}
}