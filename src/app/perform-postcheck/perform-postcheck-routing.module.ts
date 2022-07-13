import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerformPostcheckPage } from './perform-postcheck.page';

const routes: Routes = [
  {
    path: '',
    component: PerformPostcheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformPostcheckPageRoutingModule {}
