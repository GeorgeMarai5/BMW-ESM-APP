import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchemployeeaccountPageRoutingModule } from './searchemployeeaccount-routing.module';

import { SearchemployeeaccountPage } from './searchemployeeaccount.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    SearchemployeeaccountPageRoutingModule
  ],
  declarations: [SearchemployeeaccountPage]
})
export class SearchemployeeaccountPageModule {}
