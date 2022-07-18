import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchServiceNotePage } from './search-service-note.page';

const routes: Routes = [
  {
    path: '',
    component: SearchServiceNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchServiceNotePageRoutingModule {}
