import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardEmployeeHelpComponent } from './dashboard-employee-help.component';

describe('DashboardEmployeeHelpComponent', () => {
  let component: DashboardEmployeeHelpComponent;
  let fixture: ComponentFixture<DashboardEmployeeHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEmployeeHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardEmployeeHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
