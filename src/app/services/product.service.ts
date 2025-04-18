import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.baseUrl}/products`, { withCredentials: true });
  }

  addProduct(data: any) {
    return this.http.post(`${this.baseUrl}/products`, data, { withCredentials: true });
  }
  
  updateProduct(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/products/${id}`, data, { withCredentials: true });
  }
  
  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/products/${id}`, { withCredentials: true });
  }
  
}
