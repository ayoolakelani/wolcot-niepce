import { CacMultiStepFormComponent } from './cac-multi-step-form.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';



describe('CacMultiStepFormsComponent', () => {
  let component: CacMultiStepFormComponent;
  let fixture: ComponentFixture<CacMultiStepFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CacMultiStepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CacMultiStepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
