import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchServiceNotePageRoutingModule } from './search-service-note-routing.module';

import { SearchServiceNotePage } from './search-service-note.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchServiceNotePageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [SearchServiceNotePage],
})
export class SearchServiceNotePageModule {}
