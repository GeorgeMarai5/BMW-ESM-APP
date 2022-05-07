import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { SearchemployeeaccountPageRoutingModule } from './searchemployeeaccount-routing.module';

import { SearchemployeeaccountPage } from './searchemployeeaccount.page';

@NgModule({
  imports: [
    CommonModule,
    SearchemployeeaccountPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SearchemployeeaccountPage]
})
export class SearchemployeeaccountPageModule {}
