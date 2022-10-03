import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAssignedPartHelpComponent } from './edit-assigned-part-help.component';

describe('EditAssignedPartHelpComponent', () => {
  let component: EditAssignedPartHelpComponent;
  let fixture: ComponentFixture<EditAssignedPartHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssignedPartHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAssignedPartHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
