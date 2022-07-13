import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddServiceItemPage } from './add-service-item.page';

const routes: Routes = [
  {
    path: '',
    component: AddServiceItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddServiceItemPageRoutingModule {}
