import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotesService {
  private apiUrl = `${environment.apiUrl}/botes`;

  constructor(private http: HttpClient) {}

  getBotes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
