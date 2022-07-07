import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewServiceProgressPage } from './view-service-progress.page';

const routes: Routes = [
  {
    path: '',
    component: ViewServiceProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewServiceProgressPageRoutingModule {}
