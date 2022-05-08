import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateAccountPageRoutingModule } from './create-account-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountPage } from './create-account.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
    FormBuilder,
    ReactiveFormsModule,
    CreateAccountPageRoutingModule,
  ],
  declarations: [CreateAccountPage]
})
export class CreateAccountPageModule {}
