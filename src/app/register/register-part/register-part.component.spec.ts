import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPartComponent } from './register-part.component';

describe('RegisterPartComponent', () => {
  let component: RegisterPartComponent;
  let fixture: ComponentFixture<RegisterPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
