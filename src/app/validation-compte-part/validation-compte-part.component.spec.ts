import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationComptePartComponent } from './validation-compte-part.component';

describe('ValidationComptePartComponent', () => {
  let component: ValidationComptePartComponent;
  let fixture: ComponentFixture<ValidationComptePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationComptePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationComptePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
