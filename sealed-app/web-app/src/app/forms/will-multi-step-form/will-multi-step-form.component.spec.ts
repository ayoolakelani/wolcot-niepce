import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WillMultiStepFormComponent } from './will-multi-step-form.component';

describe('WillMultiStepFormComponent', () => {
  let component: WillMultiStepFormComponent;
  let fixture: ComponentFixture<WillMultiStepFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WillMultiStepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WillMultiStepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
