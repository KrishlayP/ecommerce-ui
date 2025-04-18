import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 Add this line
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    console.log('Login button clicked'); // 👈 Add this temporarily to confirm
    this.http.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true }).subscribe(() => {
      this.http.post(
        'http://localhost:8000/api/login',
        { email: this.email, password: this.password },
        { withCredentials: true }
      ).subscribe({
        next: (res: any) => {
          localStorage.setItem('auth', 'true');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          alert('Login failed');
          console.error(err);
        }
      });
    });
  }
}
