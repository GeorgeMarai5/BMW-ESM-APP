import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardClientHelpComponent } from './dashboard-client-help.component';

describe('DashboardClientHelpComponent', () => {
  let component: DashboardClientHelpComponent;
  let fixture: ComponentFixture<DashboardClientHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardClientHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardClientHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
