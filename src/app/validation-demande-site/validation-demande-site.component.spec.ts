import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDemandeSiteComponent } from './validation-demande-site.component';

describe('ValidationDemandeSiteComponent', () => {
  let component: ValidationDemandeSiteComponent;
  let fixture: ComponentFixture<ValidationDemandeSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationDemandeSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDemandeSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
