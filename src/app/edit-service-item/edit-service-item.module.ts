import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditServiceItemPageRoutingModule } from './edit-service-item-routing.module';

import { EditServiceItemPage } from './edit-service-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditServiceItemPageRoutingModule
  ],
  declarations: [EditServiceItemPage]
})
export class EditServiceItemPageModule {}
