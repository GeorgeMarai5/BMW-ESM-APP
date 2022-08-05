import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndOfServicePage } from './end-of-service.page';

const routes: Routes = [
  {
    path: '',
    component: EndOfServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndOfServicePageRoutingModule {}
