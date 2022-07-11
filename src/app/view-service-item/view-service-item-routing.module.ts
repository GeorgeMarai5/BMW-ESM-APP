import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewServiceItemPage } from './view-service-item.page';

const routes: Routes = [
  {
    path: '',
    component: ViewServiceItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewServiceItemPageRoutingModule {}
