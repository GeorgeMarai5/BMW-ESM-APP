import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { VehiclePerformanceReportPipe } from './vehicle-performance-report.pipe';
import { ServiceHistoryPipe } from './service-history.pipe';
import { ServiceDataPipe } from './service-data.pipe';
import { ServiceFeedbackPipe } from './service-feedback.pipe';
import { ServiceEnd0reportPipe } from './service-end0report.pipe';

@NgModule({
  declarations: [AppComponent, VehiclePerformanceReportPipe, ServiceHistoryPipe, ServiceDataPipe, ServiceFeedbackPipe, ServiceEnd0reportPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
  ],
  providers: [SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
