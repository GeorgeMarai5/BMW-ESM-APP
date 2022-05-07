import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchclientaccountPage } from './searchclientaccount.page';

const routes: Routes = [
  {
    path: '',
    component: SearchclientaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchclientaccountPageRoutingModule {}
