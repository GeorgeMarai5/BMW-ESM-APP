import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InitiateServiceProcedurePage } from './initiate-service-procedure.page';

describe('InitiateServiceProcedurePage', () => {
  let component: InitiateServiceProcedurePage;
  let fixture: ComponentFixture<InitiateServiceProcedurePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateServiceProcedurePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InitiateServiceProcedurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
