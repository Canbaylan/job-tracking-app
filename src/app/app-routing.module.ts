import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TaskComponent } from './components/task/task.component';
import { BidComponent } from './components/bid/bid.component';
import { ExpensComponent } from './components/expens/expens.component';
import { FinanceComponent } from './components/finance/finance.component';

const routes: Routes = [
  {
    path:"",
    component:LayoutsComponent,
    children: [
      {
        path:"",
        component:HomeComponent,
      },
      {
        path:"customers",
        component:HomeComponent,
      },
      {
        path:"profile",
        component:ProfileComponent
      },
      {
        path:"task",
        component:TaskComponent,
      },
      {
        path:"bid",
        component:BidComponent,
      },
      {
        path:"customers/:id/bid", 
        component:BidComponent
      },
      {
        path:":id/bid", 
        component:BidComponent
      },
      {
        path:"expens",
        component:ExpensComponent
      },
      {
        path:"finance",
        component:FinanceComponent
      },
      {
        path:"task/:id/finance",
        component: FinanceComponent
      },
    ] 
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"forgotPassword",
    component:ForgotPasswordComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
