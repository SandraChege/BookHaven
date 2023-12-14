import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegistersComponent } from './registers/registers.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddbookComponent } from './addbook/addbook.component';


const routes: Routes = [
  { path: '', component:LandingPageComponent},
  { path: 'registers', component: RegistersComponent},
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'adminhome', component: AdminhomeComponent },
  { path: 'home', component: UserhomeComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path : 'adminaddbook', component: AddbookComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
