import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchclientaccountPageRoutingModule } from './searchclientaccount-routing.module';

import { SearchclientaccountPage } from './searchclientaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchclientaccountPageRoutingModule
  ],
  declarations: [SearchclientaccountPage]
})
export class SearchclientaccountPageModule {}
