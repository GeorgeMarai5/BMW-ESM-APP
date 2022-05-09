import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'create/account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'update/client',
    loadChildren: () => import('./update-client/update-client.module').then( m => m.UpdateClientPageModule)
  },
  {
    path: 'update/password',
    loadChildren: () => import('./update-password/update-password.module').then( m => m.UpdatePasswordPageModule)
  },
  {
    path: 'search/account/employee',
    loadChildren: () => import('./searchemployeeaccount/searchemployeeaccount.module').then( m => m.SearchemployeeaccountPageModule)
  },
  {
    path: 'password/reset',
    loadChildren: () => import('./password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'dashboard/client',
    loadChildren: () => import('./dashboard-client/dashboard-client.module').then( m => m.DashboardClientPageModule)
  },
  {
    path: 'search/account/client',
    loadChildren: () => import('./searchclientaccount/searchclientaccount.module').then( m => m.SearchclientaccountPageModule)
  },
  {
    path: 'dashboard/employee',
    loadChildren: () => import('./dashboard-employee/dashboard-employee.module').then( m => m.DashboardEmployeePageModule)
  },
  {
    path: 'view/client',
    loadChildren: () => import('./view-client-account/view-client-account.module').then( m => m.ViewClientAccountPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
