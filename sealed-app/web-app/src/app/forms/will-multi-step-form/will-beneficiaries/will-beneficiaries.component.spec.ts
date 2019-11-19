import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WillBeneficiariesComponent } from './will-beneficiaries.component';

describe('WillBeneficiariesComponent', () => {
  let component: WillBeneficiariesComponent;
  let fixture: ComponentFixture<WillBeneficiariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WillBeneficiariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WillBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
