import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignVehiclePartPage } from './assign-vehicle-part.page';

describe('AssignVehiclePartPage', () => {
  let component: AssignVehiclePartPage;
  let fixture: ComponentFixture<AssignVehiclePartPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignVehiclePartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignVehiclePartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
