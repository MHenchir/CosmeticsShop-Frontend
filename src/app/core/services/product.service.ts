import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly productsUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  search(searchTerm?: string, maxPrice?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }
    if (maxPrice !== undefined) {
      params = params.set('maxPrice', maxPrice);
    }
    return this.http.get<Product[]>(this.productsUrl, { params });
  }
}