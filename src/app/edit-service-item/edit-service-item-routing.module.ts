import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditServiceItemPage } from './edit-service-item.page';

const routes: Routes = [
  {
    path: '',
    component: EditServiceItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditServiceItemPageRoutingModule {}
