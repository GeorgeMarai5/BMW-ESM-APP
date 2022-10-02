import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaptureInitialInspectionDetailsHelpComponent } from './capture-initial-inspection-details-help.component';

describe('CaptureInitialInspectionDetailsHelpComponent', () => {
  let component: CaptureInitialInspectionDetailsHelpComponent;
  let fixture: ComponentFixture<CaptureInitialInspectionDetailsHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureInitialInspectionDetailsHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaptureInitialInspectionDetailsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
