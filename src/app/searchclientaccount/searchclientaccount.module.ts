import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchclientaccountPageRoutingModule } from './searchclientaccount-routing.module';

import { SearchclientaccountPage } from './searchclientaccount.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchclientaccountPageRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ],
  declarations: [SearchclientaccountPage]
})
export class SearchclientaccountPageModule {}
