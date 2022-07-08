import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerformPrecheckPage } from './perform-precheck.page';

const routes: Routes = [
  {
    path: '',
    component: PerformPrecheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformPrecheckPageRoutingModule {}
