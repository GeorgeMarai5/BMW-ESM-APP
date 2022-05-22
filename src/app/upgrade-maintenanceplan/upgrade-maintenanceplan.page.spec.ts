import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpgradeMaintenanceplanPage } from './upgrade-maintenanceplan.page';

describe('UpgradeMaintenanceplanPage', () => {
  let component: UpgradeMaintenanceplanPage;
  let fixture: ComponentFixture<UpgradeMaintenanceplanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeMaintenanceplanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpgradeMaintenanceplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
