import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterCompComponent } from './starter-comp.component';

describe('StarterCompComponent', () => {
  let component: StarterCompComponent;
  let fixture: ComponentFixture<StarterCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarterCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
