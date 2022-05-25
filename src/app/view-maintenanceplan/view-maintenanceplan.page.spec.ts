import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewMaintenanceplanPage } from './view-maintenanceplan.page';

describe('ViewMaintenanceplanPag', () => {
  let component: ViewMaintenanceplanPage;
  let fixture: ComponentFixture<ViewMaintenanceplanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMaintenanceplanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMaintenanceplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});