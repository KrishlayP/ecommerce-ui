import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { inject } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), appConfig],
}).then(() => {
  const http = inject(HttpClient);
  http.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true }).subscribe({
    next: () => console.log('CSRF cookie set ✔️'),
    error: (err) => console.error('CSRF init failed ❌', err)
  });
});
