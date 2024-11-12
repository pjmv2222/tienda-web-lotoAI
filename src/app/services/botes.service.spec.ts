import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BotesService } from './botes.service';
import { environment } from '../../environments/environment';

interface Botes {
  primitiva: string;
  bonoloto: string;
  euromillones: string;
  gordo: string;
  nacional: string;  // Añadida propiedad nacional
}

describe('BotesService', () => {
  let service: BotesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BotesService]
    });
    service = TestBed.inject(BotesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get botes data', () => {
    const mockBotes: Botes = {
      primitiva: '1000000',
      bonoloto: '2000000',
      euromillones: '3000000',
      gordo: '4000000',
      nacional: '300000'  // Añadido valor para nacional
    };

    service.getBotes().subscribe(botes => {
      expect(botes).toEqual(mockBotes);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}botes.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBotes);
  });

  it('should handle error', () => {
    service.getBotes().subscribe(botes => {
      expect(botes).toEqual({
        primitiva: '0',
        bonoloto: '0',
        euromillones: '0',
        gordo: '0',
        nacional: '0'  // Añadido valor para nacional
      } as Botes);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}botes.json`);
    req.error(new ErrorEvent('Network error'));
  });
});
