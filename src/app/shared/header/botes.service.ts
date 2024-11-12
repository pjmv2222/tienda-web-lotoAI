import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotesService {
  constructor(private http: HttpClient) {}

  getBotes(): Observable<any> {
    const url = `/assets/botes.json?t=${new Date().getTime()}`;
    return this.http.get(url, { headers: { 'Cache-Control': 'no-cache' } });
  }
}
