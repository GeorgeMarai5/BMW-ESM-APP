import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoveServiceItemPage } from './remove-service-item.page';

const routes: Routes = [
  {
    path: '',
    component: RemoveServiceItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoveServiceItemPageRoutingModule {}
