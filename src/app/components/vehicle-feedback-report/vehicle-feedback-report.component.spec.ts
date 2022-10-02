import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehicleFeedbackReportComponent } from './vehicle-feedback-report.component';

describe('VehicleFeedbackReportComponent', () => {
  let component: VehicleFeedbackReportComponent;
  let fixture: ComponentFixture<VehicleFeedbackReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleFeedbackReportComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleFeedbackReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
