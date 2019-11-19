import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCacComponent } from './admin-cac.component';

describe('AdminCacComponent', () => {
  let component: AdminCacComponent;
  let fixture: ComponentFixture<AdminCacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
