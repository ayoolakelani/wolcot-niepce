import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WillPreviewComponent } from './will-preview.component';

describe('WillPreviewComponent', () => {
  let component: WillPreviewComponent;
  let fixture: ComponentFixture<WillPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WillPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WillPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
