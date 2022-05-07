import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchemployeeaccountPageRoutingModule } from './searchemployeeaccount-routing.module';

import { SearchemployeeaccountPage } from './searchemployeeaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchemployeeaccountPageRoutingModule
  ],
  declarations: [SearchemployeeaccountPage]
})
export class SearchemployeeaccountPageModule {}
