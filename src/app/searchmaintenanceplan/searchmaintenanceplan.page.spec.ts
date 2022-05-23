import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchmaintenanceplanPage } from './searchmaintenanceplan.page';

describe('SearchmaintenanceplanPage', () => {
  let component: SearchmaintenanceplanPage;
  let fixture: ComponentFixture<SearchmaintenanceplanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchmaintenanceplanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchmaintenanceplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
