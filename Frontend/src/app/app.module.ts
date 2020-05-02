import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GroupFinderComponent } from './group-finder/group-finder.component';
import { MatDialogModule} from '@angular/material/dialog';
import { CreatedGroupComponent } from './created-group/created-group.component';
import { TinderComponent } from './tinder/tinder.component';
import { AppRoutingModule } from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MaterialModule} from './material-module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';

import { ErrorInterceptor } from './interceptors/error.interceptor';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { WinnerComponent } from './winner/winner.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GroupFinderComponent,
    CreatedGroupComponent,
    TinderComponent,
    DialogBodyComponent,
    RestaurantComponent,
    WinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [DialogBodyComponent]
})
export class AppModule {
  private static JwtInterceptor: any;
}
