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
    path: 'addclientaccount',
    loadChildren: () => import('./addclientaccount/addclientaccount.module').then( m => m.AddclientaccountPageModule)
  },
  {
    path: 'searchclientaccount',
    loadChildren: () => import('./searchclientaccount/searchclientaccount.module').then( m => m.SearchclientaccountPageModule)
  },  {
    path: 'searchclientaccount',
    loadChildren: () => import('./searchclientaccount/searchclientaccount.module').then( m => m.SearchclientaccountPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
