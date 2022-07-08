import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPartPageRoutingModule } from './search-part-routing.module';

import { SearchPartPage } from './search-part.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPartPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SearchPartPage]
})
export class SearchPartPageModule {}
