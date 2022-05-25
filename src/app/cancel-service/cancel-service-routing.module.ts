import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelServicePage } from './cancel-service.page';

const routes: Routes = [
  {
    path: '',
    component: CancelServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelServicePageRoutingModule {}
