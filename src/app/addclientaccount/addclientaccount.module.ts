import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddclientaccountPageRoutingModule } from './addclientaccount-routing.module';

import { AddclientaccountPage } from './addclientaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddclientaccountPageRoutingModule
  ],
  declarations: [AddclientaccountPage]
})
export class AddclientaccountPageModule {}
