import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Botes {
  primitiva: string;
  bonoloto: string;
  euromillones: string;
  gordo: string;
  nacional: string;
}

@Injectable({
  providedIn: 'root'
})
export class BotesService {
  private apiUrl = `${environment.apiUrl}botes.json`;

  constructor(private http: HttpClient) { }

  getBotes(): Observable<Botes> {
    return this.http.get<Botes>('assets/botes.json').pipe(
      catchError(() => of({
        primitiva: '0',
        bonoloto: '0',
        euromillones: '0',
        gordo: '0',
        nacional: '0'
      }))
    );
  }
}
