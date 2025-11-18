import { Component } from '@angular/core';
import { AppAuthButtonsComponent } from '../app-auth-buttons-component/app-auth-buttons.component';

@Component({
  selector: 'app-header',
  imports: [AppAuthButtonsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
