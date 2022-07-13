import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchServiceItemPage } from './search-service-item.page';

const routes: Routes = [
  {
    path: '',
    component: SearchServiceItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchServiceItemPageRoutingModule {}
