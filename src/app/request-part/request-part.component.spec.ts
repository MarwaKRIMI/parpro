import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPartComponent } from './request-part.component';

describe('RequestPartComponent', () => {
  let component: RequestPartComponent;
  let fixture: ComponentFixture<RequestPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
