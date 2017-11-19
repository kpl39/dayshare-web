import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  @ViewChild('toggleButton') toggleButton: ElementRef;

  menuCollapsed: Boolean = true;
  authenticated: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  toggleNav() {
    this.menuCollapsed = !this.menuCollapsed;
    console.log('menuCollapsed', this.menuCollapsed);
  }


  collapseNav() {
    this.toggleButton.nativeElement.click();
  }

  checkAuth() {
    return this.authService.authenticated;
  }

  logout() {
    this.authService.logout();
    this.authService.getAuthState();
    this.router.navigate(['/home']);
  }

}
