import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignVehiclePartHelpComponent } from './assign-vehicle-part-help.component';

describe('AssignVehiclePartHelpComponent', () => {
  let component: AssignVehiclePartHelpComponent;
  let fixture: ComponentFixture<AssignVehiclePartHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignVehiclePartHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignVehiclePartHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
