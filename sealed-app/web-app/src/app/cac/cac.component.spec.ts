import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CacComponent } from './cac.component';

describe('CacComponent', () => {
  let component: CacComponent;
  let fixture: ComponentFixture<CacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
