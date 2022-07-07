import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaptureInitialInspectionDetailsPage } from './capture-initial-inspection-details.page';

describe('CaptureInitialInspectionDetailsPage', () => {
  let component: CaptureInitialInspectionDetailsPage;
  let fixture: ComponentFixture<CaptureInitialInspectionDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureInitialInspectionDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaptureInitialInspectionDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
