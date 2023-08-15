import { TestBed } from '@angular/core/testing';

import { ExpensService } from './expens.service';

describe('ExpensService', () => {
  let service: ExpensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
