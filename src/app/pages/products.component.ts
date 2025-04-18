import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="container mt-4">
      <h2>Products</h2>

      <form (submit)="addOrUpdate()" class="mb-4">
        <input [(ngModel)]="newProduct.name" name="name" placeholder="Product Name" class="form-control mb-2" required />
        <input [(ngModel)]="newProduct.price" name="price" placeholder="Price" type="number" class="form-control mb-2" required />
        <button class="btn btn-primary me-2">
          {{ isEditing ? 'Update Product' : 'Add Product' }}
        </button>
        <button class="btn btn-secondary" type="button" *ngIf="isEditing" (click)="resetForm()">Cancel</button>
      </form>

      <ul *ngIf="products.length > 0; else noData">
        <li *ngFor="let product of products">
          <strong>{{ product.name }}</strong> - ₹{{ product.price }}
          <button class="btn btn-warning btn-sm ms-2" (click)="edit(product)">Edit</button>
          <button class="btn btn-danger btn-sm ms-2" (click)="delete(product.id)">Delete</button>
        </li>
      </ul>

      <ng-template #noData>
        <p>No products found.</p>
      </ng-template>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  newProduct = { name: '', price: 0 };
  isEditing = false;
  editId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (data: any) => this.products = data,
      error: () => alert('Failed to load products')
    });
  }

  addOrUpdate() {
    if (this.isEditing && this.editId !== null) {
      this.productService.updateProduct(this.editId, this.newProduct).subscribe({
        next: () => {
          this.getProducts();
          this.resetForm();
        },
        error: () => alert('Update failed')
      });
    } else {
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.getProducts();
          this.resetForm();
        },
        error: () => alert('Add failed')
      });
    }
  }

  edit(product: any) {
    this.newProduct = { name: product.name, price: product.price };
    this.isEditing = true;
    this.editId = product.id;
  }

  delete(id: number) {
    if (!confirm('Are you sure?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => this.getProducts(),
      error: () => alert('Delete failed')
    });
  }

  resetForm() {
    this.newProduct = { name: '', price: 0 };
    this.isEditing = false;
    this.editId = null;
  }
}
