import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchServicePage } from './search-service.page';

const routes: Routes = [
  {
    path: '',
    component: SearchServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchServicePageRoutingModule {}
