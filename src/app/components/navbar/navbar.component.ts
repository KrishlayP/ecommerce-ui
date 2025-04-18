import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a class="navbar-brand" href="#">MyShop</a>
      <div class="ms-auto">
        <button class="btn btn-outline-light" (click)="logout()">Logout</button>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('auth');
    this.router.navigate(['/']);
  }
}
