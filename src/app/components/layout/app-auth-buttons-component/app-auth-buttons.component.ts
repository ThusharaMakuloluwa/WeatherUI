import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-auth-buttons',
  imports: [AsyncPipe],
  templateUrl: './app-auth-buttons.component.html',
  styleUrl: './app-auth-buttons.component.scss',
})
export class AppAuthButtonsComponent {
  auth = inject(AuthService);

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: typeof window !== 'undefined' ? window.location.origin : '',
      },
    });
  }
}
