import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceProgressHelpComponent } from './service-progress-help.component';

describe('ServiceProgressHelpComponent', () => {
  let component: ServiceProgressHelpComponent;
  let fixture: ComponentFixture<ServiceProgressHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProgressHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceProgressHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
