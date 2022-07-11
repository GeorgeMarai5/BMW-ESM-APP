import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddServiceItemPageRoutingModule } from './add-service-item-routing.module';

import { AddServiceItemPage } from './add-service-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddServiceItemPageRoutingModule
  ],
  declarations: [AddServiceItemPage]
})
export class AddServiceItemPageModule {}
