import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOccasionComponent } from './new-occasion.component';

describe('NewOccasionComponent', () => {
  let component: NewOccasionComponent;
  let fixture: ComponentFixture<NewOccasionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOccasionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOccasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
