import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, interval } from 'rxjs';
import { catchError, retryWhen, delay, take, switchMap } from 'rxjs/operators';
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
    // Intentar cada 5 segundos, hasta 3 intentos
    return interval(5000).pipe(
      take(3),
      switchMap(() => this.http.get<Botes>(this.apiUrl)),
      retryWhen(errors => errors.pipe(delay(5000))),
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
