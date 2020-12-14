import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyLetterComponent } from './verify-letter.component';

describe('VerifyLetterComponent', () => {
  let component: VerifyLetterComponent;
  let fixture: ComponentFixture<VerifyLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
