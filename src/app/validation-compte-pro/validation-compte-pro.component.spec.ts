import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationCompteProComponent } from './validation-compte-pro.component';

describe('ValidationCompteProComponent', () => {
  let component: ValidationCompteProComponent;
  let fixture: ComponentFixture<ValidationCompteProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationCompteProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationCompteProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
