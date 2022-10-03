import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectMaintenanceplanHelpComponent } from './select-maintenanceplan-help.component';

describe('SelectMaintenanceplanHelpComponent', () => {
  let component: SelectMaintenanceplanHelpComponent;
  let fixture: ComponentFixture<SelectMaintenanceplanHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMaintenanceplanHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectMaintenanceplanHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
