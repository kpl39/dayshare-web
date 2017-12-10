import { BrowserModule } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatSelectModule, MatInputModule, MatIconModule,
         MatTooltipModule, MatGridListModule, MatExpansionModule, MatStepperModule, MatDatepickerModule,
         MatNativeDateModule, MatProgressSpinnerModule, MatRadioModule, MatTabsModule, MatListModule,
         MatSidenavModule } from '@angular/material';
import { RouterModule, Routes, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuBarComponent } from './pages/menu-bar/menu-bar.component';
import { AboutComponent } from './pages/about/about.component';
import { SignupDetailsComponent } from './pages/signup-details/signup-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
  import { EditProfileComponent } from './pages/dashboard/edit-profile/edit-profile.component';
  import { ChildrenComponent } from './pages/dashboard/children/children.component';
  import { GroupComponent } from './pages/dashboard/group/group.component';
  import { SettingsComponent } from './pages/dashboard/settings/settings.component';
  import { HelpComponent } from './pages/dashboard/help/help.component';

import { AuthService } from './services/auth.service';
import { SearchService } from './services/search.service';
import { RouterDataService } from './services/router-data.service';
import { ImageService } from './services/image.service';
import { ChildService } from './services/child.service';
import { ParentService } from './services/parent.service';
import { GroupService } from './services/group.service';
import { ContactModalComponent } from './pages/modals/contact-modal/contact-modal.component';
import { MessageService } from './services/message.service';
import { AvailabilityService } from './services/availability.service';
import { MessagingComponent } from './pages/dashboard/messaging/messaging.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signupdetails', component: SignupDetailsComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'editprofile', component: EditProfileComponent },
      { path: 'children', component: ChildrenComponent },
      { path: 'group', component: GroupComponent },
      { path: 'messaging', component: MessagingComponent },
      { path: 'settings', component: SettingsComponent},
      { path: 'help', component: HelpComponent},
      { path: '', redirectTo: 'editprofile', pathMatch: 'full' },
    ]
  },
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
    AboutComponent,
    SignupDetailsComponent,
    DashboardComponent,
    EditProfileComponent,
    ChildrenComponent,
    GroupComponent,
    SettingsComponent,
    HelpComponent,
    ContactModalComponent,
    MessagingComponent
  ],
  entryComponents: [
    ContactModalComponent
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
    MatButtonModule, MatCheckboxModule, MatCardModule, MatSelectModule, MatInputModule, MatIconModule, MatTooltipModule,
    MatGridListModule, MatExpansionModule, MatStepperModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule,
    MatRadioModule, MatTabsModule, MatListModule, MatSidenavModule,
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule
  ],
  providers: [ AuthService, SearchService, RouterLink, RouterDataService, ImageService, ChildService, ParentService, GroupService, MessageService, AvailabilityService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('dayshare-theme');
  }
}
