import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensComponent } from './expens.component';

describe('ExpensComponent', () => {
  let component: ExpensComponent;
  let fixture: ComponentFixture<ExpensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
