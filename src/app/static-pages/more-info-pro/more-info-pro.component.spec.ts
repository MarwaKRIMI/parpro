import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfoProComponent } from './more-info-pro.component';

describe('MoreInfoProComponent', () => {
  let component: MoreInfoProComponent;
  let fixture: ComponentFixture<MoreInfoProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreInfoProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreInfoProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
