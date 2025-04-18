import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// This will check if the user is logged in
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('auth'); // Check if 'auth' token exists in localStorage

  if (!isLoggedIn) {
    router.navigate(['/']); // Redirect to login if not logged in
    return false;
  }

  return true; // Allow navigation if logged in
};
