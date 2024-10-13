import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotesService {
  private apiUrl = `${environment.apiUrl}botes.json`;

  constructor(private http: HttpClient) { }

  getBotes(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError<any>('getBotes', {}))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
