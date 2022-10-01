import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceInvoiceHelpComponent } from './service-invoice-help.component';

describe('ServiceInvoiceHelpComponent', () => {
  let component: ServiceInvoiceHelpComponent;
  let fixture: ComponentFixture<ServiceInvoiceHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInvoiceHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceInvoiceHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
