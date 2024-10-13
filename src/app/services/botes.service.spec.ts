import { TestBed } from '@angular/core/testing';

import { BotesService } from './botes.service';

describe('BotesService', () => {
  let service: BotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
