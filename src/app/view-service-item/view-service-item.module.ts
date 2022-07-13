import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewServiceItemPageRoutingModule } from './view-service-item-routing.module';

import { ViewServiceItemPage } from './view-service-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewServiceItemPageRoutingModule
  ],
  declarations: [ViewServiceItemPage]
})
export class ViewServiceItemPageModule {}
