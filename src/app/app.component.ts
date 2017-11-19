import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  selectedAge: number;
  address: string;

  constructor() {}

  onClick() {
    console.log('CLICKED');
  }
}
