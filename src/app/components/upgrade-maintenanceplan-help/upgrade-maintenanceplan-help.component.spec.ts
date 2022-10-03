import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpgradeMaintenanceplanHelpComponent } from './upgrade-maintenanceplan-help.component';

describe('UpgradeMaintenanceplanHelpComponent', () => {
  let component: UpgradeMaintenanceplanHelpComponent;
  let fixture: ComponentFixture<UpgradeMaintenanceplanHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeMaintenanceplanHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpgradeMaintenanceplanHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
