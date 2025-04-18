import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data, { withCredentials: true });
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data, { withCredentials: true });
  }

  getUser() {
    return this.http.get(`${this.baseUrl}/user`, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }
}
