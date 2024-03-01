import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBestProComponent } from './search-best-pro.component';

describe('SearchBestProComponent', () => {
  let component: SearchBestProComponent;
  let fixture: ComponentFixture<SearchBestProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBestProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBestProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
