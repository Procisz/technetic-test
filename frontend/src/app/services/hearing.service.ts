import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hearing } from '../models/data/hearing.model';

@Injectable({
  providedIn: 'root',
})
export class HearingService {
  constructor(private http: HttpClient) {}

  /**
   * Get all hearing option.
   * @returns {Hearing[]} the options of the hearing.
   */
  public getHearings(): Observable<Hearing[]> {
    return this.http.get<Hearing[]>(`${environment.API_URL}/hearing`);
  }
}
