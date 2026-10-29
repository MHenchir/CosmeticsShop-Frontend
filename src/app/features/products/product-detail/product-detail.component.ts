import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, catchError, map, switchMap } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  notFound = false;

  // L'identifiant vient de l'URL (/products/:id), puis on appelle l'API
  product$: Observable<Product> = this.route.paramMap.pipe(
    map((params) => params.get('id') as string),
    switchMap((id) =>
      this.productService.getById(id).pipe(
        catchError(() => {
          this.notFound = true;
          return EMPTY;
        })
      )
    )
  );

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
}