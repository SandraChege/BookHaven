import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistersComponent } from './registers/registers.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddbookComponent } from './addbook/addbook.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    AdminhomeComponent,
    NavbarComponent,
    RegistersComponent,
    ForgotpasswordComponent,
    AdmindashboardComponent,
    UserhomeComponent,
    ResetPasswordComponent,
    AddbookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
