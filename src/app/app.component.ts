import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  selectedAge: number;
  address: string;

  constructor(
    private authService: AuthService
  ) {
    this.authService.getAuthState();
  }


}
