import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'create-account',
        loadChildren: () => import('../create-account/create-account.module').then(m => m.CreateAccountPageModule)
      },
      {
        path: 'searchaccount/employee',
        loadChildren: () => import('../searchemployeeaccount/searchemployeeaccount.module').then( m => m.SearchemployeeaccountPageModule)
      },
      {
        path: 'password-reset',
        loadChildren: () => import('../password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
      },
      {
        path: 'verify-email',
        loadChildren: () => import('../verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
      },
      {
        path: 'searchaccount/client',
        loadChildren: () => import('../searchclientaccount/searchclientaccount.module').then( m => m.SearchclientaccountPageModule)
      },
      {
        path: 'dashboard/employee',
        loadChildren: () => import('../dashboard-employee/dashboard-employee.module').then( m => m.DashboardEmployeePageModule)
      },
      {
        path: 'dashboard/client',
        loadChildren: () => import('../dashboard-client/dashboard-client.module').then( m => m.DashboardClientPageModule)
      },
      {
        path: 'update-password',
        loadChildren: () => import('../update-password/update-password.module').then( m => m.UpdatePasswordPageModule)
      },
      {
        path: 'update-client',
        loadChildren: () => import('../update-client/update-client.module').then( m => m.UpdateClientPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
