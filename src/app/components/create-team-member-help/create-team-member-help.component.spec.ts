import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateTeamMemberHelpComponent } from './create-team-member-help.component';

describe('CreateTeamMemberHelpComponent', () => {
  let component: CreateTeamMemberHelpComponent;
  let fixture: ComponentFixture<CreateTeamMemberHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTeamMemberHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTeamMemberHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
