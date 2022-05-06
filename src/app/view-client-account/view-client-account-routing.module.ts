import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewClientAccountPage } from './view-client-account.page';

const routes: Routes = [
  {
    path: '',
    component: ViewClientAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewClientAccountPageRoutingModule {}
