import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddclientaccountPage } from './addclientaccount.page';

const routes: Routes = [
  {
    path: '',
    component: AddclientaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddclientaccountPageRoutingModule {}
