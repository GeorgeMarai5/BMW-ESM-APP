import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchFleetPage } from './search-fleet.page';

const routes: Routes = [
  {
    path: '',
    component: SearchFleetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchFleetPageRoutingModule {}
