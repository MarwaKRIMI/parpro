import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfoPartComponent } from './more-info-part.component';

describe('MoreInfoPartComponent', () => {
  let component: MoreInfoPartComponent;
  let fixture: ComponentFixture<MoreInfoPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreInfoPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreInfoPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
