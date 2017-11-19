import { BrowserModule } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatSelectModule, MatInputModule, MatIconModule, MatTooltipModule, MatGridListModule } from '@angular/material';
import { RouterModule, Routes, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuBarComponent } from './pages/menu-bar/menu-bar.component';

import { AuthService } from './services/auth.service';
import { SearchService } from './services/search.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AgmCoreModule } from '@agm/core';
import { AboutComponent } from './pages/about/about.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

const firebaseConfig = {
  apiKey: 'AIzaSyAL5P8-lk-kT63ziXF7MS3XiNVJZZ4HvUY',
  authDomain: 'dayshare-1509817235983.firebaseapp.com',
  databaseURL: 'https://dayshare-1509817235983.firebaseio.com',
  projectId: 'dayshare-1509817235983',
  storageBucket: 'dayshare-1509817235983.appspot.com',
  messagingSenderId: '116123820067'
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    MenuBarComponent,
    AboutComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBgDUBNc6OE2KYBLSPo2DdcYwLUbiC5nfk',
      libraries: ['places']
    }),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig, 'dayshare'),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatSelectModule, MatInputModule, MatIconModule, MatTooltipModule, MatGridListModule,
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule
  ],
  providers: [ AuthService, SearchService, RouterLink ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('dayshare-theme');
  }
}
