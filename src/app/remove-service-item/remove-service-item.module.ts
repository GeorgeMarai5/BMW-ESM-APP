import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemoveServiceItemPageRoutingModule } from './remove-service-item-routing.module';

import { RemoveServiceItemPage } from './remove-service-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoveServiceItemPageRoutingModule
  ],
  declarations: [RemoveServiceItemPage]
})
export class RemoveServiceItemPageModule {}
