import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateServiceNoteHelpComponent } from './create-service-note-help.component';

describe('CreateServiceNoteHelpComponent', () => {
  let component: CreateServiceNoteHelpComponent;
  let fixture: ComponentFixture<CreateServiceNoteHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateServiceNoteHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateServiceNoteHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
