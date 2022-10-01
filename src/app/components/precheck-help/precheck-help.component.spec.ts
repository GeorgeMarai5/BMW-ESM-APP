import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrecheckHelpComponent } from './precheck-help.component';

describe('PrecheckHelpComponent', () => {
  let component: PrecheckHelpComponent;
  let fixture: ComponentFixture<PrecheckHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecheckHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrecheckHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
